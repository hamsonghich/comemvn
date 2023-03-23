<template>
    <div>
     firebase
    </div>
</template>

<script>
import * as firebaseApi from "~/utils/FirebaseApi";
import {mapActions, mapGetters} from "vuex";
export default {
  data(){
    return{
      link: this.$route.name
    }
  },
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
  },
  watch:{
    'link': function (){
      this.$route.name = 'firbase'
    }
  }
}
</script>
