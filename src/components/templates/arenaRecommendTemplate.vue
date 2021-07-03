<template>
  <div class="home">
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
