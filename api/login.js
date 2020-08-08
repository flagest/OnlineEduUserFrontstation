import request from '@/utils/request'

export default {
  //登录
  submitLogin(loginVO) {
    return request({
      url: `/api/ucenter/member/login`,
      method: 'post',
      data: loginVO
    })
  },
  //根据token获取用户信息
  getLoginInfo(){
    return request({
      url:`/api/ucenter/member/getMemberInfo`,
      method:'get',
    })

  }
}
