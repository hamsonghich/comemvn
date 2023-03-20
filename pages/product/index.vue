<template>
  <div>
    {{this.$route.params.product}}
    layout product
    <ProductsCpn />

  </div>
</template>

<script>
export default {
  name: "index",
  layout: 'product'
}
</script>

<style scoped>

</style>
