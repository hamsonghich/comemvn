import firebase from "~/plugins/firebase";

export const state = () => ({
  dataProductDetails: [],
  dataProductDetailsHandles: {},
})

export const getters = {
  _dataProductDetails: _state => _state.dataProductDetails,
  _dataProductDetailsHandles: _state => _state.dataProductDetailsHandles,
}

export const mutations = {
  SET_DATA_PRODUCT_DETAILS(state, _payload) {
    state.dataProductDetails = _payload
  },
  SET_DATA_PRODUCT_Details_HANDLES(state, _payload) {
    state.dataProductDetailsHandles = _payload
  }
}

export const actions = {
  async getDataProductDetails({commit}, idP, idC) {
    try {
      firebase.database().ref(`data-product/${idP}/product-sub/${idC}/product-details`)
        .on('value', (snapshot) => {
          commit('SET_DATA_PRODUCT_DETAILS', snapshot.val())
        })
    } catch (error) {
      console.log(error);
    }
  },
  async getDataProductDetailsHandles({commit}, _payload){
    commit('SET_DATA_PRODUCT_Details_HANDLES', _payload)
  }

}
