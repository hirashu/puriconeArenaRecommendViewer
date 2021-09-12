<template>
  <div class="home">
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
