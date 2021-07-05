import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/table/getList',
    method: 'post',
    data
  })
}

export function testInterface(data) {
  return request({
    url:'/business/demo/get',
    method: 'get',
    params: data
  })
}
