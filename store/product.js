import firebase from "~/plugins/firebase";

export const state = () => ({
  dataProduct: [],
})

export const getters = {
  _dataProduct: _state => _state.dataProduct
}

export const mutations = {
  SET_DATA_PRODUCT(state, _payload) {
    state.dataProduct = _payload
  },
}

export const actions = {
  async getDataProduct({commit}) {
    try {
      firebase.database().ref('data-product')
        .on('value', (snapshot) => {
          commit('SET_DATA_PRODUCT', Object.values(snapshot.val()))
        })
    } catch (error) {
      console.log(error);
    }
  }


}
