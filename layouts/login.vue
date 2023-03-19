<template>
  <div>
    <nuxt/>
    <FooterCpn />
  </div>
</template>

<script>
import FooterCpn from '../components/FooterCpn'

export default {
  components: {
    FooterCpn
  },
  layout: 'login'
}
</script>

<style scoped lang="scss">

</style>
