<template>
  <div class="container-fluid">
    <div class="row d-flex">
        <SidebarAdminCpn />
        <Nuxt />
    </div>
  </div>
</template>

<script>
import SidebarAdminCpn from '~/components/admin/SidebarAdminCpn.vue'
export default {
  layout: 'admin',
  components:{
    SidebarAdminCpn
  }
}
</script>
