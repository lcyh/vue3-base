import { createStore } from 'vuex'
import RootStateTypes from './types'
import appModule from './modules/appStore'

const store = createStore<RootStateTypes>({
  modules: {
    appModule
  }
})
export default store
