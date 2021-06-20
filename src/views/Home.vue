<template>
  <div class="home">
    <h1>プリコネ対戦レコメンド</h1>
    <p>Pageレイアウト、テンプレートにデータを差し込むよ</p>
    <p>
      このファイルのtodo ・学習データの読み込み
    </p>
    <arenaRecommendLayout />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import arenaRecommendTemplate from "@/components/templates/arenaRecommendTemplate.vue";

export default defineComponent({
  components: {
    arenaRecommendLayout: arenaRecommendTemplate
  }
});
</script>
