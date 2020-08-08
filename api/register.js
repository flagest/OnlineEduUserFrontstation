import request from '@/utils/request'

export default {
  //获取验证码
  getVeirif(phone) {
    return request({
      url: `/edumsm/msm/sent/${phone}`,
      method: 'get'
    })
  },
  //注册用户
  registerMember(registerVO) {
    return request({
      url: `/api/ucenter/member/register`,
      method: 'post',
      data: registerVO
    })
  },
}
