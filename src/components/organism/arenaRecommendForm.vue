<template>
  <div class="home">
    <h1>ページの基本構成を行う。以下を追加してページっぽい物を作成してね</h1>
    <p>
      このファイルのtodo・選択結果を表示して、レコメンドを設定する。このアプリの主要部分
    </p>
    <p>相手のチーム編成</p>
    <TeamCompositionList />
    <p>チーム編成のおすすめ</p>
    <TeamCompositionList />
    <h2>全キャラクターリスト</h2>
    <p>
      構成 @param：全てのキャラクターリスト @return 選択された値のリスト
    </p>
    <CharacterPositionForm :characterInfoList="characterInfoList" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "@vue/composition-api";
import TeamCompositionList from "@/components/molecule/TeamCompositionList.vue";
import CharacterPositionForm from "@/components/organism/CharacterPositionForm.vue";

// todo ここでキャラクター情報を読み込む
import { CharacterInfo } from "@/model/characterInfo.model";
import characterInfoListData from "@/assets/json/characterInfo.json";
// todo ここで学習結果も読み込むかも上のレイヤーの方がいいかも

export default defineComponent({
  components: {
    TeamCompositionList: TeamCompositionList,
    CharacterPositionForm: CharacterPositionForm
  },
  setup() {
    const state = reactive({
      characterInfoList: characterInfoListData as CharacterInfo[] | null //いい感じに型変換できたらいいねcharacterInfo[]
      //computed を用いるならここに定義して、インポートもしておく
    });

    return {
      ...toRefs(state)
    };
  }
});
</script>
