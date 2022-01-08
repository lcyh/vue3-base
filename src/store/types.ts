import { AppState } from '@/types/app'

export default interface RootStateTypes {
  appModule: AppState
}

export interface AllStateTypes extends RootStateTypes {
  AppState: AppState
}
