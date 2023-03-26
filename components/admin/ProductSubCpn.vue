<template>
  <div class="p--2">
    <div class="box-title p--3 font--semibold">San pham phu</div>

    <b-button class="my--2 text--12 btn-add-product-main" @click="openModalAddProductMain">Thêm sản phẩm chính
    </b-button>

    <!--    modal form add product SUB-->
    <b-modal ref="my-modal-add-product-sub" hide-footer title="Form nhập thông tin sản phẩm phụ">
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
    <b-modal ref="my-modal-edit-product-sub" hide-footer  title="Form chỉnh sửa thông tin sản phẩm">
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
    <b-modal ref="my-modal-add-product-main" hide-footer title="Form thêm thông tin sản phẩm chính">
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
    <b-modal ref="my-modal-edit-product-main" hide-footer  title="Form chỉnh sửa thông tin sản phẩm">
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
    <b-modal ref="my-modal-add-product-details" hide-footer  title="Form thêm thông tin sản phẩm chi tiết">
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
        <div class="d-flex" style="gap: 0.5rem">
          <b-form-input
            class="mb--3"
            v-model="dataFormDetailsAdd['sub-title-default']"
            placeholder="Nhập chức năng tiêu đề"
          ></b-form-input>
          <b-form-input
            class="mb--3"
            type="number"
            v-model="dataFormDetailsAdd.rate"
            placeholder="Nhập số đánh giá"
          ></b-form-input>
          <b-form-input
            class="mb--3"
            type="number"
            v-model="dataFormDetailsAdd.star"
            placeholder="Nhập số sao"
          ></b-form-input>
          <b-form-input
            class="mb--3"
            type="number"
            v-model="dataFormDetailsAdd['price-old']"
            placeholder="Nhập giá tiền gốc"
          ></b-form-input>
          <b-form-input
            class="mb--3"
            type="number"
            v-model="dataFormDetailsAdd.discount"
            placeholder="Nhập số giảm giá"
          ></b-form-input>
        </div>
        <div class="d-flex" style="gap: 0.5rem">
          <b-form-input
            class="mb--3"
            v-model="dataFormDetailsAdd['tag-description']"
            placeholder="Nhập tag mô tả (phân biệt bằng || `New || Best seller` )"
          ></b-form-input>

        </div>

        <i class="text-12 font--semibold">Danh sách ảnh sản phẩm</i>
        <VueEditor class="text--12 mb--4" placeholder="Danh sách ảnh sản phẩm"
                   v-model="dataFormDetailsAdd.listImg"
        />

        <i class="text-12 font--semibold">Danh sách mô tả tóm tắt sản phẩm</i>
        <VueEditor class="text--12 mb--4" placeholder="Danh sách mô tả tóm tắt sản phẩm"
                   v-model="dataFormDetailsAdd.content"/>

        <i class="text-12 font--semibold">Danh sách ưu đãi sản phẩm</i>
        <VueEditor class="text--12 mb--4" placeholder="Danh sách ưu đãi sản phẩm"
                   v-model="dataFormDetailsAdd.promotion"/>

        <i class="text-12 font--semibold">Thông tin chi tiết sản phẩm</i>
        <VueEditor class="text--12 mb--4" placeholder="Thông tin chi tiết sản phẩm"
                   v-model="dataFormDetailsAdd.infoDetails"/>

        <div class="mt--2">
          <b-button variant="outline-warning"
                    @click="hideModal('add', 'details')"
          >Đóng tag
          </b-button>
          <b-button variant="outline-primary"
                    @click="submitFormAddProductDetails()"
          >Gửi đi
          </b-button>
        </div>
      </div>
    </b-modal>

    <!--    modal form edit product details-->
    <b-modal ref="my-modal-edit-product-details" hide-footer
             title="Form chỉnh sửa thông tin sản phẩm chi tiết">
      <div class="form">
        <b-form-input
          class="mb--3"
          v-model="dataFormDetailsEdit.name"
          @keyup="convertNameToLink(dataFormDetailsEdit.name, 'edit', 'details')"
          @keyup.enter="submitFormAddProductDetails"
          placeholder="Nhập tên sản phẩm chi tiết"
        ></b-form-input>
        <b-form-input
          class="mb--3"
          disabled v-model="dataFormDetailsEdit.link"
          placeholder="Nhập link sản phẩm chi tiết"
        ></b-form-input>
        <div class="d-flex" style="gap: 0.5rem">
          <b-form-input
            class="mb--3"
            v-model="dataFormDetailsEdit['sub-title-default']"
            placeholder="Nhập chức năng tiêu đề"
          ></b-form-input>
          <b-form-input
            class="mb--3"
            type="number"
            v-model="dataFormDetailsEdit.rate"
            placeholder="Nhập số đánh giá"
          ></b-form-input>
          <b-form-input
            class="mb--3"
            type="number"
            v-model="dataFormDetailsEdit.star"
            placeholder="Nhập số sao"
          ></b-form-input>
          <b-form-input
            class="mb--3"
            type="number"
            v-model="dataFormDetailsEdit['price-old']"
            placeholder="Nhập giá tiền gốc"
          ></b-form-input>
          <b-form-input
            class="mb--3"
            type="number"
            v-model="dataFormDetailsEdit.discount"
            placeholder="Nhập số giảm giá"
          ></b-form-input>
        </div>
        <div class="d-flex" style="gap: 0.5rem">
          <b-form-input
            class="mb--3"
            v-model="dataFormDetailsEdit['tag-description']"
            placeholder="Nhập tag mô tả (phân biệt bằng || `New || Best seller` )"
          ></b-form-input>

        </div>

        <i class="text-12 font--semibold">Danh sách ảnh sản phẩm</i>
        <VueEditor class="text--12 mb--4" placeholder="Danh sách mô tả tóm tắt sản phẩm"
                   v-model="dataFormDetailsEdit.listImg"/>

        <i class="text-12 font--semibold">Danh sách mô tả tóm tắt sản phẩm</i>
        <VueEditor class="text--12 mb--4" placeholder="Danh sách mô tả tóm tắt sản phẩm"
                   v-model="dataFormDetailsEdit.content"/>

        <i class="text-12 font--semibold">Danh sách ưu đãi sản phẩm</i>
        <VueEditor class="text--12 mb--4" placeholder="Danh sách ưu đãi sản phẩm"
                   v-model="dataFormDetailsEdit.promotion"/>

        <i class="text-12 font--semibold">Thông tin chi tiết sản phẩm</i>
        <VueEditor class="text--12 mb--4" placeholder="Thông tin chi tiết sản phẩm"
                   v-model="dataFormDetailsEdit.infoDetails"/>
        <div class="mt--2">
          <b-button variant="outline-warning"
                    @click="hideModal('edit', 'details')"
          >Đóng tag
          </b-button>
          <b-button variant="outline-primary"
                    @click="submitFormEditProductDetails()"
          >Gửi đi
          </b-button>
        </div>

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
      <div v-for="(itemP, indexP) in dataProduct" class="row row-table-main-product"
           :key="indexP">
        <div v-b-toggle="'collapse-' + indexP" class="col-3 font--medium line-one">
          {{ itemP.name }}
        </div>
        <div v-b-toggle="'collapse-' + indexP" class="col-3 font--medium line-one">
          {{ itemP.link }}
        </div>
        <div v-b-toggle="'collapse-' + indexP" class="col-3 font--medium line-one">
          {{ itemP.key }}
        </div>
        <div class="col-3 font--medium">
          <button v-b-tooltip.hover title="Thêm sản phẩm phụ" @click="addFormProductSub(itemP)" class="mx--2"><i
            class="fa-solid fa-circle-plus"></i></button>
          <button v-b-tooltip.hover title="Chỉnh sửa sản phẩm chính" @click="editFormProductMain(itemP)" class="mx--2">
            <i class="fa-solid fa-pen-to-square"></i></button>
          <button v-b-tooltip.hover title="Xóa sản phẩm chính" @click="deleteFormProductMain(itemP)" class="mx--2"><i
            class="fa-solid fa-trash"></i></button>
        </div>


        <b-collapse class=" w-100 mt-2" :id="`collapse-`+indexP">
          <b-card class="contain-product-sub w-100">
            <div v-if="_dataProductSubHandles[itemP.key]">
              <div v-if="dataProductSubArr[indexP]">

                <div v-for="(itemC, indexC) in Object.values(dataProductSubArr[indexP])"
                     class="row row-table-sub-product"
                     :key="indexC">
                  <div v-b-toggle="'collapse-child' + indexC" class="col-3 line-one">
                    {{ itemC.name }}
                  </div>
                  <div v-b-toggle="'collapse-child' + indexC" class="col-3 line-one">
                    {{ itemC.link }}
                  </div>
                  <div v-b-toggle="'collapse-child' + indexC" class="col-3 line-one">
                    {{ itemC.key }}
                  </div>
                  <div class="col-3">
                    <button v-b-tooltip.hover title="Thêm sản phẩm chi tiết"
                            @click="addFormProductDetails(itemC, itemP)" class="mx--2"><i
                      class="fa-solid fa-circle-plus"></i></button>
                    <button v-b-tooltip.hover title="Chỉnh sửa sản phẩm phụ" @click="editFormProductSub(itemC, itemP)"
                            class="mx--2"><i
                      class="fa-solid fa-pen-to-square"></i></button>
                    <button v-b-tooltip.hover title="Xóa sản phẩm phụ" @click="deleteFormProductSub(itemC, itemP)"
                            class="mx--2"><i class="fa-solid fa-trash"></i>
                    </button>
                  </div>

                  <b-collapse class=" w-100 mt-2" :id="`collapse-child`+indexC">
                    <b-card class="contain-product-sub w-100">
                      <div v-if="dataProductDetailsHandles?.[indexP]">
                        <div v-if="dataProductDetailsHandles?.[indexP]?.[indexC]">

                          <div v-for="(itemD, indexD) in Object.values( dataProductDetailsHandles[indexP][indexC])"
                               class="row row-table-details-product"
                               :key="indexD">
                            <div v-b-toggle="'collapse-details' + indexD" class="col-3 font--medium line-one">
                              {{ itemD.name }}
                            </div>
                            <div v-b-toggle="'collapse-details' + indexD" class="col-3 font--medium line-one">
                              {{ itemD.link }}
                            </div>
                            <div v-b-toggle="'collapse-details' + indexD" class="col-3 font--medium line-one">
                              {{ itemD.key }}
                            </div>
                            <div class="col-3 font--medium">
                              <button v-b-tooltip.hover title="Chỉnh sửa sản phẩm chi tiết"
                                      @click="editFormProductDetails(itemC, itemP, itemD)" class="mx--1"><i
                                class="fa-solid fa-pen-to-square"></i></button>
                              <button v-b-tooltip.hover title="Xóa sản phẩm chi tiết"
                                      @click="deleteFormProductDetails(itemC, itemP, itemD)" class="mx--1"><i
                                class="fa-solid fa-trash"></i></button>
                            </div>
                          </div>

                        </div>

                      </div>

                    </b-card>
                  </b-collapse>

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
import {removeVietnameseTones, convertLinkUtils, convertImgFB} from '~/utils/functions/formatMoney'
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
      dataFormMainAdd: {
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
        "sub-title-default": "",
        "tag-description": "",
        star: "",
        rate: "",
        "price-old": "",
        content: "",
        promotion: "",
        listImg: [],
        infoDetails: ""
      },
      dataFormDetailsEdit: {
        name: "",
        link: "",
        key: "",
        "sub-title-default": "",
        "tag-description": "",
        star: "",
        rate: "",
        "price-old": "",
        content: "",
        promotion: "",
        listImg: [],
        infoDetails: ""
      },
      selected: null,
      selectedDetails: null,
      options: [],
      productSubAll: {},
      productSubAllEx: [],
      dataItemParent: {},
      dataProductSubArr: [],
      productDetailsAll: [[]]
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
      } else if (value === 'add' && option === 'main') {
        this.dataFormMainAdd.link = convertLinkUtils(name)
      } else if (value === 'add' && option === 'details') {
        this.dataFormDetailsAdd.link = convertLinkUtils(name)
      } else if (value === 'edit' && option === 'details') {
        this.dataFormDetailsEdit.link = convertLinkUtils(name)
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
      } else if (value === 'edit' && option === 'sub') {
        this.$refs['my-modal-edit-product-sub'].hide()
        this.dataFormSubEdit = {
          name: "",
          link: "",
          key: ""
        }
      } else if (value === 'add' && option === 'main') {
        this.$refs['my-modal-add-product-main'].hide()
        this.dataFormSubEdit = {
          name: "",
          link: "",
          key: ""
        }
      } else if (value === 'edit' && option === 'main') {
        this.$refs['my-modal-edit-product-main'].hide()
        this.dataFormSubEdit = {
          name: "",
          link: "",
          key: ""
        }
      } else if (value === 'add' && option === 'details') {
        this.$refs['my-modal-add-product-details'].hide()
        this.dataFormDetailsAdd = {
          name: "",
          link: "",
        }
      } else if (value === 'edit' && option === 'details') {
        this.$refs['my-modal-edit-product-details'].hide()
        this.dataFormDetailsEdit = {
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
    deleteFormProductSub(itemC, itemP) {
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
    editFormProductMain(item) {
      this.$refs['my-modal-edit-product-main'].show()
      this.dataFormMainEdit = {...item}
    },
    async deleteFormProductMain(item) {
      await deleteDataFirebase('data-product', item.key)
    },
    openModalAddProductMain() {
      this.$refs['my-modal-add-product-main'].show()
    },
    addFormProductSub(itemP) {
      this.selected = itemP.key
      this.$refs['my-modal-add-product-sub'].show()
    },
    async submitFormEditProductSub() {
      await setDataFirebase(`data-product/${this.dataItemParent.key}/product-sub`, this.dataFormSubEdit.key, this.dataFormSubEdit)
      this.$refs['my-modal-edit-product-sub'].hide()

    },
    addFormProductDetails(itemC, itemP) {
      this.selected = itemP.key
      this.selectedDetails = itemC.key
      this.$refs['my-modal-add-product-details'].show()
    },
    async submitFormAddProductDetails() {

      await postDataFirebase(`data-product/${this.selected}/product-sub/${this.selectedDetails}/product-details/`, {...this.dataFormDetailsAdd})
      this.hideModal('add', 'details')
    },
    editFormProductDetails(itemC, itemP, itemD) {
      this.selected = itemP.key
      this.selectedDetails = itemC.key
      this.$refs['my-modal-edit-product-details'].show()
      this.dataFormDetailsEdit = {...itemD}
    },
    async submitFormEditProductDetails() {
      await setDataFirebase(`data-product/${this.selected}/product-sub/${this.selectedDetails}/product-details/`, this.dataFormDetailsEdit.key, {...this.dataFormDetailsEdit});
      this.hideModal('edit', 'details')
    },
    async deleteFormProductDetails(itemC, itemP, itemD) {
      await deleteDataFirebase(`data-product/${itemP.key}/product-sub/${itemC.key}/product-details/`, itemD.key)
      this.hideModal('edit', 'details')
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
        let tempDetails = null
        if (this.dataProductSub) {
          temp = this.dataProductSub
          this.productSubAll[this.dataProduct[i].key] = {...temp}
          tempDetails = Object.values(temp)
          for (let j = 0; j < tempDetails.length; j++) {
            if (tempDetails[j]?.['product-details']) {
              this.productDetailsAll[i][j] = tempDetails[j]?.['product-details']
            }

          }
        }
      }
      await this.getDataProductSubHandles(this.productSubAll)
      await this.getDataProductDetailsHandles(this.productDetailsAll)
      this.dataProductSubArr = Object.values(this.dataProductSubHandles)
    }
  }
}
</script>

