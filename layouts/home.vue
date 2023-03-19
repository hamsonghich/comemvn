<template>
  <div>
    <HeaderCpn />
    <div class="container-fluid">
      <div class="row">
        <div class="col-3">

        </div>
        <div class="col-9">
          <nuxt/>
        </div>
      </div>
    </div>

    <FooterHomeCpn />
  </div>
</template>

<script>
import FooterHomeCpn from '../components/FooterHomeCpn'
import HeaderCpn from '../components/HeaderCpn'
import SidebarVerticalCpn from '../components/SidebarVerticalCpn'

export default {
  components: {
    FooterHomeCpn,
    HeaderCpn,
    SidebarVerticalCpn
  },
  layout: 'home'
}
</script>

<style scoped lang="scss">

</style>
