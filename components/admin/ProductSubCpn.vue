<template>
  <div>
    <h3>San pham phu</h3>

    <b-button class="my--2 text--12" variant="success" v-b-modal.modal-1>Thêm sản phẩm phụ</b-button>

    <b-modal ref="my-modal" hide-footer id="modal-1" title="Form nhập thông tin sản phẩm phụ">
      <div class="form">
        <b-form-select
          class="mb--3"
          v-model="selected"
          :options="options"
        ></b-form-select>
        <b-form-input
          class="mb--3"
          v-model="dataFormSub.name"
          @keyup="convertNameToLink(dataFormSub.name, 'add')"
          placeholder="Nhập tên sản phẩm phụ"
        ></b-form-input>
        <b-form-input
          class="mb--3"
          disabled v-model="dataFormSub.link"
          placeholder="Nhập link sản phẩm phụ"
        ></b-form-input>
        <b-button class="mr--3" variant="outline-warning"
                  @click="hideModal('add')"
        >Đóng tag
        </b-button>
        <b-button variant="outline-primary"
                  @click="submitFormProductSub(selected)"
        >Gửi đi
        </b-button>
      </div>
    </b-modal>

    <b-modal ref="my-modal-edit" hide-footer id="modal-2" title="Form chỉnh sửa thông tin sản phẩm">
      <div class="form">
        <b-form-input
          class="mb--3"
          v-model="dataFormSubEdit.name"
          @keyup="convertNameToLink(dataFormSubEdit.name, 'edit')"
          placeholder="Nhập tên sản phẩm chính"
        ></b-form-input>
        <b-form-input
          class="mb--3"
          disabled v-model="dataFormSubEdit.link"
          placeholder="Nhập link sản phẩm chính"
        ></b-form-input>
        <b-button variant="outline-warning"
                  @click="hideModal('edit')"
        >Đóng tag
        </b-button>
        <b-button variant="outline-primary"
                  @click="submitFormEditProductMain()"
        >Gửi đi
        </b-button>
      </div>
    </b-modal>



    <div>
      <table>
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
        <tr v-for="item in dataProduct">
          <td>
            {{item.name}}
          </td>
          <td>
            {{item.link}}
          </td>
          <td>
            {{item.key}}
          </td>
          <td class="text-center">
            <button @click="editForm(item)" class="mx--1"><i class="fa-solid fa-pen-to-square"></i></button>
            <button @click="deleteForm(item)" class="mx--1"><i class="fa-solid fa-trash"></i></button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex";
import {removeVietnameseTones} from '~/utils/functions/formatMoney'
import {postDataFirebase, setDataFirebase, deleteDataFirebase} from '~/utils/functions/FirebaseFunc'

export default {
  data() {
    return {
      dataFormSub: {
        name: "",
        link: "",
      },
      dataFormSubEdit: {
        name: "",
        link: "",
        key: ""
      },
      selected: null,
      options: [],
      productSubAll: []
    }
  },
  async created() {
    await this.getDataProduct()
    console.log('getDataProduct', this.dataProduct)
    this.options = this.dataProduct.map(item => {
      return {value: item.key, text: item.name}
    })
    for (let i = 0; i <  this.dataProduct.length; i++) {
      console.log('this.dataProduct[i].key', this.dataProduct[i].key)
      await this.getDataProductSub(this.dataProduct[i].key)
      console.log(this.dataProductSub)
      this.productSubAll.push(this.dataProductSub)

    }
    this.productSubAll.flat()
    console.log('productSubAll', this.productSubAll)

  },
  computed: {
    ...mapState('product', [
      'dataProduct'
    ]),
    ...mapState('productSub', [
      'dataProductSub'
    ]),
    ...mapGetters('productSub', [
      '_dataProductSub'
    ]),
  },
  methods: {
    ...mapActions('product', [
      'getDataProduct'
    ]),
    ...mapActions('productSub', [
      'getDataProductSub'
    ]),
    convertNameToLink(name, value) {
      if(value === 'add'){
        this.dataFormSub.link = removeVietnameseTones(name).replaceAll(' ', '-').toLowerCase()
      }else if(value === 'edit'){
        this.dataFormSubEdit.link = removeVietnameseTones(name).replaceAll(' ', '-').toLowerCase()
      }

    },
    async submitFormProductSub(key) {
      await postDataFirebase(`data-product/${key}/product-sub/`, this.dataFormSub)
      this.hideModal('add')
    },
    hideModal(value) {
      if(value === 'add'){
        this.$refs['my-modal'].hide()
      }else if(value === 'edit') {
        this.$refs['my-modal-edit'].hide()
      }
    },
    editForm(item){
      this.$refs['my-modal-edit'].show()
      this.dataFormSubEdit = {...item}

    },
    submitFormEditProductMain(){
      setDataFirebase('data-product', this.dataFormSubEdit.key, this.dataFormSubEdit)
      this.$refs['my-modal-edit'].hide()
    },
    deleteForm(item){
      deleteDataFirebase('data-product',item.key)
    }
  },
  watch:{

  }
}
</script>

<style scoped lang="scss">
table{
  width: 100%;
  border: 1px solid #ddd;;
  border-collapse: collapse;
  tr:nth-child(even){background-color: #f2f2f2;}
  tr{
    th{
      border: 1px solid #ddd;;
      padding: 10px;
      background-color: var(--color-12);
    }
    td{
      border: 1px solid #ddd;;
      padding: 10px;
    }
  }
}
</style>

