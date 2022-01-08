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
}
export interface MenuRouter extends MenuMeta {
  path: string
  name: string
  children?: MenuRouter[]
}
