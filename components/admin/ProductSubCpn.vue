<template>
  <div class="p--2">
    <div class="box-title p--3 font--semibold">San pham phu</div>

    <b-button class="my--2 text--12 btn-add-product-main" @click="openModalAddProductMain" >Thêm sản phẩm chính</b-button>

    <!--    modal form add product SUB-->
    <b-modal ref="my-modal-add-product-sub" hide-footer  title="Form nhập thông tin sản phẩm phụ">
      <div class="form">
        <b-form-input
          class="mb--3"
          v-model="dataFormSubAdd.name"
          @keyup.enter="submitFormAddProductSub(selected)"
          @keyup="convertNameToLink(dataFormSubAdd.name, 'add','sub')"
          placeholder="Nhập tên sản phẩm phụ"
        ></b-form-input>
        <b-form-input
          class="mb--3"
          disabled v-model="dataFormSubAdd.link"
          placeholder="Nhập link sản phẩm phụ"
        ></b-form-input>
        <b-button class="mr--3 btn-close-modal" variant="outline-warning"
                  @click="hideModal('add', 'sub')"
        >Đóng tag
        </b-button>
        <b-button variant="outline-primary" class="btn-submit-modal"
                  @click="submitFormAddProductSub(selected)"
        >Gửi đi
        </b-button>
      </div>
    </b-modal>

    <!--    modal form edit product sub-->
    <b-modal ref="my-modal-edit-product-sub" hide-footer id="modal-2" title="Form chỉnh sửa thông tin sản phẩm">
      <div class="form">
        <b-form-input
          class="mb--3"
          v-model="dataFormSubEdit.name"
          @keyup="convertNameToLink(dataFormSubEdit.name, 'edit', 'sub')"
          @keyup.enter="submitFormEditProductSub"
          placeholder="Nhập tên sản phẩm chính"
        ></b-form-input>
        <b-form-input
          class="mb--3"
          disabled v-model="dataFormSubEdit.link"
          placeholder="Nhập link sản phẩm chính"
        ></b-form-input>
        <b-button variant="outline-warning"
                  @click="hideModal('edit', 'sub')"
        >Đóng tag
        </b-button>
        <b-button variant="outline-primary"
                  @click="submitFormEditProductSub()"
        >Gửi đi
        </b-button>
      </div>
    </b-modal>


    <!--    modal form add product main-->
    <b-modal ref="my-modal-add-product-main" hide-footer id="modal-2" title="Form thêm thông tin sản phẩm chính">
      <div class="form">
        <b-form-input
          class="mb--3"
          v-model="dataFormMainAdd.name"
          @keyup="convertNameToLink(dataFormMainAdd.name, 'add', 'main')"
          @keyup.enter="submitFormAddProductMain"
          placeholder="Nhập tên sản phẩm chính"
        ></b-form-input>
        <b-form-input
          class="mb--3"
          disabled v-model="dataFormMainAdd.link"
          placeholder="Nhập link sản phẩm chính"
        ></b-form-input>
        <b-button variant="outline-warning"
                  @click="hideModal('add', 'main')"
        >Đóng tag
        </b-button>
        <b-button variant="outline-primary"
                  @click="submitFormAddProductMain()"
        >Gửi đi
        </b-button>
      </div>
    </b-modal>

    <!--    modal form edit product main-->
    <b-modal ref="my-modal-edit-product-main" hide-footer id="modal-2" title="Form chỉnh sửa thông tin sản phẩm">
      <div class="form">
        <b-form-input
          class="mb--3"
          v-model="dataFormMainEdit.name"
          @keyup="convertNameToLink(dataFormMainEdit.name, 'edit', 'main')"
          @keyup.enter="submitFormEditProductMain"
          placeholder="Nhập tên sản phẩm chính"
        ></b-form-input>
        <b-form-input
          class="mb--3"
          disabled v-model="dataFormMainEdit.link"
          placeholder="Nhập link sản phẩm chính"
        ></b-form-input>
        <b-button variant="outline-warning"
                  @click="hideModal('edit', 'main')"
        >Đóng tag
        </b-button>
        <b-button variant="outline-primary"
                  @click="submitFormEditProductMain()"
        >Gửi đi
        </b-button>
      </div>
    </b-modal>


    <!--    modal form add product details-->
    <b-modal ref="my-modal-add-product-details" hide-footer id="modal-2" title="Form thêm thông tin sản phẩm chi tiết">
      <div class="form">
        <b-form-input
          class="mb--3"
          v-model="dataFormDetailsAdd.name"
          @keyup="convertNameToLink(dataFormDetailsAdd.name, 'add', 'details')"
          @keyup.enter="submitFormAddProductDetails"
          placeholder="Nhập tên sản phẩm chi tiết"
        ></b-form-input>
        <b-form-input
          class="mb--3"
          disabled v-model="dataFormDetailsAdd.link"
          placeholder="Nhập link sản phẩm chi tiết"
        ></b-form-input>
        <b-button variant="outline-warning"
                  @click="hideModal('add', 'details')"
        >Đóng tag
        </b-button>
        <b-button variant="outline-primary"
                  @click="submitFormAddProductDetails()"
        >Gửi đi
        </b-button>
      </div>
    </b-modal>


    <div>
      <div class="row">
        <div class="col-3">
          Tên sản phẩm chính
        </div>
        <div class="col-3">
          Link sản phẩm chính
        </div>
        <div class="col-3">
          Key
        </div>
        <div class="col-3">
          Tùy chọn
        </div>
      </div>
      <div  v-for="(itemP, indexP) in dataProduct" class="row row-table-main-product"
           :key="indexP">
        <div v-b-toggle="'collapse-' + indexP" class="col-3 font--medium">
          {{ itemP.name }}
        </div>
        <div v-b-toggle="'collapse-' + indexP" class="col-3 font--medium">
          {{ itemP.link }}
        </div>
        <div v-b-toggle="'collapse-' + indexP" class="col-3 font--medium">
          {{ itemP.key }}
        </div>
        <div class="col-3 font--medium">
          <button @click="addFormProductSub(itemP)" class="mx--1"><i class="fa-solid fa-circle-plus"></i></button>
          <button @click="editFormProductMain(itemP)" class="mx--1"><i class="fa-solid fa-pen-to-square"></i></button>
          <button @click="deleteFormProductMain(itemP)" class="mx--1"><i class="fa-solid fa-trash"></i></button>
        </div>


        <b-collapse class=" w-100 mt-2" :id="`collapse-`+indexP">
          <b-card class="contain-product-sub w-100">
            <div v-if="_dataProductSubHandles[itemP.key]">
              <div v-for="(itemC, indexC) in dataProductSubArr[indexP]"
                   class="row row-table-sub-product"
                   :key="indexC">
                <div  v-b-toggle="'collapse-child' + indexC" class="col-3">
                  {{ itemC.name }}
                </div>
                <div v-b-toggle="'collapse-child' + indexC" class="col-3">
                  {{ itemC.link }}
                </div>
                <div v-b-toggle="'collapse-child' + indexC" class="col-3">
                  {{ itemC.key }}
                </div>
                <div class="col-3">
                  <button @click="addFormProductDetails(itemC, itemP)" class="mx--1"><i class="fa-solid fa-circle-plus"></i></button>
                  <button @click="editFormProductSub(itemC, itemP)" class="mx--1"><i class="fa-solid fa-pen-to-square"></i></button>
                  <button @click="deleteFormProductSub(itemC, itemP)" class="mx--1"><i class="fa-solid fa-trash"></i></button>
                </div>

                <b-collapse class=" w-100 mt-2" :id="`collapse-child`+indexC">
                  <b-card class="contain-product-sub w-100">
                    ahihi
                  </b-card>
                </b-collapse>

              </div>

            </div>

          </b-card>
        </b-collapse>

      </div>
    </div>

  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";
