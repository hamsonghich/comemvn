<template>
  <div class="container-fluid">
    <div class="row collections-filter d-flex justify-content-between align-items-center">
      <div>
        <img width="50" height="50" src="https://assets.comem.vn/images/collections/flower.png" alt="">
        <span class="font--medium text--20">{{dataProductDetails?.name?.toUpperCase()}}</span>
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
      <div class="d-flex">
        <b-container>
          <b-row>
            <b-col style="padding: 0.35rem" v-for="(item, index) in dataProductList" cols="6" sm="6" md="4" lg="3"
                   xl="2" :key="index">
              <CardProductDetail
                :info-product="item"
              />
            </b-col>
          </b-row>
        </b-container>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex";
import SelectCpn from "~/components/libs/SelectCpn.vue";
import CardProductDetail from "~/components/libs/CardProductDetail.vue"

export default {
  name: "productSubCpn",
  components: {SelectCpn, CardProductDetail},
  data() {
    return {
      dataProductDetails: {},
      dataProductList: [],
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
    this.dataProductDetails = this.getDataAll.map(item => {
      return item.list
    }).flat().find(item => item.link === this.$route.params.productSub)
    this.dataProductList = this.dataProductDetails?.products.filter(item => item !== undefined).sort((a, b) => {
      let nameA = a['tag-description']?.toUpperCase().split('||')[0];
      let nameB = b['tag-description']?.toUpperCase().split('||')[0];
      if (nameA === undefined) {
        nameA = 'YYYY'
      } else if (nameA.includes('NEW')) {
        nameA = 'AAAA'
      }
      if (nameB === undefined) {
        nameB = 'YYYY'
      } else if (nameB.includes('NEW')) {
        nameB = 'AAAA'
      }
      return nameA.localeCompare(nameB)
    })

    this.setDataTree([
      {name: 'Sản phẩm', link: 'product'},
      {name: this.dataProductDetails?.name, link: 'product-sub/' + this.dataProductDetails?.link}
    ])

  },
  mounted() {

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
    ...mapActions('tree', [
      'setDataTree'
    ]),
    chooseSelected(value) {
      console.log('emit', value);
      switch (value) {
        case 'newest':
          this.dataProductList = [...this.dataProductList].sort((a, b) => {
            let nameA = a['tag-description']?.toUpperCase().split('||')[0];
            let nameB = b['tag-description']?.toUpperCase().split('||')[0];
            if (nameA === undefined) {
              nameA = 'YYYY'
            } else if (nameA.includes('NEW')) {
              nameA = 'AAAA'
            }
            if (nameB === undefined) {
              nameB = 'YYYY'
            } else if (nameB.includes('NEW')) {
              nameB = 'AAAA'
            }
            return nameA.localeCompare(nameB)
          })
          break
        case 'hightToLow':
          this.dataProductList = [...this.dataProductList].sort((a, b) => {
            if (!a['discount']) {
              a['discount'] = 1
            }
            if (!b['discount']) {
              b['discount'] = 1
            }
            return (a['price-old'] * a['discount']) - (b['price-old'] * b['discount'])
          })
          break
        case 'lowToHight':
          this.dataProductList = [...this.dataProductList].sort((b, a) => {
            if (!a['discount']) {
              a['discount'] = 1
            }
            if (!b['discount']) {
              b['discount'] = 1
            }
            return (a['price-old'] * a['discount']) - (b['price-old'] * b['discount'])
          })
          break
        case 'name':
          this.dataProductList = [...this.dataProductList].sort((a, b) => {
            const nameA = a.name.toUpperCase(); // ignore upper and lowercase
            const nameB = b.name.toUpperCase(); // ignore upper and lowercase
            return nameA.localeCompare(nameB)
          })
          break
        default:

      }
    }
  },
  watch: {
    'dataProduct': function () {
      this.dataProductDetails = this.getDataAll.map(item => {
        return item.list
      }).flat().find(item => item.link === this.$route.params.productSub)
      this.dataProductList = this.dataProductDetails?.products.filter(item => item !== undefined).sort((a, b) => {
        let nameA = a['tag-description']?.toUpperCase().split('||')[0];
        let nameB = b['tag-description']?.toUpperCase().split('||')[0];
        if (nameA === undefined) {
          nameA = 'YYYY'
        } else if (nameA.includes('NEW')) {
          nameA = 'AAAA'
        }
        if (nameB === undefined) {
          nameB = 'YYYY'
        } else if (nameB.includes('NEW')) {
          nameB = 'AAAA'
        }
        return nameA.localeCompare(nameB)
      })

      console.log('data', this.dataProductDetails)

    }
  }
}
</script>

<style scoped>

</style>
