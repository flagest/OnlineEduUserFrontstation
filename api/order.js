import request from '@/utils/request'


export default {
  //生成订单
  addOrder(courseId) {
    return request({
      url: `/orderservice/order/createOrder/${courseId}`,
      method: 'post',
    })
  },

  //更具课程id去查询课程信息
  getOrderInfo(orderId) {
    return request({
      url: `/orderservice/order/getOrderInfo/${orderId}`,
      method: 'get'
    })
  },
  //生成微信支付二维码接口
  createNative(orderNo) {
    return request({
      url: `/orderservice/paylog//createPayLog/${orderNo}`,
      method: 'get'
    })
  },
  //查询订单支付状态
  queryPayStatus(orderNo) {
    return request({
      url: `/orderservice/paylog//queryPayStatus/${orderNo}`,
      method: 'get'
    })
  }
}
