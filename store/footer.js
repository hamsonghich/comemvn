import * as request from "@/utils/BaseAxios";
import firebase from "~/plugins/firebase";
export const state = () => ({
  dataFooter: [],
  dataFooterFirebase: []
})
export const getters = {
  getDataFooter(state){
    return state.dataFooter
  },
  getDataFooterFirebase(state){
    return state.dataFooterFirebase
  }
}
export const mutations = {
  SET_DATA_FOOTER(state, _payload){
    state.dataFooter = _payload
  },
  SET_DATA_FOOTER_FIREBASE(state, _payload){
    state.dataFooterFirebase = _payload
  }

}
export const actions = {
  async dataFooterActions({commit}){
    try {
      const response = await request.get('data-footer', {})
      commit('SET_DATA_FOOTER', response)
    }catch (error){
      console.log(error);
    }
  },
  async dataFooterFirebaseActions({commit}){
    try {
      await firebase.database().ref('data-footer')
        .on('value', (snapshot) => {
          commit('SET_DATA_FOOTER_FIREBASE', snapshot.val())
        })
    }catch (error){
      console.log(error);
    }
  }
}