import {removeVietnameseTones, convertLinkUtils} from '~/utils/functions/formatMoney'
import {postDataFirebase, setDataFirebase, deleteDataFirebase} from '~/utils/functions/FirebaseFunc'
import async from "async";

export default {
  data() {
    return {
      dataFormSubAdd: {
        name: "",
        link: "",
      },
      dataFormSubEdit: {
        name: "",
        link: "",
        key: ""
      },
      dataFormMainAdd:{
        name: "",
        link: "",
      },
      dataFormMainEdit: {
        name: "",
        link: "",
        key: ""
      },
      dataFormDetailsAdd: {
        name: "",
        link: "",
      },
      selected: null,
      selectedDetails: null,
      options: [],
      productSubAll: {},
      productSubAllEx: [],
      dataItemParent:{},
      dataProductSubArr: [],
      productDetailsAll:[]
    }
  },
  async created() {
    await this.getDataProduct()
  },
  computed: {
    ...mapState('product', [
      'dataProduct'
    ]),
    ...mapState('productSub', [
      'dataProductSub',
      'dataProductSubHandles'
    ]),
    ...mapState('productDetails', [
      'dataProductDetails',
      'dataProductDetailsHandles'
    ]),
    ...mapGetters('productSub', [
      '_dataProductSub',
      '_dataProductSubHandles'
    ]),
    ...mapGetters('productDetails', [
      '_dataProductDetails',
      '_dataProductDetailsHandles'
    ])
  },
  methods: {
    async() {
      return async
    },
    ...mapActions('product', [
      'getDataProduct'
    ]),
    ...mapActions('productSub', [
      'getDataProductSub',
      'getDataProductSubHandles'
    ]),
    ...mapActions('productDetails', [
      'getDataProductDetails',
      'getDataProductDetailsHandles'
    ]),
    convertNameToLink(name, value, option) {
      if (value === 'add' && option === 'sub') {
        this.dataFormSubAdd.link = convertLinkUtils(name)
      } else if (value === 'edit' && option === 'sub') {
        this.dataFormSubEdit.link = convertLinkUtils(name)
      } else if (value === 'edit' && option === 'main') {
        this.dataFormMainEdit.link = convertLinkUtils(name)
      }else if (value === 'add' && option === 'main') {
          this.dataFormMainAdd.link = convertLinkUtils(name)
      }else if (value === 'add' && option === 'details') {
        this.dataFormDetailsAdd.link = convertLinkUtils(name)
      }

    },
    async submitFormAddProductSub(key) {
      await postDataFirebase(`data-product/${key}/product-sub/`, this.dataFormSubAdd)
      this.hideModal('add', 'sub')
    },
    hideModal(value, option) {
      if (value === 'add' && option === 'sub') {
        this.$refs['my-modal-add-product-sub'].hide();
        this.dataFormSubAdd = {
          name: "",
          link: ""
        }
      }
      else if (value === 'edit' && option === 'sub') {
        this.$refs['my-modal-edit-product-sub'].hide()
        this.dataFormSubEdit = {
          name: "",
          link: "",
          key: ""
        }
      }
      else if (value === 'add' && option === 'main') {
        this.$refs['my-modal-add-product-main'].hide()
        this.dataFormSubEdit = {
          name: "",
          link: "",
          key: ""
        }
      }
      else if (value === 'edit' && option === 'main') {
        this.$refs['my-modal-edit-product-main'].hide()
        this.dataFormSubEdit = {
          name: "",
          link: "",
          key: ""
        }
      }
      else if (value === 'add' && option === 'details') {
        this.$refs['my-modal-add-product-details'].hide()
        this.dataFormDetailsAdd = {
          name: "",
          link: "",
        }
      }
    },
    editFormProductSub(itemC, itemP) {
      this.dataItemParent = itemP
      this.$refs['my-modal-edit-product-sub'].show()
      this.dataFormSubEdit = {...itemC}

    },
    deleteFormProductSub(itemC, itemP){
      deleteDataFirebase(`data-product/${itemP.key}/product-sub`, itemC.key)
    },
    async submitFormAddProductMain() {
      await postDataFirebase('data-product', this.dataFormMainAdd)
      this.hideModal('add', 'main')
    },
    async submitFormEditProductMain() {
      await setDataFirebase('data-product', this.dataFormMainEdit.key, this.dataFormMainEdit)
      this.$refs['my-modal-edit-product-main'].hide()
    },
    deleteForm(item) {
      deleteDataFirebase('data-product', item.key)
    },
    editFormProductMain(item){
      this.$refs['my-modal-edit-product-main'].show()
      this.dataFormMainEdit = {...item}
    },
    async deleteFormProductMain(item) {
      await deleteDataFirebase('data-product', item.key)
    },
    openModalAddProductMain(){
      this.$refs['my-modal-add-product-main'].show()
    },
    addFormProductSub(itemP){
      this.selected = itemP.key
      this.$refs['my-modal-add-product-sub'].show()
    },
    async submitFormEditProductSub() {
      await setDataFirebase(`data-product/${this.dataItemParent.key}/product-sub`, this.dataFormSubEdit.key, this.dataFormSubEdit)
      this.$refs['my-modal-edit-product-sub'].hide()

    },
    addFormProductDetails(itemC, itemP){
      this.selected = itemP.key
      this.selectedDetails = itemC.key
      this.$refs['my-modal-add-product-details'].show()
    },
    async submitFormAddProductDetails(){
      await postDataFirebase(`data-product/${this.selected}/product-sub/${this.selectedDetails}/product-details/`, this.dataFormDetailsAdd)
      this.hideModal('add', 'details')
    }

  },
  watch: {
    'dataProduct': async function () {
      console.log('goi lai')
      this.options = this.dataProduct.map(item => {
        return {value: item.key, text: item.name}
      })
      for (let i = 0; i < this.dataProduct.length; i++) {
        await this.getDataProductSub(this.dataProduct[i].key)
        let temp = null
        let tempDetails = null
        if (this.dataProductSub) {
          temp = this.dataProductSub
          this.productSubAll[this.dataProduct[i].key] = {...temp}
          console.log(Object.values(temp))
          tempDetails = Object.values(temp)
          for (let j = 0; j < tempDetails.length; j++) {
            console.log(tempDetails[j]?.['product-details'])
            if(tempDetails[j]?.['product-details']){
              this.productDetailsAll[i][j] = tempDetails[i][j]?.['product-details']
            }

          }
        }
      }
      console.log('productDetailsAll', this.productDetailsAll)
      await this.getDataProductSubHandles(this.productSubAll)
      console.log('data need', this.dataProductSubHandles)
      this.dataProductSubArr =  Object.values(this.dataProductSubHandles)
    }
  }
}
</script>

