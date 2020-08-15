import request from '@/utils/request'

export default {
  getCommentList(page, limit, courseId) {
    return request({
      url: `/eduservice/commentfront/commentlist/${page}/${limit}/${courseId}`,
      method: 'get'
    })
  },

  addcomments(eduComment) {
    return request({
      url: `/eduservice/commentfront/addcomments`,
      method: 'post',
      data: eduComment
    })
  }
}
