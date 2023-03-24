<template>
  <div class="container-fluid">
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
