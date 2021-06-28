<template>
  <div class="home">
    <h1>キャラクターリスト</h1>
    <p>
      キャラクターリストを配置順に表示する。選択された場合、選択結果をポジション順にそーとし返却する
    </p>
    <p>{{ characterInfoList }}</p>
    <p>前衛</p>
    <CharacterList :positonCharacterList="frontCharacterList" />
    <p>中衛</p>
    <CharacterList :positonCharacterList="centerCharacterList" />
    <p>後衛</p>
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
