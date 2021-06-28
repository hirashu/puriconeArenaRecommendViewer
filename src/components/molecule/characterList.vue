<template>
  <div class="chara-list">
    <h1>キャラクターリスト</h1>
    <p>class名って何ケースで記入するのが正解だったけ？</p>
    <p>残：画像を表示する</p>
    <p>{{ positonCharacterList }}</p>
    <v-row no-gutters style="height: 30px;">
      <v-col v-for="character in positonCharacterList" :key="character.id">
        <v-card class="pa-2" outlined tile>
          <img :src="setImage(character.image)" />
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/composition-api";
import { CharacterInfo } from "@/model/characterInfo.model";

export default defineComponent({
  props: {
    positonCharacterList: {
      type: Array as PropType<CharacterInfo[] | null>,
      required: true
    }
  },
  setup() {
    /**
     * 画像（キャラクターアイコン）を設定する
     * param imageName アイコン画像
     */
    const setImage = (imageName: string) => {
      return require(`@/assets/charIcon/${imageName}`);
    };
    return {
      setImage
    };
  }
});
</script>
