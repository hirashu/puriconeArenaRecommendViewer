<template>
  <div class="home">
    <h1>キャラクターリスト</h1>
    <p>
      キャラクターリストを配置順に表示する。選択された場合、選択結果をポジション順にそーとし返却する
    </p>
    <p>前衛</p>
    <characterList />
    <p>中衛</p>
    <characterList />
    <p>後衛</p>
    <characterList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import characterList from "@/components/molecule/characterList.vue";

export default defineComponent({
  components: {
    characterList: characterList
  }
});
</script>
