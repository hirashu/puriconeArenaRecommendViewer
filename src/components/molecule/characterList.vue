<template>
  <div class="chara-list">
    <h1>キャラクターリスト</h1>
    <p>class名って何ケースで記入するのが正解だったけ？</p>
    <p>残：画像を表示する</p>
    <v-row no-gutters style="height: 30px;">
      <v-col v-for="n in 3" :key="n">
        <v-card class="pa-2" outlined tile>
          One of three columns
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({});
</script>
