<template>
  <div>
    {{this.$route.params.productSub}}
    layout product
    <ProductsSubCpn />
  </div>
</template>

<script>
import ProductsSubCpn from '~/components/ProductSubCpn.vue'
export default {
  name: "_product-sub",
  layout: 'product',
  components:{
    ProductsSubCpn
  }
}
</script>

<style scoped>

</style>
