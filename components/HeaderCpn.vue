<template>
  <div class="container-fluid site-header">
    <div class="row site-header__top-sale">
      <nuxt-link class="link-title py--2 w-100" to="/home">
        <div class="font--medium text-center text--16">[QUÀ TẶNG] cho mọi đơn hàng từ 1-10/3. Mua Ngay</div>
      </nuxt-link>
    </div>
    <div class="row site-header__main-sale my--3 px--4 d-flex justify-content-between align-items-center">
      <div class="logo">
        <img src="~assets/img/background/logo.png" alt="">
      </div>
      <div class="search-bar w-auto">
        <InputSearchWebComponent
          :is-class-header="false"
          :placeholder="'Tìm sản phẩm, danh mục mong muốn ...'"
          :list-options="this.listSearchOptions"
          :filter-by-query="true"
          :maxSuggestions="10"
          :displayAttribute="'title'"
          :valueAttribute="'id'"
          @emitChooseSearch="fnEmitChooseSearch"
        />
      </div>
      <div class="list-option">
        <div class="wrapper-btn-uncollapse">
          <ul class="d-flex align-items-center">
            <li class="store">
              <nuxt-link to="/store" alt="cua hang">
                <div class="d-flex align-items-center">
                  <font-awesome-icon style="width: 35px; height: 35px; color: white" icon="fa-solid fa-store"/>
                  <div>
                    <span>HỆ THỐNG</span> <br/>
                    <span>CỬA HÀNG</span>
                  </div>
                </div>
              </nuxt-link>
            </li>
            <li class="login">
              <nuxt-link to="/login">
                <font-awesome-icon icon="fa-solid fa-user"/>
              </nuxt-link>
            </li>
            <li class="favorite">
              <nuxt-link to="/favorite">
                <font-awesome-icon icon="fa-solid fa-heart"/>
              </nuxt-link>
            </li>
            <li class="cart">
              <v-badge
                avatar
                bordered
                overlap
              >
                <template #badge>
                  <v-avatar style="background: #e67e22cc">
                    01
                  </v-avatar>
                </template>
                <v-avatar size="30">
                  <font-awesome-icon style="color: white" icon="fa-solid fa-cart-shopping"/>
                </v-avatar>
              </v-badge>
            </li>
          </ul>
        </div>
        <div class="wrapper-btn-collapse">
          <b-dropdown id="dropdown-right" right text="" variant="" class="m-2">
            <template #button-content>
              <i style="color: var(--color-white); background: none;" class="fa-light fa-bars"></i>
            </template>
            <b-dropdown-item>
              <nuxt-link to="/home">
                <i class="fa-thin fa-store"></i>
                <span>Hệ thống cửa hàng</span>
              </nuxt-link>
            </b-dropdown-item>
            <b-dropdown-item>
              <nuxt-link to="/home">
                <i class="fa-thin fa-user"></i>
                <span>Đăng nhập</span>
              </nuxt-link>
            </b-dropdown-item>
            <b-dropdown-item>
              <nuxt-link to="/home">
                <i class="fa-thin fa-heart"></i>
                <span>Yêu thích</span>
              </nuxt-link>
            </b-dropdown-item>
            <b-dropdown-item>
              <nuxt-link to="/home">
                <i class="fa-thin fa-cart-shopping"></i>
                <span>Giỏ hàng</span>
              </nuxt-link>
            </b-dropdown-item>
          </b-dropdown>
        </div>


      </div>

    </div>
    <div class="row site-header__bottom-sale">
      <div class="site-header__bottom-sale__child">
        <ul class="d-flex justify-content-start align-items-center flex-wrap  header-menu">
          <li class="header-menu__item1 px--3 h-100 d-flex justify-content-center align-items-center font--semibold"
              v-for="(item, index) in this.getDataAllFirebase"
              :key="index"
          >
            <nuxt-link class="link-item-header h-100 d-flex justify-content-center align-items-center"
                       :key="index" :to="`/product/`+item.link">
              {{ item.name }}
            </nuxt-link>
            <!--            <div :key="index" @mouseover="onOver(index)" @mouseleave="onLeave(index)">-->
            <!--              <b-dropdown-->
            <!--                :key="index"-->
            <!--                id="dropdown-1"-->
            <!--                :text="item.name"-->
            <!--                ref="dropdownRef"-->
            <!--                class="header-menu__item"-->
            <!--                :href="`/product/`+item.link"-->
            <!--              >-->
            <!--                <b-dropdown-item>-->
            <!--                  <div class="container-fluid">-->
            <!--                    <div class="row">-->
            <!--                      <div class="col-3">-->
            <!--                        <ul>-->
            <!--                          <li v-for="(itemC, indexC) in item.list" :key="indexC">-->
            <!--                            {{ itemC.name }}-->
            <!--                          </li>-->
            <!--                        </ul>-->
            <!--                      </div>-->
            <!--                      <div class="col-9">-->
            <!--                          ahihi do ngoc-->
            <!--                      </div>-->
            <!--                    </div>-->
            <!--                  </div>-->
            <!--                </b-dropdown-item>-->
            <!--              </b-dropdown>-->
            <!--            </div>-->
            <div class="content-details">
              <div class="container-fluid">
                <div class="row">
                  <div class="col-3 p--0 m--0">
                    <ul>
                      <li v-for="(itemC, indexC) in item?.list" :key="indexC">
                        <nuxt-link class="item-link d-flex justify-content-between align-items-center font--medium"
                                   :to="`/product/` + itemC.link"
                        >
                          <div @mouseover="getDataItemsVerticalSidebar(itemC)">
                            {{ itemC.name }}
                          </div>
                          <i class="fa-solid fa-chevron-right"></i>
                        </nuxt-link>

                      </li>
                    </ul>
                  </div>
                  <div class="col-9 p--0 m--0">
                    <div v-if="dataItemsVerticalSidebar">
                      <ul>
                        <li v-for="(item,index) in dataItemsVerticalSidebar?.products" :key="index">
                          <!--                          {{item}}-->
                          <ul class="d-flex justify-content-start align-items-center">
                            <li v-for="(itemC,indexC) in item?.images" :key="indexC">
                              <img width="50" height="50" :src="itemC.link" :alt="itemC.name">
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script>

