import base from './index'
let axios = base.axios
let baseUrl = base.baseUrl

export const getFriend = params => {
    return axios({
      method: 'post',
      baseURL: `${baseUrl}/friend/friendList`,
      data: params
    }).then(res => res.data)
  }

export const getChatMsg = params => {
  return axios({
    method: 'post',
    baseURL: `${baseUrl}/friend/chatMsg`,
    data: params
  }).then(res => res.data)
}

export const getGroupList = params => {
  return axios({
    method: 'post',
    baseURL: `${baseUrl}/group/groupList`,
    data: params
  }).then(res => res.data)
}

export const getGroupMsg = params => {
  return axios({
    method: 'post',
    baseURL: `${baseUrl}/group/groupMsg`,
    data: params
  }).then(res => res.data)
}