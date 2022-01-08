/* eslint-disable @typescript-eslint/no-explicit-any */
import Http from '../http'

function loginRequest (params = {}):Promise<any> {
  return Http.create({
    method: 'get',
    url: '/mock/login.json',
    params
  })
}
// 获取当前用户信息
function getUserInfo (params = {}):Promise<any> {
  return Http.create({
    method: 'get',
    url: '/mock/user.json',
    params
  })
}
// 获取当前用户导航权限
function getUserPermission (params = {}):Promise<any> {
  return Http.create({
    method: 'get',
    url: '/mock/permission.json',
    data: params
  })
}

export default {
  loginRequest,
  getUserInfo,
  getUserPermission
}
