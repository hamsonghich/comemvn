<template>
  <div>
    <HeaderCpn />
    <div class="container-fluid">
      <div class="row">
        <nuxt/>
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
  layout: 'product-details',
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
