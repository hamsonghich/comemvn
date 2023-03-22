<template>
  <div class="container-fluid">
    <div class="row w-100">
      <TreeAddress class="px--3" />
      <div class="container-fluid">
        <div class="row">
          <div class="col-6 d-flex carousel-img-left">
            <div style="width: 20%;">

              <ul class="d-flex flex-column justify-content-center align-items-center">
                <li @click="onSetSlice(index)" :class="slide === index ? 'active' : ''" class="img-item m--2" v-for="(item, index) in this.dataProductDetails?.images"
                    :key="index">
                  <img width="100%" height="100%" :src="item.link" alt="">
                </li>
              </ul>

            </div>
            <div style="width: 80%;">
              <b-carousel
                ref="myCarousel"
                id="carousel-fade"
                style="text-shadow: 0px 0px 2px #000; width: 35vw; height: 35vw"
                fade
                indicators
                controls
                img-width="1024"
                img-height="480"
                @sliding-start="onSlideStart"
                @sliding-end="onSlideEnd"
                v-model="slide"
                :interval="3000"
                class="sonnguyen"
                :value="slide"
              >
                <b-carousel-slide v-for="item in this.dataProductDetails?.images"
                                  :img-src="item?.link"
                ></b-carousel-slide>
              </b-carousel>
              <p class="mt-4">
                Slide #: {{ slide }}<br>
                Sliding: {{ sliding }}
              </p>
            </div>

          </div>
          <div class="col-6">

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TreeAddress from "~/components/libs/TreeAddress.vue";
import {mapActions, mapGetters, mapState} from "vuex";

export default {
  name: 'ProductDetailsCpn',
  components: {TreeAddress},
  layout: 'product-details',
  data() {
    return {
      slide: 0,
      sliding: null,
      dataProductDetails: null
    }
  },
  async created() {
    await this.getDataProductFirebase()
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

    console.log('dataProductDetails', this.dataProductDetails)
    this.setDataTree([
      {name: 'Tất cả Sản phẩm', link: 'product'},
      {name: this.dataProductDetails?.parent1?.name, link: 'product/' + this.dataProductDetails?.parent1?.link},
      {name: this.dataProductDetails?.parent2?.name, link: 'product-sub/' + this.dataProductDetails?.parent2?.link},
      {name: this.dataProductDetails?.name, link: 'product-details/'+this.dataProductDetails?.link}
    ])
  },
  computed: {
    ...mapState('tree', [
      'dataTree'
    ]),
    ...mapState('home', [
      'dataProductFirebase'
    ]),
    ...mapGetters('tree', [
      'getDataTree'
    ]),
    ...mapGetters('home', [
      'getDataAllFirebase'
    ]),
  },
  methods: {
    ...mapActions('tree', [
      'setDataTree'
    ]),
    ...mapActions('home', [
      'getDataProductFirebase'
    ]),
    onSlideStart(slide) {
      this.sliding = true
    },
    onSlideEnd(slide) {
      this.sliding = false
    },
    onSetSlice(index){
      console.log('index', index)
      this.$refs.myCarousel.setSlide(index)
      this.slice = index
    }
  }
}

</script>

<style scoped lang="scss">
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

.carousel-img-left{
  .img-item{
    width: 70px;height: 70px;
    border-radius: 50%;
    overflow: hidden;
  }
  .img-item.active{
    border: 3px solid var(--color-2);
  }
}
</style>
