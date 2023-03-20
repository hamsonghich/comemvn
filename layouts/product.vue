<template>
  <div>
    <HeaderCpn />
    <div class="container-fluid d-flex justify-content-center" style="flex-direction: column; align-items: center">
      <div class="row w-100">
        <TreeAddress class="px--3" data-tree=""/>
      </div>
      <div class="row w-100">
        <div class="col-lg-3 col-xl-3 col-md-3 col-sm-3 d-none d-sm-block d-md-block d-lg-block d-xl-block">
          <SidebarVerticalCpn :dataAllProduct="this.getDataAll"/>
        </div>
        <div class="col-sm-9 col-lg-9 col-xl-9 col-md-9 col-12">
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
import TreeAddress from '../components/libs/TreeAddress'
import {mapState, mapActions, mapGetters, mapMutations} from "vuex";

export default {
  components: {
    FooterHomeCpn,
    HeaderCpn,
    SidebarVerticalCpn,
    TreeAddress
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
  .row{
    max-width: 1230px;
  }
</style>
