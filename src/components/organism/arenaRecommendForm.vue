<template>
  <div class="home">
    <h2>相手のチーム編成</h2>
    <TeamCompositionList :teamCharacterInfoList="teamCharacterInfoList" />
    <p>{{ teamCharacterInfoList }}</p>
    <button background-color="primary">検索ボタン（デザイン考える）</button>
    <h2>チーム編成のおすすめ</h2>
    <TeamCompositionList disabled />
    <h2>編成キャラクター選択</h2>
    <CharacterPositionForm
      :characterInfoList="characterInfoList"
      @set-team-info="teamCharacterInfoList = $event"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "@vue/composition-api";
import TeamCompositionList from "@/components/molecule/TeamCompositionList.vue";
import CharacterPositionForm from "@/components/organism/CharacterPositionForm.vue";

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
      characterInfoList: characterInfoListData as CharacterInfo[] | null, //いい感じに型変換できたらいいねcharacterInfo[]

      teamCharacterInfoList: new Array<CharacterInfo>() as CharacterInfo[]
      //computed を用いるならここに定義して、インポートもしておく
    });
    //ここでレコメンド編成を求めるのか。クソだるいなww
    return {
      ...toRefs(state)
    };
  }
});
</script>
