import wxRequest from '../../index'
import { IDataType } from '@/service/type'

export function requestUserList(url: string, queryInfo: any) {
  return wxRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}
