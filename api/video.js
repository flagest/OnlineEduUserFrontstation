import  request from '@/utils/request'

export default {
  getPlayAuth(videoId){
    return request({
      url:`/eduvod/video/getPlayAuth/${videoId}`,
      method:"get"
    })

  }
}
