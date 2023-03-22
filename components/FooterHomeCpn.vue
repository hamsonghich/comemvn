<template>
  <div class="container-fluid">
    <div class="row site-footer__main">
      <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 " v-for="(item, index) in dataFooterFirebase" :key="index">
        <p class="footer-title text--16 font--semibold">{{ item.name }}</p>
        <ul>
          <li class="footer-details text--16 font--regular mb--3" v-for="(itemC, indexC) in item.list" :key="indexC">
            <nuxt-link :key="indexC" :to="`/info/`+itemC.link">
              {{ itemC.name }}
            </nuxt-link>
          </li>
        </ul>
        <div v-if="index === 3">
          <div class="box-stores">
            <nuxt-link to="/home" class="d-flex justify-content-start align-items-center text-deco-none">
              <div class="box-stores_icon">
                <i class="fa-sharp fa-regular fa-store"></i>
              </div>
              <div class="box-stores_text">
               <span>Hệ thống cửa hàng</span>
              </div>
            </nuxt-link>

          </div>
        </div>
      </div>
    </div>
    <div class="row site-footer__sub">
      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 d-flex justify-content-start align-items-center">
        <InputWebComponent
          placeholder="Đăng ki email để nhận ưu đãi *"
          value="valueEmail"
          @valueInputEmit="fnEmitValueInputEmail"
          class="input--footer"
        />
        <Button class="btn-register">Đăng kí</Button>
      </div>
      <div class="col-xl-2 col-lg-2 col-md-6 col-sm-6 col-12
      d-xl-block d-lg-block d-sm-none d-md-none d-none">
        <img class="logo" src="~assets/img/background/logo.png" alt="">
      </div>
      <div class="col-xl-2 col-lg-2 col-md-6 col-sm-6 col-12
      d-xl-block d-lg-block d-sm-none d-md-none d-none d-flex justify-content-center align-items-center">
          <span class="d-block text--title text--17 font--medium text-center">
            MỸ PHẨM THIÊN NHIÊN <br/>
            LÀNH VÀ THẬT
          </span>
      </div>
      <div class="col-xl-2 col-lg-2 col-md-6 col-sm-6 col-12 d-flex justify-content-end align-items-center">
        <ul class="list-icon">
          <li>
            <nuxt-link to="/home" >
              <i class="fa-brands fa-square-facebook"></i>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/home">
              <i class="fa-brands fa-instagram"></i>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/home">
              <i class="fa-brands fa-square-youtube"></i>
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="row site-footer__info">
      <div class="col-xl-5 col-lg- col-md-5 col-sm-6 col-12 site-footer__custom__item__title">
        <p>Công ty Cổ phần Mỹ phẩm Thiên nhiên Cỏ Mềm</p>
        <p>GPĐKKD số 0109153702 do Sở KHĐT Tp.Hà Nội cấp 09/04/2020</p>
        <p>Sản xuất tại Nhà máy Mỹ phẩm Thiên Nhiên Song An</p>
        <p>225 Trần Đăng Ninh, p. Dịch Vọng, q. Cầu Giấy, Hà Nội</p>
      </div>
      <div class="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 ">
        <div class="add-notes">
          <div class="footer-notify">
            <span>
              <b>*Lưu ý:</b> Tác dụng của sản phẩm có thể thay đổi tùy theo tình trạng thể chất mỗi
                        người
            </span>
          </div>
        </div>
      </div>
      <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 d-flex justify-content-center align-items-center">
        <div class="site-footer__custom__item">
          <a
            href="https://online.gov.vn/(X(1)S(ta4ke4p5yari4hna25hr0pjo))/Home/WebDetails/83617?AspxAutoDetectCookieSupport=1">
            <img src="~assets/img/background/logo-bo-cong-thuong.png" alt="logo-bo-cong-thuong.png">
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.site-footer__main {
  background-color: var(--color-13);
  padding: 30px 40px !important;
  border-bottom: 1px solid rgba(76, 80, 61, .25);

  .footer-title {
    color: var(--color-white);
    text-transform: uppercase;
    line-height: 25px;
  }

  .footer-details {
    color: var(--color-white);
    line-height: 25px;

    a {
      text-decoration: none;
      color: var(--color-white);
      transition: 0.25s ease-in-out;
    }

    a:hover {
      font-weight: 600;
      transition: 0.25s ease-in-out;
      font-size: 15px;
    }
  }

  .box-stores {
    background: orange;
    border-radius: 5px;
    display: flex;
    max-width: 250px;

    .box-stores_icon {
      background-color: #626c13;
      border: 10px solid #626c13;
      border-radius: 5px 0 0 5px;
      height: 50px;
      width: 50px;

      i {
        font-size: 27px;
        color: var(--color-white);
      }
    }

    .box-stores_text {
      color: var(--color-14);
      font-size: 16px;
      font-weight: 700;
      letter-spacing: .5px;
      padding: 12px 0 12px 12px;
      width: calc(100% - 50px);
    }
  }
}

