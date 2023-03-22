<template>
    <div class="wrapper-tree pt--4">
      <i class="fa-solid fa-house mr--2"></i>
      <nuxt-link v-for="(item, index) in dataTree" :to="'/'+item.link">
       <span v-if="index !== 0">/</span> {{item.name}}
      </nuxt-link>
      <br />
    </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex";

export default {
   created() {
    console.log('tree data component')
    console.log('tree info', this.dataTree)
  },
  computed:{
    ...mapState('tree', [
      'dataTree'
    ]),
    ...mapGetters('tree', [
      'getDataTree'
    ])
  }
}

</script>

<style scoped lang="scss">
.wrapper-tree{
  i{
    color: var(--color-primary);
  }
  a{
    text-decoration: none;
    color: var(--color-primary);
  }
}
</style>
