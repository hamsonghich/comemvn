<template>
  <div>
    {{this.$route.params.product}}
    layout product

    <ProductsCpn />
    {{this.dataAllProductNuxt}}
  </div>
</template>

<script>
export default {
  name: "_product",
  layout: 'product',
  props:{
    dataAllProductNuxt: []
  },
  created() {
    console.log(this.dataAllProductNuxt)
  }
}
</script>

<style scoped>

</style>
