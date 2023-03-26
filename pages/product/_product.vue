<template>
  <div>
    {{this.$route.params.product}}
    layout product 1
    <ProductsCpn />
  </div>
</template>

<script>
export default {
  name: "_product",
  layout: 'product'
}
</script>

<style scoped>

</style>
