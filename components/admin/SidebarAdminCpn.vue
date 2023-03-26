<template>
    <div class="container-fluid">
      <div class="row">
        <ul>
          <li class="p--2 pr--5"
            @click="getLinkSelected(item.link)"
              v-for="item in dataSidebarFirebase">
            <i :class="item?.icon"></i>
            {{item?.name}}
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex";

export default {
  data(){
    return{
      icon: `fa-solid fa-circle-check`
    }
  },
  created() {
    this.dataSidebarFirebaseActions()
  },
  computed:{
    ...mapState('sidebarAdmin', [
      'dataSidebarFirebase'
    ]),
    ...mapGetters('sidebarAdmin', [
      'getDataSidebarFirebase'
    ])
  },
  methods:{
    ...mapActions('sidebarAdmin', [
      'dataSidebarFirebaseActions',
      'setDataSelected'
    ]),
    getLinkSelected(value){
      this.setDataSelected(value)
    }
  }
}
</script>

<style scoped lang="scss">
.container-fluid{
  width: auto;
  border: 1px solid black;
  .row{
    ul{
      li{
        border-bottom: 1px solid var(--color-admin-3);
        cursor: pointer;
        color: var(--color-admin-3);
        font-size: 12px;
        i{
          color: var(--color-admin-3);
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
