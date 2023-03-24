import firebase from "~/plugins/firebase";

export const state = () => ({
  dataProductSub: [],
  dataProductSubHandles: {},
})

export const getters = {
  _dataProductSub: _state => _state.dataProductSub,
  _dataProductSubHandles: _state => _state.dataProductSubHandles,
}

export const mutations = {
  SET_DATA_PRODUCT_SUB(state, _payload) {
    state.dataProductSub = _payload
  },
  SET_DATA_PRODUCT_SUB_HANDLES(state, _payload) {
    console.log('_payload', _payload)
    state.dataProductSubHandles = _payload
  }
}

export const actions = {
  async getDataProductSub({commit}, id) {
    try {
      firebase.database().ref(`data-product/${id}/product-sub`)
        .on('value', (snapshot) => {
          console.log('value22', snapshot.val())
          commit('SET_DATA_PRODUCT_SUB', snapshot.val())
        })
    } catch (error) {
      console.log(error);
    }
  },
  async getDataProductSubHandles({commit}, _payload){
    commit('SET_DATA_PRODUCT_SUB_HANDLES', _payload)
  }

}
