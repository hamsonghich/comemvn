<template>
  <div>
    <b-button
      :disabled="isDisabled"
      class="btn-template"
      :class="{'class-btn-login': isClassBtnLogin}"
      @click="fnClickBtn"
      >
      {{ contentBtn || 'Button demo' }}
    </b-button>
  </div>
</template>

<script>
export default {
  props: {
    contentBtn: {
      type: String,
      required: false
    },
    isBtnCustom: {
      type: Boolean,
      required: false
    },
    isDisabled: {
      type: Boolean,
      required: false
    },
    isClassBtnLogin: {
      type: Boolean,
      required: false
    }

  },
  data() {
    return {
      content: ''
    }
  },
  methods:{
    fnClickBtn(){
      this.$emit('emitClickBtn', true)
    }
  }
}
</script>

<style scoped lang="scss">
.btn-template {
  color: #FFFFFF;
  background: #ED1B2E;
  padding: 12px 22px;
  border: none;font-size: 18px;
}
.class-btn-login{
  border-radius: 100px;
}
</style>
