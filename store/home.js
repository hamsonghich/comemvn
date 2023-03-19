import * as request from "~/utils/BaseAxios";
import axios from 'axios'
export const state = () => ({
  dataProduct: []
})

export const getters = {
  getDataAll(state){
    return state.dataProduct
  }
}

export const mutations = {
  SET_DATA_PRODUCT(state, _payload){
   state.dataProduct = _payload
  }
}

export const actions = {
 async getDataProduct({commit}){
    try {
      const response = await request.get('data-all', {})
      commit('SET_DATA_PRODUCT', response)
    }catch (error){
      console.log(error);
    }
  }
}
