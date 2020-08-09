import request from '@/utils/request'


export default {

  //查询讲师前端请求后端接口
  getTeacherFrontList(page, limit) {
    return request({
      url: `/eduservice/techerfront/getTeacherFrontList/${page}/${limit}`,
      method: 'post',
    })
  },
  //更具讲师id去查询讲师信息和他的课程信息
  getTeacherInfo(teacherId){
    return request({
      url:`/eduservice/techerfront/getTeacherInfo/${teacherId}`,
      method:'get'
    })
  }

}
