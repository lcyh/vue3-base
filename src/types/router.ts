/* eslint-disable @typescript-eslint/no-explicit-any */
interface MenuMeta {
  title: string
  icon: string
  reportUrl?: string
}

export interface MenuState {
  path: string
  name: string
  meta: MenuMeta
  children: MenuState[]
  [key:string]:any
}
export interface MenuRouter extends MenuMeta {
  path: string
  name: string
  children?: MenuRouter[]
}
