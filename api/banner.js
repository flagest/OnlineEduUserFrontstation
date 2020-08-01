import request from '@/utils/request'

export default {

  //查询前两条banner的信息
  getAllBanners() {
    return request({
      url: `/educms/bannerfront/getFrontBanners`,
      method: 'get'
    })
  }

}