.site-footer__sub {
  background-color: var(--color-13);
  padding: 30px 40px !important;

  .wrapper-input-text.input--footer {
    width: 80%;
  }

  .input--footer {
    ::v-deep input.input-default {
      padding: 10px !important;
      height: 50px !important;
      border-bottom-right-radius: 0 !important;
      border-top-right-radius: 0 !important;
      border: 2px solid #626c13;
      background-color: #626c13;
      color: var(--color-white);
    }

    ::v-deep input.input-default::placeholder {
      color: var(--color-white)
    }
  }

  .btn-register {
    background-color: #ffaa0b;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    border: 2px solid #626c13;
    height: 50px;
    border-left: 0;
    width: 100px;
    color: var(--color-14);
    font-size: 16px;
    text-transform: uppercase;
    font-weight: 600;
  }

  .text--title {
    color: var(--color-white);
  }

  .logo {
    @media only screen and (max-width: 1263px) {
      float: right;
    }
  }

  ul.list-icon {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    li {
      a {
        i {
          font-size: 42px;
          color: var(--color-white);
          margin-right: 15px;
        }
      }
    }
  }
}

.site-footer__info {
  background-color: var(--color-12);
  padding: 10px 40px !important;

  .site-footer__custom__item__title {
    p {
      margin-bottom: 0;
      font-size: 14px;
      line-height: 21px;
      color: var(--color--14);
      font-weight: 600;
    }

    @media only screen and (max-width: 599px) {
      p {
        text-align: center;
      }
    }
  }

  .add-notes {
    background-color: #e9f0d5;
    border-radius: 10px;
    margin-top: 15px;
    padding: 10px 15px;
    position: relative;
    font-weight: 600;
    font-size: 14px;
  }

  .footer-notify:before {
    border: 8px solid hsla(0, 0%, 100%, 0);
    border-bottom-color: #e9f0d5;
    bottom: 100%;
    content: "";
    height: 0;
    left: 10px;
    position: absolute;
    width: 0;
  }
}
</style>

<script>
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
import InputWebComponent from "~/components/InputWebComponent.vue";

export default {
  components: {
    InputWebComponent
  },
  data() {
    return {
      valueEmail: ''
    }
  },
  async created() {
    await this.dataFooterFirebaseActions()
  },
  computed:{
    ...mapState('footer', [
      'dataFooter',
      'dataFooterFirebase'
    ]),
    ...mapGetters('footer', [
      'getDataFooter',
      'getDataFooterFirebase'
    ])
  },
  methods: {
    ...mapActions('footer', [
      'dataFooterActions',
      'dataFooterFirebaseActions'
    ]),
    fnEmitValueInputEmail(email) {
      this.valueEmail = email
    }
  },
  watch:{
    'dataFooterFirebase': async function () {
      await this.dataFooterFirebaseActions()
    }
  }
}

</script>

