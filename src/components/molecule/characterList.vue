<template>
  <div class="chara-list">
    <v-row no-gutters align="start">
      <v-col
        cols="auto"
        v-for="character in positonCharacterList"
        :key="character.id"
      >
        <v-card class="pa-2" outlined tile>
          <img
            :src="setImage(character.image)"
            @click="clickCharacter(character)"
          />
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, SetupContext } from "@vue/composition-api";
import { CharacterInfo } from "@/model/characterInfo.model";

export default defineComponent({
  props: {
    positonCharacterList: {
      type: Array as PropType<CharacterInfo[] | null>,
      required: true
    }
  },
  setup(props, context: SetupContext) {
    /**
     * 画像（キャラクターアイコン）を設定する
     * param imageName アイコン画像
     */
    const setImage = (imageName: string) => {
      return require(`@/assets/charIcon/${imageName}`);
    };

    const clickCharacter = (characterInfo: CharacterInfo) => {
      context.emit("click-character", characterInfo);
    };

    return {
      setImage,
      clickCharacter
    };
  }
});
</script>

<style lang="scss">
//調整必須
.chara-list {
  margin-left: 50px;
  margin-right: 50px;
}
</style>
