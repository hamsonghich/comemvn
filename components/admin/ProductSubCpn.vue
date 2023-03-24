<template>
  <div class="p--2" style="border: 1px solid black">
    <h3>San pham phu</h3>

    <b-button class="my--2 text--12" variant="success" @click="openModalAddProductMain" >Thêm sản phẩm chính</b-button>

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
        <b-button class="mr--3" variant="outline-warning"
                  @click="hideModal('add', 'sub')"
        >Đóng tag
        </b-button>
        <b-button variant="outline-primary"
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





    <div>
      <table v-if="false">
        <thead>
        <tr>
          <th>
            Tên sản phẩm phụ
          </th>
          <th>
            Link sản phẩm phụ
          </th>
          <th>
            Key
          </th>
          <th>
            Tùy chọn
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in this.productSubAll">
          <td>
            {{ item.name }}
          </td>
          <td>
            {{ item.link }}
          </td>
          <td>
            {{ item.key }}
          </td>
          <td class="text-center">
            <button @click="editForm(item)" class="mx--1"><i class="fa-solid fa-pen-to-square"></i></button>
            <button @click="deleteForm(item)" class="mx--1"><i class="fa-solid fa-trash"></i></button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>


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
              <div v-for="(itemC, indexC) in Object.values(_dataProductSubHandles[itemP.key])"
                   class="row row-table-sub-product"
                   :key="indexC">
                <div class="col-3">
                  {{ itemC.name }}
                </div>
                <div class="col-3">
                  {{ itemC.link }}
                </div>
                <div class="col-3">
                  {{ itemC.key }}
                </div>
                <div class="col-3">
                  <button @click="editFormProductSub(itemC, itemP)" class="mx--1"><i class="fa-solid fa-pen-to-square"></i></button>
                  <button @click="deleteFormProductSub(itemC)" class="mx--1"><i class="fa-solid fa-trash"></i></button>
                </div>
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
      selected: null,
      options: [],
      productSubAll: {},
      productSubAllEx: [],
      dataItemParent:{}
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
    ...mapGetters('productSub', [
      '_dataProductSub'
    ]),
    ...mapGetters('productSub', [
      '_dataProductSubHandles'
    ]),
  },
  methods: {
    ...mapActions('product', [
      'getDataProduct'
    ]),
    ...mapActions('productSub', [
      'getDataProductSub',
      'getDataProductSubHandles'
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
    },
    editFormProductSub(itemC, itemP) {
      this.dataItemParent = itemP
      this.$refs['my-modal-edit-product-sub'].show()
      this.dataFormSubEdit = {...itemC}

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
      await this.getDataProduct()
    }

  },
  watch: {
    'dataProduct': async function () {
      this.options = this.dataProduct.map(item => {
        return {value: item.key, text: item.name}
      })
      for (let i = 0; i < this.dataProduct.length; i++) {
        await this.getDataProductSub(this.dataProduct[i].key)
        let temp = null
        if (this.dataProductSub) {
          temp = this.dataProductSub
          this.productSubAll[this.dataProduct[i].key] = {...temp}
        }
      }
      await this.getDataProductSubHandles(this.productSubAll)
    }
  }
}
</script>

<style scoped lang="scss">
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
  background-color: #dddddd;
}
::v-deep .contain-product-sub{
  background-color: rgba(151, 166, 83, 0.43);
  border-radius: 10px;
}
.row-table-sub-product{
  margin-top: 8px !important;
  margin-bottom: 8px !important;
  border-radius: 10px;
}
.row-table-sub-product:nth-child(even) {
  background-color: #dddddd;
}
.row-table-sub-product:nth-child(odd) {
  background-color: #dddddd;
}
</style>

