<template>
  <div class="home">
    <h1>プリコネ対戦レコメンド</h1>
    <ArenaRecommendTemplate />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import ArenaRecommend from "@/components/templates/ArenaRecommendTemplate.vue";

export default defineComponent({
  components: {
    ArenaRecommendTemplate: ArenaRecommend
  }
});
</script>
