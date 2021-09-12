<template>
  <div class="home">
    <div class="team-execution-form">
      <div class="team-form">
        <h2 class="team-title-form opponent">相手チーム</h2>
        <TeamCompositionList :teamCharacterInfoList="teamCharacterInfoList" />
      </div>
      <div class="execution-form">
        <div>
          <v-btn
            class="botton"
            :disabled="isSearchRecommendDisabled()"
            @click="searchRecommendMember()"
            >検索</v-btn
          >
        </div>
        <div>
          <v-btn class="botton" @click="clear()">リセット</v-btn>
        </div>
      </div>
      <div class="team-form">
        <h2 class="team-title-form">おすすめ編成</h2>
        <TeamCompositionList
          :teamCharacterInfoList="recomendteamCharacterInfoList"
        />
      </div>
    </div>
    <div class="character-position-form">
      <h2 class="character-select-title">セレクト</h2>
      <h2 class="character-position-text">相手チームキャラクター</h2>
      <CharacterPositionForm
        :characterInfoList="characterInfoList"
        @set-team-info="teamCharacterInfoList = $event"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "@vue/composition-api";
import TeamCompositionList from "@/components/molecule/TeamCompositionList.vue";
import CharacterPositionForm from "@/components/organism/CharacterPositionForm.vue";

import { CharacterInfo } from "@/model/characterInfo.model";
//キャラクター情報の読み込み
import characterInfoListData from "@/assets/json/characterInfo.json";
//学習結果の読み込み todo 読み込みに遅延処理を入れるか検討する
import learningResultMain from "@/assets/learningResult/学習結果メインインスタンス.json";
import learningResultSideAttack from "@/assets/learningResult/学習結果サイド情報攻撃.json";
import learningResultSideDefense from "@/assets/learningResult/学習結果サイド情報防御.json";

