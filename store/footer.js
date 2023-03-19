import * as request from "@/utils/BaseAxios";

export const state = () => ({
  dataFooter: []
})
export const getters = {
  getDataFooter(state){
    return state.dataFooter
  }
}
export const mutations = {
  SET_DATA_FOOTER(state, _payload){
    state.dataFooter = _payload
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

  }
}
