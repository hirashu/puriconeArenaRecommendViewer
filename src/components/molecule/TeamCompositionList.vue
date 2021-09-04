<template>
  <div>
    <v-row class="team-chara-frame" no-gutters align="start">
      <v-col v-for="index of 5" :key="index">
        <v-card class="chara-image-frame" outlined tile>
          <img :src="setImage(index)" @click="clickTeamCharacter(index)" />
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
      }),
      mTeamCharacterInfoList: new Array<CharacterInfo>(5) as CharacterInfo[]
    });
    /**
     * 画像（キャラクターアイコン）を設定する
     * param imageName アイコン画像
     */
    const setImage = (index: number) => {
      if (index > state.lTeamCharacterInfoList.length) {
        return;
      }
      const image: string = state.lTeamCharacterInfoList[index - 1].image;
      return require(`@/assets/charIcon/${image}`);
    };

    const clickTeamCharacter = (index: number) => {
      if (index > state.lTeamCharacterInfoList.length) {
        return;
      }
      const characterInfo: CharacterInfo =
        state.lTeamCharacterInfoList[index - 1];
      //選択されたキャラは削除する。
      const deleteCharacterIndex = state.lTeamCharacterInfoList.findIndex(
        selectCharacter => selectCharacter.id == characterInfo.id
      );
      //console.log(state.mTeamCharacterInfoList.length);
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

<style lang="scss">
.team-chara-frame {
  height: 100px;
  width: 500px;
}
.chara-image-frame {
  height: 100px;
  width: 100px;
}
</style>
