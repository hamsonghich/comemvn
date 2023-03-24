<template>
  <div>
    <h3>San pham chinh</h3>

    <b-button class="my--2 text--12" variant="success" v-b-modal.modal-1>Thêm sản phẩm chính</b-button>

    <b-modal ref="my-modal" hide-footer id="modal-1" title="Form nhập thông tin sản phẩm">
      <div class="form">
        <b-form-input
          class="mb--3"
          v-model="dataFormMain.name"
          @keyup="convertNameToLink(dataFormMain.name, 'add')"
          placeholder="Nhập tên sản phẩm chính"
        ></b-form-input>
        <b-form-input
          class="mb--3"
          disabled v-model="dataFormMain.link"
          placeholder="Nhập link sản phẩm chính"
        ></b-form-input>
        <b-button class="mr--3" variant="outline-warning"
                  @click="hideModal('add')"
        >Đóng tag
        </b-button>
        <b-button variant="outline-primary"
                  @click="submitFormProductMain()"
        >Gửi đi
        </b-button>
      </div>
    </b-modal>

    <b-modal ref="my-modal-edit" hide-footer id="modal-2" title="Form chỉnh sửa thông tin sản phẩm">
      <div class="form">
        <b-form-input
          class="mb--3"
          v-model="dataFormMainEdit.name"
          @keyup="convertNameToLink(dataFormMainEdit.name, 'edit')"
          placeholder="Nhập tên sản phẩm chính"
        ></b-form-input>
        <b-form-input
          class="mb--3"
          disabled v-model="dataFormMainEdit.link"
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
            Tên sản phẩm chính
          </th>
          <th>
            Link sản phẩm chính
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
      dataFormMain: {
        name: "",
        link: "",
      },
      dataFormMainEdit: {
        name: "",
        link: "",
        key: ""
      },
    }
  },
  created() {
    this.getDataProduct()
    console.log('getDataProduct', this.dataProduct)
  },
  computed: {
    ...mapState('product', [
      'dataProduct'
    ]),
    ...mapGetters('product', [
      '_dataProduct'
    ]),
  },
  methods: {
    ...mapActions('product', [
      'getDataProduct'
    ]),
    convertNameToLink(name, value) {
      if(value === 'add'){
        this.dataFormMain.link = removeVietnameseTones(name).replaceAll(' ', '-').toLowerCase()
      }else if(value === 'edit'){
        this.dataFormMainEdit.link = removeVietnameseTones(name).replaceAll(' ', '-').toLowerCase()
      }

    },
    async submitFormProductMain() {
      await postDataFirebase('data-product', this.dataFormMain)
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
      this.dataFormMainEdit = {...item}

    },
    submitFormEditProductMain(){
      setDataFirebase('data-product', this.dataFormMainEdit.key, this.dataFormMainEdit)
      this.$refs['my-modal-edit'].hide()
    },
    deleteForm(item){
      deleteDataFirebase('data-product',item.key)
    }
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