<style scoped lang="scss">
* {
  color: var(--color-admin-3) !important
}


@media only screen and (max-width: 920px) {
  ::v-deep .modal-dialog {
    max-width: 70vw !important;
  }
}

@media only screen and (min-width: 920px) {
  ::v-deep .modal-dialog {
    max-width: 50vw !important;
  }
}


::v-deep .modal-content {
  font-size: 14px !important;
  background: var(--color-admin-2);

  .modal-header {
    h5 {
      font-size: 16px;
      color: var(--color-admin-3);
    }

    button {
      color: var(--color-admin-3);
    }
  }

  .modal-body {
    .form-control {
      background: var(--color-admin-1) !important;
      color: var(--color-admin-3);
      border: 1px solid var(--color-admin-1);
      font-size: 12px;
    }

    .form-control:focus {
      box-shadow: 0 0 0 0.2rem var(--color-admin-2);
    }

    button {
      font-size: 12px;
    }
  }
}

.box-title {
  background: var(--color-admin-2);
  color: var(--color-admin-3);
  text-transform: uppercase;
  border-radius: 5px;
}

.btn-add-product-main {
  background: var(--color-admin-2);
  color: var(--color-admin-3);
  border: 1px solid var(--color-admin-1);
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

.row-table-main-product.not-collapsed {
  background-color: rgba(98, 108, 19, 0.82) !important;
}

.row-table-main-product:nth-child(even) {
  background-color: var(--color-admin-2);
  border-radius: 10px;
}

::v-deep .contain-product-sub {
  background-color: var(--color-admin-4);
  border-radius: 10px;
}

.row-table-sub-product {
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

.row-table-details-product {
  margin-top: 8px !important;
  margin-bottom: 8px !important;
  border-radius: 10px;
}

.row-table-details-product:nth-child(even) {
  background-color: var(--color-admin-2);
}

.row-table-details-product:nth-child(odd) {
  background-color: var(--color-admin-1);
}
</style>

