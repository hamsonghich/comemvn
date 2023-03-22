<template>
    <div>
{{ getDataAllFirebase}}
    </div>
</template>

<script>
import * as firebaseApi from "~/utils/FirebaseApi";
import {mapActions, mapGetters} from "vuex";
export default {
  async mounted() {

  },
  created() {
    this.getDataProductFirebase()
  },
  computed:{
    ...mapGetters('home', [
      'getDataAllFirebase'
    ])
  },
  methods:{
    ...mapActions('home', [
      'getDataProductFirebase'
    ])
  }
}
</script>
