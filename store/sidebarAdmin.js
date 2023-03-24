import firebase from "~/plugins/firebase";
export const state = () => ({
  dataSelected: 'trang-chu',
  dataSidebarFirebase: []
})
export const getters = {
  getDataSidebarFirebase(state){
    return state.dataSidebarFirebase
  },
  getDataSelected(state){
    return state.dataSelected
  }
}
export const mutations = {
  SET_DATA_SIDEBAR_FIREBASE(state, _payload){
    state.dataSidebarFirebase = _payload
  },
  SET_DATA_SELECTED_FIREBASE(state, _payload){
    state.dataSelected = _payload
  }

}
export const actions = {
  async dataSidebarFirebaseActions({commit}){
    try {
      await firebase.database().ref('admin-side-bar')
        .on('value', (snapshot) => {
          commit('SET_DATA_SIDEBAR_FIREBASE', snapshot.val())
        })
    }catch (error){
      console.log(error);
    }
  },
  setDataSelected({commit}, _payload){
    commit('SET_DATA_SELECTED_FIREBASE', _payload)
  }
}
