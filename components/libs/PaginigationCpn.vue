<template>
    <div>
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        last-number
        :class="'pagination-product-all d-flex justify-content-center align-items-center'"
      ></b-pagination>
    </div>
</template>

<script>
import * as CONSTANTS from "~/utils/Constants";

export default {
  props:{
    perPage: {
      type: Number,
      required: true
    },
    rows:{
      type: Number,
      required: true
    },
    currentPage:{
      type: Number,
      required: true
    }
  },
  data(){
    return {

    }
  },
  watch:{
    'currentPage': function (){
      this.$emit('currentEmit', this.currentPage)
    }
  }
}

</script>

<style scoped lang="scss">
::v-deep .pagination-product-all {
  li {
    margin-right: 0.25rem !important;
    margin-left: 0.25rem !important;
  }

  .page-item.disabled .page-link {
    border-radius: 50% !important;
  }

  .page-link {
    padding: 0.5rem 0.85rem !important;
    border-radius: 50% !important;
  }
  .page-item.active .page-link {
    background-color: var(--color-primary);
    border-color: var(--color-primary);
    box-shadow: 0 0 0 0.2rem rgba(98, 108, 19, 0.20);
  }
}
</style>
