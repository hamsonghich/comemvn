<template>
  <div class="container">
    <button class="btn btn-primary" @click="postData">click add</button>
    <div class="row w-100">
      <TreeAddress class="px--3"/>
      <div class="container mt--2">
        <div class="row product-single">
          <div class="col-6 carousel-img-left">
            <div class="row">
              <div>
                <ul class="d-flex flex-column justify-content-center align-items-center">
                  <li @click="onSetSlice(index)" :class="slide === index ? 'active' : ''"
                      class="img-item m--2 mr--4"
                      v-for="(item, index) in this.dataProductDetails?.images.slice(0,5)"
                      :key="index">
                    <img width="100%" height="100%" :src="item.link" alt="">
                  </li>
                </ul>
              </div>
              <div>
                <b-carousel
                  ref="myCarousel"
                  id="carousel-fade"
                  style=""
                  fade
                  indicators
                  controls
                  img-width="1024"
                  img-height="480"
                  @sliding-start="onSlideStart"
                  @sliding-end="onSlideEnd"
                  v-model="slide"
                  :interval="3000"
                  class="bootstrap-carousel-product"
                  :value="slide"
                >
                  <b-carousel-slide v-for="item in this.dataProductDetails?.images"
                                    :img-src="item?.link"
                  ></b-carousel-slide>
                </b-carousel>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <div class="shippingBox mt--5">
                  <p class="text--16 font--medium">Phí ship</p>
                  <ul>
                    <li v-for="item in dataFeeFirebase?.['shipping-fee']">
                      <i class="fa-solid fa-circle-small mr--1"></i> {{ item.name }}
                      <b-button class="p--0 m--0 button--tooltip" variant="primary" style="  background-color:transparent !important;
                           border-color:transparent !important;" v-b-tooltip.hover :title="item?.details">
                        <i v-if="item.details" class="fa-solid fa-message-exclamation"></i>
                      </b-button>
                    </li>
                  </ul>
                </div>

              </div>
              <div class="col-6">
                <div class="shippingBox  mt--5">
                  <p class="text--16 font--medium">Thời gian ship dự kiến</p>
                  <ul>
                    <li v-for="item in dataFeeFirebase?.['shipping-time']">
                      <i class="fa-solid fa-location-dot mr--2"></i>{{ item }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="row d-flex align-items-center justify-content-start">
              <i style="color: var(--color-2)" class="fa-solid fa-circle-check text--16  mr-1"></i>
              <span class="font--semibold text--16 mr-1" style="color: var(--color-2)">Miễn phí </span>
              <span>đổi trả sản phẩm lỗi do vận chuyển, sản xuất</span>
            </div>


          </div>
          <div class="col-6 carousel-content-right">
            <div class="product-single__summary">
              <div class="product-single__heading">
                <p class="product-single__heading__sub font--semibold">
                  {{ dataProductDetails?.name }}
                </p>
                <p class="product-single__heading__sub__details text--16 font--medium">
                  Sáng da, Sạch mụn ẩn, Giảm thâm nám
                </p>
                <div class="d-flex justify-content-start align-items-center">
                  <div style="pointer-events: none" class="mr--4">
                    <b-form-rating v-model="valueStar" color="var(--color-2)" class="rating mt--0"></b-form-rating>
                  </div>
                  <p class="p--0 m--0 text--16">Xem <a class="text--16" href="">{{ this.dataProductDetails?.rate }} đánh
                    giá từ khách đã mua hàng</a></p>
                </div>
                <div>
                  <p class="m--0 p--0 product-single__prices">
                    <ins>{{
                        this.convertCurrencyDiscount(this.dataProductDetails?.['price-old'], this.dataProductDetails?.discount)
                      }} đ
                    </ins>
                    <del>{{ this.convertCurrency(this.dataProductDetails?.['price-old']) }} đ</del>
                  </p>
                </div>
                <div class="product-single__actions d-flex justify-content-start align-items-center px--4 py--3 mt--5">
                  <div
                    class="d-flex justify-content-center align-items-center text--20 font--semibold input-add-cart px--4 py--3">
                    <button @click="clickSubCounter">-</button>
                    <input style="max-width: 50px; text-align: center" v-model="counter" type="number">
                    <button @click="clickAddCounter">+</button>
                  </div>
                  <div class="text-add-to-cart">
                    <span class="text--22 font--semibold px--5">Thêm vào giỏ hàng</span>
                  </div>
                </div>
                <div class="row">
                  <div class="col-6 text--16 font--medium" v-for="item in dataProductDetails?.contents">
                    {{ item?.icon }} {{ item?.text }}
                  </div>
                </div>
                <div class="row">
                  <div class="col-12 p--2 d-flex justify-content-start align-items-center"
                       v-for="item in dataProductDetails?.promotion">
                    <p class="label-promo m--0 p--0 mr--2"><span class="m--1">{{ item?.title }}</span></p>
                    <p class="text-promo m--0 p--0 text--16">{{ item?.text }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TreeAddress from "~/components/libs/TreeAddress.vue";
import {mapActions, mapGetters, mapState} from "vuex";
import firebase from "~/plugins/firebase";
import {postDataFirebase} from "~/utils/functions/FirebaseFunc";

export default {
  name: 'ProductDetailsCpn',
  components: {TreeAddress},
  layout: 'product-details',
  data() {
    return {
      slide: 0,
      sliding: null,
      dataProductDetails: null,
      valueStar: null,
      counter: 0
    }
  },
  async created() {
    await this.getDataProductFirebase()
    await this.dataFeeFirebaseActions()
    let parent1, parent2;
    this.dataProductDetails = this.dataProductFirebase?.map(item => {
      parent1 = {name: item.name, link: item.link}
      return item?.list?.map(item => {
        parent2 = {name: item.name, link: item.link}
        return {...item, parent1: parent1}?.products?.map(item => {
          return {...item, parent2: parent2, parent1: parent1}
        })
      })
    })
      .flat(2).filter(item => item)
      .filter(item => item?.link === this.$route.params.productDetails)[0]

    this.valueStar = this.dataProductDetails?.star

    console.log('dataProductDetails', this.dataProductDetails)

    this.setDataTree([
      {name: 'Tất cả Sản phẩm', link: 'product'},
      {name: this.dataProductDetails?.parent1?.name, link: 'product/' + this.dataProductDetails?.parent1?.link},
      {name: this.dataProductDetails?.parent2?.name, link: 'product-sub/' + this.dataProductDetails?.parent2?.link},
      {name: this.dataProductDetails?.name, link: 'product-details/' + this.dataProductDetails?.link}
    ])

  },
  computed: {
    ...mapState('tree', [
      'dataTree'
    ]),
    ...mapState('home', [
      'dataProductFirebase'
    ]),
    ...mapState('info', [
      'dataFeeFirebase'
    ]),
    ...mapGetters('tree', [
      'getDataTree'
    ]),
    ...mapGetters('home', [
      'getDataAllFirebase'
    ]),
    ...mapGetters('info', [
      'getDataFeeFirebase'
    ])
  },
  methods: {
    ...mapActions('tree', [
      'setDataTree'
    ]),
    ...mapActions('home', [
      'getDataProductFirebase'
    ]),
    ...mapActions('info', [
      'dataFeeFirebaseActions'
    ]),
    onSlideStart(slide) {
      this.sliding = true
    },
    onSlideEnd(slide) {
      this.sliding = false
    },
    onSetSlice(index) {
      this.$refs.myCarousel.setSlide(index)
      this.slice = index
    },
    convertCurrency(currency) {
      return Math.floor(currency / 1000) + '.000';
    },
    convertCurrencyDiscount(oldPrice, discount) {
      if (discount) {
        return Math.floor(oldPrice * (100 - discount) / 100000) + '.000';
      } else {
        return Math.floor(oldPrice / 1000) + '.000';
      }
    },
    clickAddCounter() {
      this.counter++
    },
    clickSubCounter() {
      if (this.counter > 0) {
        this.counter--
      }
    },
    writeNewPost(uid, username, picture, title, body) {
      const postData = {
        author: username,
        uid: uid,
        body: body,
        title: title,
        starCount: 0,
        authorPic: picture
      };

      let newPostKey = firebase.database().ref().child('data-update').push().key;
      let updates = {};
      updates['/data-update/' + newPostKey] = {...postData, key: newPostKey}
      return firebase.database().ref().update(updates);
    },
    deleteNewPost(){
     return firebase.database().ref().child('data-update').remove()
    },
    deleteNewPostItem(){
      return firebase.database().ref().child('data-update/-NRAxmhKOnVdBcO5wN6i').remove()
    },
    postData(){
      const payload = {
        name: 'son nguyen',
        password: 'Sk78787878'
      }
      postDataFirebase('test', payload)
    }
  }
}

</script>

<style scoped lang="scss">
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

::v-deep .carousel-control-next-icon {
  background-image: url("../assets/icon/arrow-down.svg");
  transform: rotate(-90deg);
  background-color: hsla(0, 0%, 100%, 0);
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: 40px;
  border: 0;
  height: 30px;
  width: 30px;
}

::v-deep .carousel-control-prev-icon {
  background-image: url("../assets/icon/arrow-down.svg");
  transform: rotate(90deg);
  background-color: hsla(0, 0%, 100%, 0);
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: 40px;
  border: 0;
  height: 30px;
  width: 30px;
}

::v-deep .bootstrap-carousel-product {
  text-shadow: 0px 0px 2px #000;
  width: 30vw;
  height: 30vw;
  max-width: 450px;
  max-height: 450px;
  overflow: hidden;
  border-radius: 20px
}

.carousel-img-left {
  .img-item {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    overflow: hidden;
    transition: 0.5s ease-in-out;
  }

  .img-item.active {
    border: 3px solid var(--color-2);

    img {
      transform: scale(1.3);
      transition: 0.5s ease-in-out;
    }
  }
}

.carousel-content-right {
  .product-single__heading {
    .product-single__heading__sub {
      color: var(--color-15);
      line-height: 26px;
      font-size: 1.6rem !important;
    }
  }

  .product-single__prices del {
    color: #789;
    font-size: 17px;
    font-weight: 400;
    margin-left: 10px
  }

  .product-single__prices ins {
    color: #4c503d;
    font-weight: 700;
    letter-spacing: 1px;
    text-decoration: none;
    font-size: 24px;
  }

  .product-single__actions {
    background: var(--color-2);
    border-radius: 60px;
    max-width: 380px;
    cursor: pointer;
  }

  .input-add-cart {
    background-color: var(--color-white);
    border-radius: 40px;
  }

  .input-add-cart input:focus-visible {
    border: none;
  }

  .input-add-cart input {
    outline: none;
  }

  .text-add-to-cart {
    color: var(--color-white);
  }

  .label-promo {
    color: #de8d1e;
    border: 1px solid;
    font-size: 11px;
    padding: 2px 5px;
    white-space: nowrap;
  }

  .rating {
    padding: 0;
    border: none;
    width: 100px;
    height: 20px;
    margin: 0 0 0 -4px;
  }

  .rate {
    color: var(--color-17);
  }
}


::v-deep .button--tooltip {
  i {
    color: var(--color-primary) !important;
  }
}

::v-deep .button--tooltip:hover {
  i {
    color: var(--color-primary) !important;
  }
}

.shippingBox {
  background: #f8f9fa;
  border-radius: 7px;
  padding: 10px 15px;
  width: 100%;
}
</style>
