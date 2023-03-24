import firebase from "~/plugins/firebase";

export const state = () => ({
  dataProductSub: [],
})

export const getters = {
  _dataProductSub: _state => _state.dataProductSub
}

export const mutations = {
  SET_DATA_PRODUCT_SUB(state, _payload) {
    state.dataProductSub = _payload
  },
}

export const actions = {
  async getDataProductSub({commit}, id) {
    try {
      firebase.database().ref(`data-product/${id}/product-sub`)
        .on('value', (snapshot) => {
          commit('SET_DATA_PRODUCT_SUB', Object.values(snapshot.val()))
        })
    } catch (error) {
      console.log(error);
    }
  }


}