import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
import InputSearchWebComponent from "~/components/InputSearchWebcomponent.vue";


export default {
  components: {
    InputSearchWebComponent
  },
  data() {
    return {
      isShowItemHeader: false,
      dataItemListHeader: null,
      listSearchOptions: [],
      listSearchOptionsAutocomplete: [],
      dataItemsVerticalSidebar: null

    }
  },
  async created() {
    await this.getDataProductFirebase();
    let listSearchOptionsChild = []
    this.listSearchOptions = this.dataProductFirebase?.map(item => {
      if (item?.list) {
        listSearchOptionsChild = [...listSearchOptionsChild, ...item.list.map(itemC => {
          return {title: itemC.name, id: itemC.link}
        })]
      }
      return {title: item.name, id: item.link}
    })
    this.listSearchOptions = [...this.listSearchOptions, ...listSearchOptionsChild]

  },
  computed: {
    ...mapState('home', [
      'dataProduct',
      'dataProductFirebase'
    ]),
    ...mapGetters('home', [
      'getDataAll',
      'getDataAllFirebase'
    ])
  },
  methods: {
    ...mapActions('home', [
      'getDataProduct',
      'getDataProductFirebase'
    ]),
    fnEmitChooseSearch(emit) {
      console.log('emit', emit)
      this.$router.push(`/product/${emit}`)
    },
    getDataItemsVerticalSidebar(itemC) {
      this.dataItemsVerticalSidebar = itemC
    }
  },
  watch:{
    'dataProductFirebase': async function() {
      await this.getDataProductFirebase();
    }
  }
}