<style scoped lang="scss">
*{
  color: var(--color-admin-3)
}
::v-deep .modal-content{
  font-size: 14px !important;
  background: var(--color-admin-2);
  .modal-header{
    h5{
      font-size: 16px;
      color: var(--color-admin-3);
    }
    button{
      color: var(--color-admin-3);
    }
  }
  .modal-body{
    .form-control{
      background: var(--color-admin-1) !important;
      color: var(--color-admin-3);
      border: 1px solid var(--color-admin-1);
      font-size: 12px;
    }
    .form-control:focus{
      box-shadow: 0 0 0 0.2rem var(--color-admin-2);
    }
    button{
      font-size: 12px;
    }
  }
}
.box-title{
  background: var(--color-admin-2);
  color: var(--color-admin-3);
  text-transform: uppercase;
  border-radius: 5px;
}
.btn-add-product-main{
  background: var(--color-admin-2);
  color: var(--color-admin-3);
  border: 1px solid  var(--color-admin-1);
}
table {
  width: 100%;
  border: 1px solid #ddd;;
  border-collapse: collapse;

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  tr {
    th {
      border: 1px solid #ddd;;
      padding: 10px;
      background-color: var(--color-12);
    }

    td {
      border: 1px solid #ddd;;
      padding: 10px;
    }
  }
}
.row-table-main-product.not-collapsed{
  background-color: rgba(98, 108, 19, 0.82) !important;
}
.row-table-main-product:nth-child(even) {
  background-color: var(--color-admin-2);
  border-radius: 10px;
}
::v-deep .contain-product-sub{
  background-color: var(--color-admin-4);
  border-radius: 10px;
}
.row-table-sub-product{
  margin-top: 8px !important;
  margin-bottom: 8px !important;
  border-radius: 10px;
}
.row-table-sub-product:nth-child(even) {
  background-color: var(--color-admin-2);
}
.row-table-sub-product:nth-child(odd) {
  background-color: var(--color-admin-1);
}
</style>

