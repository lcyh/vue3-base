import CountState from './modules/countStore/types'
import AppState from './modules/appStore/types'
import DataBoardState from './modules/databoardStore/types'

export default interface RootStateTypes {
  appModule: AppState
  countModule: CountState
  databoardModule: DataBoardState
}

export interface AllStateTypes extends RootStateTypes {
  AppState: AppState
  CountState: CountState
  databoardState: DataBoardState
}
