<template>
  <div class="container-fluid p--0 m--0">
    <div class="row w-100 d-flex justify-content-center p--0 m--0">
      <div class="wrapper-login d-flex justify-content-end align-items-center">
        <div class="box-login mr--25">
          <h1 class="text--48 font--bold">PRUOnline</h1>
          <p class="text--16 font--medium">Quản lý hợp đồng bảo hiểm của bạn</p>
          <InputWebComponent
            placeholder="Tên đăng nhập"
            value="valueUserName"
            @valueInputEmit="fnEmitValueInputUsername"
            @nameState="fnEmitValidUsername"
          />
          <InputPasswordWebComponent
            placeholder="Mật khẩu"
            value="valuePassword"
            textWarning=""
            @valueInputEmit="fnEmitValueInputPassword"
            @nameState="fnEmitValidPassword"
          />
          <ButtonWebComponent
            :contentBtn="'Đăng nhập'"
            :isClassBtnLogin="true"
            :is-disabled="!isValidUsername || !isValidPassword"
            @emitClickBtn="fnEmitClickBtn"
          />

          <div class="wrapper-list-link mt--5">
            <ul class="d-flex justify-content-start align-items-center">
              <li>
                <nuxt-link to="/home">Quên mật khẩu</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/home">Quên tên đăng nhập</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/home">Kích hoạt tài khoản</nuxt-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InputWebComponent from '../components/InputWebComponent'
import ButtonWebComponent from '../components/ButtonWebComponent'
import InputPasswordWebComponent from "~/components/InputPasswordWebComponent";

export default {
  components: {
    InputWebComponent,
    InputPasswordWebComponent,
    ButtonWebComponent
  },
  data() {
    return {
      valueUserName: '',
      valuePassword: '',
      isValidUsername: false,
      isValidPassword: false,
    }
  },
  computed:{

  },
  methods:{
    fnEmitValidUsername(emit){
      console.log('emit username', emit)
      this.isValidUsername = emit
    },
    fnEmitValidPassword(emit){
      console.log('emit password', emit)
      this.isValidPassword = emit
    },
    fnEmitValueInputUsername(username){
      this.valueUserName = username
    },
    fnEmitValueInputPassword(password){
      this.valuePassword = password
    },
    fnEmitClickBtn(callback){
      if(callback){
        console.log('username', this.valueUserName, 'password', this.valuePassword)
      }
    }
  }
}

</script>

<style scoped lang="scss">
.h--100vh {
  height: 100vh;
}

.wrapper-login {
  width: calc(100% - 0px);
  height: calc(100vh - 96px);
  background-image: url("~/assets/img/background/bg-login.png");
  background-size: cover;
  background-repeat: no-repeat;
}

.box-login {
  width: 566px;

  background: #F7F7F7;
  box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  padding: 33px;
}

.wrapper-list-link {
  ul {
    li {
      margin-right: 24px;

      a {
        color: var(--color-10);
        transition: 0.15s ease-in-out;
      }

      a:hover {
        font-weight: 600;
        transition: 0.15s ease-in-out;
      }
    }
  }
}

</style>
