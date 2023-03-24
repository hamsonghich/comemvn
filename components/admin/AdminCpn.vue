<template>
  <div>
    <div class="container-fluid">
      <div class="">
        <div class="p--2" v-if="dataSelected === 'san-pham-chinh'">
            <ProductMainCpn />
        </div>
        <div class="p--2" v-if="dataSelected === 'san-pham-phu'">
          <ProductSubCpn />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import ProductMainCpn from '~/components/admin/ProductMainCpn.vue'
import ProductSubCpn from '~/components/admin/ProductSubCpn.vue'
export default {
 components:{
   ProductMainCpn,ProductSubCpn
 },
  computed: {
    ...mapState('sidebarAdmin', [
      'dataSelected'
    ])
  }
}
</script>
