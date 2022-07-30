// 用户模块

export default {
  namespaced: true,

  state () {
    return {
      // 用户信息
      profile: {
        id: '',
        avatar: '',
        nickname: 'SuperBin',
        account: '',
        mobile: '',
        token: ''
      }
    }
  },
  mutations: {
    setName (state, newName) {
      state.profile.nickname = newName
    }
  }
}
