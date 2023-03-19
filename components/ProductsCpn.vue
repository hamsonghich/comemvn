<template>
  <div class="container-fluid">
    <div class="row collections-filter d-flex justify-content-between align-items-center">
      <div>
        <img width="50" height="50" src="https://assets.comem.vn/images/collections/flower.png" alt="">
        <span class="font--medium text--20">{{ this.dataProductDetails?.name.toUpperCase() }}</span>
      </div>
      <div class="d-flex align-items-center justify-content-start">
        <span class="font--regular text--12 mr--2">Sắp xếp theo: </span>
        <div class="dropdown-price">
          <SelectCpn
            :options="optionsSort"
            :isCustom="true"
            @selectedEmmit="chooseSelected"
          />
        </div>
      </div>

    </div>
    <div class="row collections-list">
      <div class="d-flex flex-wrap" v-for="item in dataProductDetails?.list">
        <div class="m--2" v-for="itemC in item.products">
          <CardProductDetail
            :info-product="itemC"
          />
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex";
import SelectCpn from "~/components/libs/SelectCpn.vue";
import CardProductDetail from "~/components/libs/CardProductDetail.vue"

export default {
  name: "productsCpn",
  components: {SelectCpn, CardProductDetail},
  data() {
    return {
      dataProductDetails: {},
      optionsSort: [
        {value: 'newest', text: 'Mới nhất'},
        {value: 'hightToLow', text: 'Cao đến thấp'},
        {value: 'lowToHight', text: 'Thấp đến cao'},
        {value: 'name', text: 'Tên sản phẩm'}
      ]
    }
  },
  created() {
    this.getDataProduct();
    this.dataProductDetails = this.getDataAll.filter(item => {
      return item.link === this.$route.params.product
    })[0]
  },
  computed: {
    ...mapState('home', [
      'dataProduct'
    ]),
    ...mapGetters('home', [
      'getDataAll'
    ])
  },
  methods: {
    ...mapActions('home', [
      'getDataProduct'
    ]),
    chooseSelected(value){
      console.log('emit', value)
    }
  },
  watch: {
    'dataProduct': function () {
      this.dataProductDetails = this.getDataAll.filter(item => {
        return item.link === this.$route.params.product
      })[0]
    }
  }
}
</script>

<style scoped>

</style>
