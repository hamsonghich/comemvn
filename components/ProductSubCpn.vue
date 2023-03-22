<template>
  <div class="container-fluid">
    <div class="row collections-filter d-flex justify-content-between align-items-center">
      <div>
        <img width="50" height="50" src="https://assets.comem.vn/images/collections/flower.png" alt="">
        <span class="font--medium text--20">{{ dataProductList[0]?.parent2?.name?.toUpperCase() }}</span>
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
      <div class="d-flex w-100">
        <b-container>
          <b-row>
            <b-col style="padding: 0.35rem" v-for="(item, index) in dataProductList" cols="6" sm="6" md="4" lg="3"
                   xl="3" :key="index">
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
      dataProductList: [],
      optionsSort: [
        {value: 'newest', text: 'Mới nhất'},
        {value: 'hightToLow', text: 'Cao đến thấp'},
        {value: 'lowToHight', text: 'Thấp đến cao'},
        {value: 'name', text: 'Tên sản phẩm'}
      ]
    }
  },
  async created() {
    await this.getDataProductFirebase();
    let parent1, parent2;
    this.dataProductList = this.dataProductFirebase?.map(item => {
      parent1 = {name: item.name, link: item.link}
      return item?.list?.map(item => {
        parent2 = {name: item.name, link: item.link}
        return {...item, parent1: parent1}?.products?.map(item => {
          return {...item, parent2: parent2, parent1: parent1}
        })
      })
    }).flat(2).filter(itemC => itemC !== undefined).filter(item => {
      return item.parent2.link === this.$route.params.productSub
    }).sort((a, b) => {
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
      {name: 'Tất cả Sản phẩm', link: 'product'},
      {name: this.dataProductList[0]?.parent1?.name, link: 'product/' + this.dataProductList[0]?.parent1?.link},
      {name: this.dataProductList[0]?.parent2?.name, link: 'product-sub/' + this.dataProductList[0]?.parent2?.link}
    ])
    console.log('dataTree', this.dataTree)

  },
  mounted() {

  },
  computed: {
    ...mapState('home', [
      'dataProduct',
      'dataProductFirebase'
    ]),
    ...mapGetters('home', [
      'getDataAll',
      'getDataAllFirebase'
    ]),
    ...mapState('tree', [
      'dataTree'
    ])
  },
  methods: {
    ...mapActions('home', [
      'getDataProduct',
      'getDataProductFirebase'
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
    'dataProductFirebase': function () {
      let parent1, parent2;
      this.dataProductList = this.dataProductFirebase?.map(item => {
        parent1 = {name: item.name, link: item.link}
        return item?.list?.map(item => {
          parent2 = {name: item?.name, link: item?.link}
          return {...item, parent1: parent1}?.products?.map(item => {
            return {...item, parent2: parent2, parent1: parent1}
          })
        })
      }).flat(2).filter(itemC => itemC !== undefined).filter(item => {
        return item?.parent2?.link === this.$route.params.productSub
      }).sort((a, b) => {
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
      console.log('dataProductList', this.dataProductList)



    }
  }
}
</script>

<style scoped>

</style>