export default defineComponent({
  components: {
    TeamCompositionList: TeamCompositionList,
    CharacterPositionForm: CharacterPositionForm
  },
  setup() {
    const state = reactive({
      characterInfoList: characterInfoListData as CharacterInfo[] | null, //いい感じに型変換できたらいいねcharacterInfo[]

      teamCharacterInfoList: new Array<CharacterInfo>() as CharacterInfo[],
      recomendteamCharacterInfoList: new Array<
        CharacterInfo
      >() as CharacterInfo[],

      //学習結果
      learningResultMain: learningResultMain as number[][][], //攻撃 X 防御 X 次元D
      learningResultSideAttack: learningResultSideAttack as number[][][],
      learningResultSideDefense: learningResultSideDefense as number[][][]
      //computed を用いるならここに定義して、インポートもしておく
    });
    /**
     * レコメンド検索の有効/無効
     */
    const isSearchRecommendDisabled = () => {
      return state.teamCharacterInfoList?.length != 5;
    };

    //以下レコメンド検索なので専用のメソッドファイルを作成した方がいいかも
    /**
     * 二乗誤差を求める（２次元配列）
     *
     * param targetALists
     * param targetBLists
     * return 二乗誤差
     */
    const squareErrorMethod = (
      targetALists: number[][],
      targetBLists: number[][]
    ): number => {
      let squareError = 0;
      targetALists.forEach((targetAList, indexMember) => {
        targetAList.forEach((targetA, indexD) => {
          squareError += Math.pow(
            targetA - targetBLists[indexMember][indexD],
            2
          );
        });
      });
      return squareError;
    };
    const squareErrorMethod1D = (
      targetAList: number[],
      targetBList: number[]
    ): number => {
      let squareError = 0;
      targetAList.forEach((targetA, index) => {
        squareError += Math.pow(targetA - targetBList[index], 2);
      });
      return squareError;
    };
    /**
     * 防御側のノードを検索する
     */
    const searchDefenseNode = (teamFeatures: number[][]): number => {
      let defenseNode = 0;
      let leastSquareError = 0;
      learningResultSideDefense.forEach((defenseFeatures, index) => {
        const squareError = squareErrorMethod(defenseFeatures, teamFeatures);
        if (squareError < leastSquareError || index == 0) {
          defenseNode = index;
          leastSquareError = squareError;
        }
      });
      return defenseNode;
    };
    /**
     * 防御ノードを用いて、学習結果のインスタンス多様体から
     * 防御ノードスライス多様体を取得する。
     * そこからから勝率(スコア)が高いノードを検索し、編成情報を取得する。
     */
    const searchAttackerFeaturesTearmList = (
      defenseNodeindex: number
    ): CharacterInfo["features"][] => {
      //25*1次元の結果を取得する
      const defenseLatentSpace: number[][] = state.learningResultMain.map(
        ret => ret[defenseNodeindex]
      );
      let attackNode = 0;
      let score = 0;
      defenseLatentSpace.forEach((attackNodeScore, index) => {
        //attackNodeScore が１次元なので[0]取得でOK.ただし、次元が増えると平均で比較が必要かもね
        if (attackNodeScore[0] > score || index == 0) {
          score = attackNodeScore[0];
          attackNode = index;
        }
      });
      return state.learningResultSideAttack[attackNode];
    };

    /**
     * 編成情報からもっともそれっぽい攻撃編成のチームリストを検索
     */
    const searchAttackerTearmList = (
      CharacterInfoFeaturesList: CharacterInfo["features"][]
    ): CharacterInfo[] => {
      return CharacterInfoFeaturesList.map(features => {
        let leastSquareError = 0;
        let characterInfo!: CharacterInfo;
        state.characterInfoList?.forEach((element, index) => {
          const squareError = squareErrorMethod1D(features, element.features);
          if (squareError < leastSquareError || index == 0) {
            characterInfo = element;
            leastSquareError = squareError;
          }
        });
        return characterInfo;
      });
    };

    const searchRecommendMember = () => {
      //メンバー5人の能力(特徴)リストを作成
      const teamFeatures = state.teamCharacterInfoList.map(
        characterInfo => characterInfo.features
      );
      //もっとも似てる防御メンバーノードを検索
      const defenseNode = searchDefenseNode(teamFeatures);
      //上記防護ノードのスライス多様体から勝率が高いノードを検索し、編成情報を取得
      const attackTeamFeatures = searchAttackerFeaturesTearmList(defenseNode);
      //編成情報からもっともそれっぽい攻撃編成を探し、リストを更新
      const attackerTearmList = searchAttackerTearmList(attackTeamFeatures);
      state.recomendteamCharacterInfoList = attackerTearmList;
    };

    const clear = () => {
      //メンバー並びに結果のクリア
      //選択したキャラクターのクリア todo この要素が空になっていないので見た目のみ.上のフォームはなぜかうまくいってる??
      state.teamCharacterInfoList = Array<CharacterInfo>();
      //レコメンドのクリア
      state.recomendteamCharacterInfoList = Array<CharacterInfo>();
    };

    return {
      ...toRefs(state),
      isSearchRecommendDisabled,
      searchRecommendMember,
      clear
    };
  }
});
</script>

<style lang="scss">
.team-execution-form {
  height: 150px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  width: 1160px;
}
.select-recomend-form {
  display: inline-block;
}
.team-form {
  display: inline-block;
  vertical-align: top;
}
.execution-form {
  display: inline-block;
  padding: 10px;
  padding-top: 40px;
}
.botton {
  margin: 5px;
  margin-left: 10px;
  margin-right: 10px;
  width: 90px;
}
.character-position-form {
  padding-left: 50px;
  padding-right: 50px;
  padding-top: 10px;
}
.character-select-title {
  background-color: #25c95e;
  border: solid 3px #25c95e;
  border-bottom-left-radius: 25px;
  border-top-left-radius: 25px;
  color: white;
  display: inline-block;
  padding-left: 10px;
  width: fit-content;
}
.character-position-text {
  border: solid 3px #25c95e;
  border-bottom-right-radius: 25px;
  border-top-right-radius: 25px;
  color: #25c95e;
  display: inline-block;
  margin-bottom: 10px;
  padding-left: 10px;
  padding-right: 15px;
  width: fit-content;
}
.team-title-form {
  background-color: #63cafb;
  border-radius: 5px;
  color: white;
  padding-left: 8px;
  padding-right: 8px;
  width: fit-content;
}
.opponent {
  background-color: #e72636;
}
</style>
