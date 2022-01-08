/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * @Author: changluo
 * @Description:
 */
const handleGetCurrentMenuItem = (menus: any[], id: number) => {
  let currentItem = {}
  const curFn = (menuList: any[], menuId: number) => {
    menuList.forEach((m: any) => {
      if (m.children && m.children.length) {
        curFn(m.children, menuId)
      }
      if (Number(m.id) === menuId) {
        currentItem = m
      }
    })
  }
  curFn(menus, id)
  return currentItem
}
export {
  // eslint-disable-next-line import/prefer-default-export
  handleGetCurrentMenuItem
}

export const isValidUsername = (str: string) => ['admin', 'editor'].indexOf(str.trim()) >= 0
