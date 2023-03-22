import * as request from "~/utils/BaseAxios";
import firebase from "~/plugins/firebase";

export const state = () => ({
  dataProduct: [],
  dataProductFirebase: [],
})

export const getters = {
  getDataAll(state) {
    return state.dataProduct
  },
  getDataAllFirebase(state) {
    return state.dataProductFirebase
  },
}

export const mutations = {
  SET_DATA_PRODUCT(state, _payload) {
    state.dataProduct = _payload
  },
  SET_DATA_PRODUCT_FIREBASE(state, _payload) {
    state.dataProductFirebase = _payload
  },
}

export const actions = {
  async getDataProduct({commit}) {
    try {
      const response = await request.get('data-all', {})
      commit('SET_DATA_PRODUCT', response)
    } catch (error) {
      console.log(error);
    }
  },

  async getDataProductFirebase({commit}) {
    try {
      firebase.database().ref('data-all')
        .on('value', (snapshot) => {
          commit('SET_DATA_PRODUCT_FIREBASE', snapshot.val())
        })
    } catch (error) {
      console.log(error);
    }
  }


}
