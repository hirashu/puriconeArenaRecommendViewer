<template>
  <div class="">
    <h2>前衛</h2>
    <CharacterList
      :positonCharacterList="frontCharacterList"
      @click-character="setTeamCharacter($event)"
    />
    <h2>中衛</h2>
    <CharacterList
      :positonCharacterList="centerCharacterList"
      @click-character="setTeamCharacter($event)"
    />
    <h2>後衛</h2>
    <CharacterList
      :positonCharacterList="backCharacterList"
      @click-character="setTeamCharacter($event)"
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  reactive,
  toRefs,
  computed,
  SetupContext
} from "@vue/composition-api";
import CharacterList from "@/components/molecule/CharacterList.vue";
import { CharacterInfo } from "@/model/characterInfo.model";

export default defineComponent({
  components: {
    CharacterList: CharacterList
  },
  props: {
    characterInfoList: {
      type: Array as PropType<CharacterInfo[] | null>,
      default: () => new Array<CharacterInfo>(),
      required: true
    }
  },
  setup(props, context: SetupContext) {
    const state = reactive({
      selectCharacter: new Array<CharacterInfo>() as CharacterInfo[],
      /**
       * 前衛のキャラクターリスト
       */
      frontCharacterList: computed((): CharacterInfo[] | null => {
        if (props.characterInfoList == null) {
          return null;
        }
        return props.characterInfoList.filter(
          characterInfo => characterInfo.position == 1
        );
      }),

      /**
       * 中衛のキャラクターリスト
       */
      centerCharacterList: computed((): CharacterInfo[] | null => {
        if (props.characterInfoList == null) {
          return null;
        }
        return props.characterInfoList.filter(
          characterInfo => characterInfo.position == 2
        );
      }),

      /**
       * 後衛のキャラクターリスト
       */
      backCharacterList: computed((): CharacterInfo[] | null => {
        if (props.characterInfoList == null) {
          return null;
        }
        return props.characterInfoList.filter(
          characterInfo => characterInfo.position == 3
        );
      })
    });

    /**
     * チームのキャラクター(最大５名)を設定し、チーム情報を連携する
     * ポジション順に昇順ソートされる
     *
     * param characterInfo キャラクター情報
     */
    const setTeamCharacter = (characterInfo: CharacterInfo) => {
      const deleteCharacterIndex = state.selectCharacter.findIndex(
        selectCharacter => selectCharacter.id == characterInfo.id
      );
      if (deleteCharacterIndex >= 0) {
        state.selectCharacter.splice(deleteCharacterIndex, 1);
      } else {
        if (state.selectCharacter.length <= 4) {
          state.selectCharacter.push(characterInfo);
          state.selectCharacter.sort(function(a, b) {
            //昇順ソート
            return a.config > b.config ? 1 : -1;
          });
        }
      }
      context.emit("set-team-info", state.selectCharacter);
    };
    return {
      ...toRefs(state),
      setTeamCharacter
    };
  }
});
</script>
