<template>
  <div class="wrapper-input-password mb--5">
      <b-form-input
        class="input-default"
        :placeholder="placeholder || 'Enter here'"
        :value="valueInput"
        :class="{'input-custom': isInputCustom}"
        v-model="valueInput"
        :state="nameState"
        :type="toggleShowPassword ? 'password' : 'text'"
        @keyup="fnKeyUp"
        autocomplete="off"
        @change="fnChangeValueInput"
      ></b-form-input>
      <b-form-invalid-feedback id="input-live-feedback">
        <font-awesome-icon icon="fa-solid fa-circle-exclamation" />
        {{textWarning ? textWarning : 'Hãy nhập đúng định dạng mật khẩu !'}}
      </b-form-invalid-feedback>
      <div class="icon-eye" @click="fnTogglePassword">
        <font-awesome-icon v-if="toggleShowPassword" icon="fa-solid fa-eye" />
        <font-awesome-icon v-else icon="fa-solid fa-eye-slash" />
      </div>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      required: false
    },
    isInputCustom: {
      type: Boolean,
      required: false
    },
    textWarning:{
      type: String,
      required: false
    }
  },
  computed: {
    nameState() {
      if(this.counter === 2 && this.valueInput === ''){
        return true
      }else if(this.counter >= 2){
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(this.valueInput)
      }else {
        return true
      }
    }
  },
  data() {
    return {
      valueInput: '',
      toggleShowPassword: true,
      counter: 1
    }
  },
  methods: {
    fnTogglePassword(){
      this.toggleShowPassword = !this.toggleShowPassword;
    },
    fnKeyUp(){
      if(event.keyCode){
        this.counter++
      }
    },
    fnChangeValueInput(){
      this.$emit('valueInputEmit', this.valueInput)
      this.$emit('nameState', this.nameState)
    }
  },
  watch:{
    valueInput: function (newValue){
      this.$emit('valueInputEmit', newValue)
      this.$emit('nameState', this.nameState)
    }
  }

}

</script>

<style scoped lang="scss">
.wrapper-input-password{
  position: relative;
}
.icon-eye{
  cursor: pointer;
  position: absolute;
  top: calc(35px - 12.5px);
  right: 15px;
  svg{
    width: 25px;
    height: 25px;
  }
}
.input-default {
  height: 70px;
  background: #FFFFFF;
  padding: 21px 16px 21px 24px;
  box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  border: none;
  font-size: 18px;
}

.was-validated .form-control:invalid:focus, .form-control.is-invalid:focus {
  border: 2px solid #dc3545;
  box-shadow: none;
}

.was-validated .form-control:valid:focus, .form-control.is-valid:focus {
  border: 2px solid #198754;
  box-shadow: none;
}
</style>
