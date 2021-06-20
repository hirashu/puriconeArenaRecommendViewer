<template>
  <div class="home">
    <h1>ページの基本構成を行う。以下を追加してページっぽい物を作成してね</h1>
    <p>
      このファイルのtodo・選択結果を表示して、レコメンドを設定する。このアプリの主要部分
    </p>
    <p>相手のチーム編成</p>
    <teamCompositionList />
    <p>チーム編成のおすすめ</p>
    <teamCompositionList />
    <h2>全キャラクターリスト</h2>
    <p>
      構成 @param：全てのキャラクターリスト @return 選択された値のリスト
    </p>
    <characterPositionList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import teamCompositionList from "@/components/molecule/teamCompositionList.vue";
import characterPositionList from "@/components/organism/characterPositionList.vue";

export default defineComponent({
  components: {
    teamCompositionList: teamCompositionList,
    characterPositionList: characterPositionList
  }
});
</script>
