<template>
  <div class="home">
    <v-row no-gutters align="start">
      <v-col
        cols="auto"
        v-for="character in lTeamCharacterInfoList"
        :key="character.id"
      >
        <v-card class="pa-2" outlined tile>
          <img
            :src="setImage(character.image)"
            @click="clickTeamCharacter(character)"
          />
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  reactive,
  toRefs
} from "@vue/composition-api";
import { CharacterInfo } from "@/model/characterInfo.model";

export default defineComponent({
  //チーム編成リスト
  //参照渡しを行っているのでよくない。todo 値渡しでできたらいいな
  props: {
    teamCharacterInfoList: {
      type: Array as PropType<CharacterInfo[]>,
      default: () => new Array<CharacterInfo>(),
      required: false
    }
  },
  setup(props) {
    const state = reactive({
      lTeamCharacterInfoList: computed({
        get: () => props.teamCharacterInfoList,
        set: (value: CharacterInfo[]) => value
      })
    });
    /**
     * 画像（キャラクターアイコン）を設定する
     * param imageName アイコン画像
     */
    const setImage = (imageName: string) => {
      return require(`@/assets/charIcon/${imageName}`);
    };

    const clickTeamCharacter = (characterInfo: CharacterInfo) => {
      //選択されたキャラは削除する。
      const deleteCharacterIndex = state.lTeamCharacterInfoList.findIndex(
        selectCharacter => selectCharacter.id == characterInfo.id
      );
      if (deleteCharacterIndex >= 0) {
        state.lTeamCharacterInfoList.splice(deleteCharacterIndex, 1);
      }
    };
    return {
      ...toRefs(state),
      setImage,
      clickTeamCharacter
    };
  }
});
</script>
