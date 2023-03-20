export const state = () => ({
  dataTree: []
})

export const getters = {
  getDataTree(state){
    return state.dataTree
  }
}

export const mutations = {
  SET_DATA_TREE(state, _payload){
    state.dataTree = _payload
  }
}

export const actions = {
  setDataTree({commit}, _payload){
    commit('SET_DATA_TREE', _payload)
  }
}
