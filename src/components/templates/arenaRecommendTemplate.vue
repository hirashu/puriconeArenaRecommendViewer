<template>
  <div class="home">
    <h1>テンプレート</h1>
    <p>コンテンツにヘッダーやフッターを設定してね</p>
    <ArenaRecommendForm />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import ArenaRecommendForm from "@/components/organism/ArenaRecommendForm.vue";

export default defineComponent({
  components: {
    ArenaRecommendForm: ArenaRecommendForm
  }
});
</script>
