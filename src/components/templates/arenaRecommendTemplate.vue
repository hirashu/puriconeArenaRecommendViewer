<template>
  <div class="home">
    <h1>テンプレート</h1>
    <p>コンテンツにヘッダーやフッターを設定してね</p>
    <arenaRecommendForm />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import arenaRecommendForm from "@/components/organism/arenaRecommendForm.vue";

export default defineComponent({
  components: {
    arenaRecommendForm: arenaRecommendForm
  }
});
</script>
