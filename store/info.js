import firebase from "~/plugins/firebase";
export const state = () => ({
  dataFeeFirebase: []
})
export const getters = {
  getDataFeeFirebase(state){
    return state.dataFeeFirebase
  }
}
export const mutations = {
  SET_DATA_FEE_FIREBASE(state, _payload){
    state.dataFeeFirebase = _payload
  }

}
export const actions = {
  async dataFeeFirebaseActions({commit}){
    try {
      await firebase.database().ref('data-ship')
        .on('value', (snapshot) => {
          commit('SET_DATA_FEE_FIREBASE', snapshot.val())
        })
    }catch (error){
      console.log(error);
    }
  }
}