</script>

<style scoped lang="scss">
.site-header__top-sale {
  background: var(--color-primary);
  color: #ffff00;

  .link-title {
    color: var(--color-11);
  }
}

.site-header__main-sale {
  background-image: url("~assets/img/background/background-header-top-comem.jpg");
  background-size: cover;
  height: 80px;
  padding: 0 30px !important;

  .logo {
    height: 80%;
    width: auto;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .list-option {
    @media only screen and (min-width: 1024px) {
      .wrapper-btn-uncollapse {
        display: block !important;
      }
      .wrapper-btn-collapse {
        display: none !important;
      }
    }
    @media only screen and (max-width: 1024px) {
      .wrapper-btn-uncollapse {
        display: none !important;
      }
      .wrapper-btn-collapse {
        display: block !important;
      }
    }

    li {
      margin-right: 20px;
    }

    width: auto;

    .store {
      color: var(--color-white);

      svg {
        margin-right: 5px;
      }

      a {
        text-decoration: none;

        span {
          color: var(--color-white);
          font-weight: 600;
        }
      }
    }

    .login, .favorite {
      svg {
        width: 30px;
        height: 30px;
        color: var(--color-white);
      }
    }

    .wrapper-btn-collapse {
      ::v-deep .btn-secondary {
        background: none !important;
        border: none !important;
      }
      ::v-deep ul{
        li{
          padding: 0 !important;
          margin: 0 !important;
          a{
            color: var(--color-primary);
            i{
              padding-right: 10px;
              font-size: 1rem;
            }
            span{
              font-size: 1rem;
            }
          }
        }
      }
    }
  }
}

.site-header__bottom-sale {
  background-color: var(--color-primary);
  position: relative;

  .site-header__bottom-sale__child {
    padding: 0px 2rem !important;

    ::v-deep .header-menu {
      height: auto;
      padding: 8px 0 !important;

      .header-menu__item {
        padding: 5px;
        button {
          background: none !important;
          color: var(--color-white);
          border: none;
          font-weight: 660;
          position: relative;
          text-transform: capitalize;
          border-bottom: 2px solid transparent;
          box-shadow: none !important;
          border-radius: 0;
        }

        button:focus-visible {
          box-shadow: none;
        }

        button:hover {
          border-bottom: 2px solid var(--color-white);
          border-radius: 0;
        }

        button::before {
          position: absolute;
          content: "";
          width: 100%;
          height: 40px;
          background: transparent;
        }

        ul {
          top: 10px !important;
        }
      }

      .header-menu__item1:hover .content-details {
        display: block;
      }

      .header-menu__item1 {
        padding: 5px 0;
        .content-details {
          display: none;
          position: absolute;
          background-color: var(--color-white);
          width: 96%;
          margin-left: 2%;
          left: 0;
          top: 100%;
          box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
          z-index: 1;
          height: 250px;

          ul {
            li {
              .item-link {
                text-decoration: none;
                border: none;
                box-shadow: none;
                color: #567;
                padding: 8px 10px;
                border-bottom: 1px dashed rgba(115, 129, 54, .2);
              }

              .item-link:hover {
                background: rgba(115, 129, 54, .2);
                cursor: pointer;
                color: #738136;
              }

            }
          }
        }
      }
    }

    .link-item-header {
      background-color: transparent;
      text-decoration: none;
      color: var(--color-white);
      font-size: 1rem;
      font-weight: 600;

    }
  }

  .site-header__show-details {
    position: absolute;
    top: 35px;
    right: 2%;
    width: 96%;
    height: 300px;
    background-color: var(--color-white);
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    box-shadow: 1px 1px 10px rgba(0, 0, 0, .4);
  }


}

::v-deep .dropdown-toggle::after {
  display: none !important;
}
</style>
