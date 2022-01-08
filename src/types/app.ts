import { UserInfo } from './user'
import { MenuState } from './router'
/* eslint-disable */

export interface PermissionItemMenuProp {
  havePermission: number;
  menuId: number;
  name: string;
  parentId: number;
  reportUrl: string;
  type: number;
  url: string;
  [key: string]: any;
}
export interface AppState {
  userInfo: UserInfo;
  collapsed: boolean;
  showNavSide: boolean | undefined;
  showGameSelect: boolean;
  menuMap: Map<string, []>;
  menuList: MenuData[];
  activedMenu: string;
  activedSubmenu: string;
  addRouters: MenuState[];
  hasAddRoute: boolean;
  permissionMenuList: PermissionItemMenuProp[];
  permission: {
    dynamicRoutes: any[]
  };
  browserInfo:{
    browser:string;
    browserVersion:string;
  }
}

// 接口返回数据格式
export interface ResponseData<T> {
  code: number;
  data: T;
  message: string;
};

// 用户权限返回数据格式
export interface PermissionData {
  havePermission: number;
  menuId: number;
  name: string;
  parentId: number;
  reportUrl: string;
  type: number;
  url: string;
  componentName:string;
}

// 一级导航数据格式
export interface MenuData {
  id: number;
  name: string;
  title: string;
  [key:string]:any
}

// 二三级导航
export interface ChildMenuData extends MenuData{
  icon:string;
  reportUrl:string
  children:ChildMenuData[]
  [key:string]:any
}
