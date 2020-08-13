import request from '@/utils/request'


export default {

  getFrontCourseList(page, limit, courseFrontVO) {
    return request({
      url: `/eduservice/coursefront/getFrontCourseList/${page}/${limit}`,
      method: 'post',
      data: courseFrontVO
    })
  },
  getAllOneTwoSubject() {
    return request({
      url: `/eduservice/subject/getAllOneTwoSubject`,
      method: 'get'
    })
  },
  getCourseInfo(courseId) {
    return request({
      url: `/eduservice/coursefront/getFrontCourseInfo/${courseId}`,
      method: 'get'
    })

  }
}
