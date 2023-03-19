<template>
  <div>
    <HeaderCpn />
    <div class="container-fluid">
      <div class="row">
        <div class="col-3">
          <SidebarVerticalCpn :dataAllProduct="this.getDataAll"/>
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
import {mapState, mapActions, mapGetters, mapMutations} from "vuex";

export default {
  components: {
    FooterHomeCpn,
    HeaderCpn,
    SidebarVerticalCpn
  },
  layout: 'product',
  created() {
    this.getDataProduct()
  },
  computed:{
    ...mapState('home', [
      'dataProduct'
    ]),
    ...mapGetters('home', [
      'getDataAll'
    ])
  },
  methods:{
    ...mapActions('home', [
      'getDataProduct'
    ])
  }
}
</script>

<style scoped lang="scss">

</style>
