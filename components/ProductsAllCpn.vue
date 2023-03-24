<template>
  <div class="container-fluid">
    <div class="row collections-filter d-flex justify-content-between align-items-center">
      <div>
        <img width="50" height="50" src="https://assets.comem.vn/images/collections/flower.png" alt="">
        <span class="font--medium text--20">SẢN PHẨM</span>
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
            <b-col style="padding: 0.35rem" v-for="(item, index) in dataProductListPagination" cols="6" sm="6" md="4"
                   lg="3"
                   xl="3" :key="index">
              <CardProductDetail
                :info-product="item"
              />
            </b-col>
          </b-row>
        </b-container>
      </div>
    </div>

    <PaginationCpn
      :rows="rows"
      :current-page="currentPage"
      :perPage="perPage"
      @currentEmit="getEmitCurrentPage"
    />

  </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex";
import SelectCpn from "~/components/libs/SelectCpn.vue";
import CardProductDetail from "~/components/libs/CardProductDetail.vue"
import * as CONSTANTS from "~/utils/Constants"
import PaginationCpn from '~/components/libs/PaginigationCpn.vue'

export default {

  name: "productsCpn",
  components: {SelectCpn, CardProductDetail, PaginationCpn},
  data() {
    return {
      perPage: CONSTANTS.PAGE_ALL_PRODUCT.perPage, // 12
      currentPage: 1,
      rows: 10,

      dataProductDetails: {},
      dataProductList: [],
      dataProductListPagination: [],
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
    this.dataProductList = this.chunkArray(this.dataProductFirebase?.map(item => {
      return item?.list?.map(item => item?.products)
    }).flat(2).filter(item => {
      if (item) {
        return item
      }
    }).sort((a, b) => {
      let nameA = a['tag-description']?.toUpperCase().split('||')[0];
      let nameB = b['tag-description']?.toUpperCase().split('||')[0];
      if (nameA === undefined) {
        nameA = 'YYYY'
      } else if (nameA.includes('NEW')) {
        nameA = 'AA'
      }
      if (nameB === undefined) {
        nameB = 'YYYY'
      } else if (nameB.includes('NEW')) {
        nameB = 'AA'
      }
      return nameA.localeCompare(nameB)
    }), this.perPage)

    this.dataProductListPagination = this.dataProductList[0]
    this.rows = this.dataProductList.length * CONSTANTS.PAGE_ALL_PRODUCT.perPage;
    await this.setDataTree([
      {name: 'Tất cả Sản phẩm', link: 'product'}
    ])

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
    },

    chunkArray(myArray, chunk_size) {
      let results = [];
      while (myArray.length) {
        results.push(myArray.splice(0, chunk_size));
      }
      return results;
    },

    getEmitCurrentPage(currentPage){
      this.currentPage = currentPage
    }
  },

}
</script>

<style scoped lang="scss">
::v-deep .pagination-product-all {
  li {
    margin-right: 0.25rem !important;
    margin-left: 0.25rem !important;
  }

  .page-item.disabled .page-link {
    border-radius: 50% !important;
  }

  .page-link {
    padding: 0.5rem 0.85rem !important;
    border-radius: 50% !important;
  }
  .page-item.active .page-link {
    background-color: var(--color-primary);
    border-color: var(--color-primary);
    box-shadow: 0 0 0 0.2rem rgba(98, 108, 19, 0.20);
  }
}

</style>
