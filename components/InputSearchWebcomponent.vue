<template>
  <div class="wrapper-search">
    <vue-simple-suggest
      ref="VueSimpleSuggest"
      class="input--main"
      :class="isClassHeader ? 'input--header' : 'input--default'"
      :placeholder="placeholder"
      v-model="selectedValue"
      :list="listOptions"
      :filter-by-query="filterByQuery"
      :controls="{
        selectionUp: [38, 33],
        selectionDown: [40, 34],
        select: [13, 36],
        showList: [40],
        hideList: [27, 35],
        autocomplete: [32, 13]
      }"
      :max-suggestions="maxSuggestions"
      :min-length="0"
      :value-attribute="valueAttribute"
      :display-attribute="displayAttribute"
      @select="onSelectEvent"
      @keydown="handleKeydown"
    ></vue-simple-suggest>
    <div @click="fnSearch" class="wrapper-btn-search">
      <font-awesome-icon icon="fa-solid fa-magnifying-glass"/>
    </div>

  </div>
</template>

<script>
const KEYCODE_ENTER = 13
export default {
  data() {
    return {
      selectedValue: null
    }
  },
  props: {
    isClassHeader: {
      type: Boolean,
      require: false
    },
    placeholder: {
      type: String,
      require: false
    },
    listOptions: {
      type: Array,
      required: true
    },
    filterByQuery: {
      type: Boolean,
      required: false
    },
    maxSuggestions: {
      type: Number,
      default: 0
    },
    valueAttribute: {
      type: String,
      default: 'title'
    },
    displayAttribute: {
      type: String,
      default: 'id'
    }
  },
  methods: {
    onSelectEvent(value) {
      const chooseValue = this.valueAttribute && this.displayAttribute ? value[this.valueAttribute] : value;
      this.$emit('emitChooseSearch', chooseValue)
    },
    fnSearch() {
      const chooseValue = this.listOptions.filter(item => {
        return item.id.includes(this.selectedValue)
      })[0].id
      this.$emit('emitChooseSearch', chooseValue)
    },
    handleKeydown(event) {
      if (event.keyCode === KEYCODE_ENTER) {
        this.fnSearch()
      }
    }
  },
  watch: {},
  mounted() {
    const suggestInput = this.$refs.VueSimpleSuggest.$el.querySelector('input')
    suggestInput.addEventListener('keydown', this.handleKeydown)
  }
}

</script>

<style lang="scss">
.wrapper-search {
  position: relative;

  .input--main {
    height: 40px;
  }

  .input-wrapper {
    position: relative;

    input {
      height: 100%;
    }
  }

  .vue-simple-suggest.designed .suggestions .suggest-item {
    background-color: var(--color-white) !important;
    color: var(--color-black) !important;
    border-bottom: 1px solid #626c133d !important;
  }

  .vue-simple-suggest.designed .suggestions .suggest-item.hover {
    background-color: var(--color-12) !important;
  }

  .wrapper-btn-search {
    position: absolute;
    display: flex;
    justify-content: flex-end;
    top: 0;
    right: 0;
    width: 70px;
    height: 100%;

    svg {
      top: 10px;
      right: 20px;
      position: absolute;
      width: 20px;
      height: 20px;
      color: var(--color-primary)
    }
  }

}

.input--default {
  min-width: 50vw;

  .vue-simple-suggest.designed .input-wrapper input {
    border-radius: 50px !important;
  }
}
</style>
