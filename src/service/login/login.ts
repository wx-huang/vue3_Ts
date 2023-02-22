import wxRequest from '../index'
import { IAccount, ILoginResult } from './type'
import { IDataType } from '../type'

enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/',
  UserMenu = '/role/'
}

export function accountLoginRequest(account: IAccount) {
  return wxRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

export function requestUserInfoById(id: number) {
  return wxRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id,
    showLoading: false
  })
}

export function requestUserMenus(id: number) {
  return wxRequest.get<IDataType>({
    url: LoginAPI.UserMenu + id + '/menu',
    showLoading: false
  })
}
