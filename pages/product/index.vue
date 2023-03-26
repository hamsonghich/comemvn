<template>
  <div>
    {{this.$route.params.product}}
    layout product2
    <ProductsAllCpn />

  </div>
</template>

<script>
import ProductsAllCpn from '~/components/ProductsAllCpn.vue'
export default {
  name: "index",
  layout: 'product',
  components:{
    ProductsAllCpn
  }
}
</script>

<style scoped>

</style>
