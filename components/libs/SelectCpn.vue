<template>
  <div>
    <b-form-select
      v-model="selected"
      :options="options"
      :class="{'custom-select': isCustom, 'default': !isCustom}"
      @change="getSelected"
      :isCustom="isCustom"
    >
    </b-form-select>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array, // type is "text", "value"
      required: true
    },
    isCustom: {
      type: Boolean,
      required: false
    },
  },
  data() {
    return {
      selected: this.options[0].value
    }
  },
  methods: {
    getSelected() {
      this.$emit('selectedEmmit', this.selected)
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep select:focus {
  border: none;
  box-shadow: none;
}

::v-deep select {
  border: none;
  background-color: var(--color-7);
  padding-top:0;
  padding-bottom: 0;
  height: 30px;
  font-size: 0.9rem;
  ::v-deep option {
    border-radius: 0;
    border: 1px solid var(--color-primary);
  }
}
</style>
