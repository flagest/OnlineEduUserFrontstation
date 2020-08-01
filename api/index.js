import request from '@/utils/request'

export default {
  getTeachersAndCourses() {
    return request({
      url: `/eduservice/indexfront/index`,
      method: `get`
    })
  }
}
