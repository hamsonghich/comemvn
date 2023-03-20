<template>
    <div>
      <i class="fa-solid fa-house"></i>
      <nuxt-link v-for="item in dataTree1" :to="item.link">
        {{item.name}} /
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
  },
  data(){
    return{
      dataTree1: [
        {name: 'Trang chu', link: 'trang-chu'}
      ]
    }
  }
}

</script>
