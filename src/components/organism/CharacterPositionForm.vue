<template>
  <div class="home">
    <h1>キャラクターリスト</h1>
    <p>
      キャラクターリストを配置順に表示する。選択された場合、選択結果をポジション順にそーとし返却する
      デザインの修正：リストで文字列が埋まっているのでいい感じにやる
    </p>
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
     * チームのキャラクターを設定し、チーム情報を連携する
     * ポジション順に昇順ソートされる
     *
     * param characterInfo キャラクター情報
     */
    const setTeamCharacter = (characterInfo: CharacterInfo) => {
      //todo 同一キャラは削除する。find関数で探すことはできる
      console.log(characterInfo.id);
      if (state.selectCharacter.length <= 4) {
        state.selectCharacter.push(characterInfo);
        state.selectCharacter.sort(function(a, b) {
          //昇順ソート
          return a.position > b.position ? 1 : -1;
        });
        console.log(state.selectCharacter.length);
        console.log(state.selectCharacter[0].id);
      }
    };
    return {
      ...toRefs(state),
      setTeamCharacter
    };
  }
});
</script>
