<template>
  <div>
    <div class="header">
      <h1 class="title-text">プリコネチームレコメンド</h1>
    </div>
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
.header {
  background-color: #fc778f;
  margin-bottom: 15px;
  padding: 3px;
}
.title-text {
  color: white;
  margin-left: 50px;
  width: fit-content;
}
.bg-image {
  background-image: url("../../assets/bishoku.jpg");
  background-size: contain;
}
</style>
