<template>
  <div class="container-fluid _admin" style="background: var(--color-admin-1) !important;">
    <div class="row">
      <div style="width: 160px">
        <SidebarAdminCpn />
      </div>
       <div style="width: calc(100% - 160px)">
         <Nuxt />
       </div>
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

