import base from './index'
let axios = base.axios
let baseUrl = base.baseUrl

// 获取好友
export const getFriend = params => {
    return axios({
      method: 'post',
      baseURL: `${baseUrl}/friend/friendList`,
      data: params
    }).then(res => res.data)
  }

  // 获取聊天信息
export const getChatMsg = params => {
  return axios({
    method: 'post',
    baseURL: `${baseUrl}/friend/chatMsg`,
    data: params
  }).then(res => res.data)
}

// 获取群组列表
export const getGroupList = params => {
  return axios({
    method: 'post',
    baseURL: `${baseUrl}/group/groupList`,
    data: params
  }).then(res => res.data)
}

// 创建群组
export const createGroup = params => {
  return axios({
    method: 'post',
    baseURL: `${baseUrl}/group/create`,
    data: params
  }).then(res => res.data)
}