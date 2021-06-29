<template>
  <div class="home">
    <h1>キャラクターリスト</h1>
    <p>
      キャラクターリストを配置順に表示する。選択された場合、選択結果をポジション順にそーとし返却する
      デザインの修正：リストで文字列が埋まっているのでいい感じにやる
    </p>
    <h2>前衛</h2>
    <CharacterList :positonCharacterList="frontCharacterList" />
    <h2>中衛</h2>
    <CharacterList :positonCharacterList="centerCharacterList" />
    <h2>後衛</h2>
    <CharacterList :positonCharacterList="backCharacterList" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  reactive,
  toRefs,
  computed
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
      required: true
    }
  },
  setup(props) {
    const state = reactive({
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
    return {
      ...toRefs(state)
    };
  }
});
</script>
