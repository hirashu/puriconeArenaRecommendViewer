<template>
  <div class="bg-image">
    <h1>プリコネ対戦レコメンド</h1>
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
<style lang="scss">
//調整必須
.bg-image {
  background-image: url("../../assets/bishoku.jpg");
  background-size: contain;
}
</style>
