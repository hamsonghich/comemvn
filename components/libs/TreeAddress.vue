<template>
    <div class="wrapper-tree pt--4">
      <i class="fa-solid fa-house mr--2"></i>
      <nuxt-link v-for="(item, index) in dataTree" :to="'/'+item.link">
       <span v-if="index !== 0">/</span> {{item.name}}
      </nuxt-link>
    </div>
</template>

<script>
export default {
  props:{
    dataTree:{
      type: Array,
      required: true
    }
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
