<template>
  <div class="main">
    <div class="title">
      <a class="active" href="/login">登录</a>
      <span>·</span>
      <a href="/register">注册</a>
    </div>

    <div class="sign-up-container">
      <el-form ref="userForm" :model="user">

        <el-form-item class="input-prepend restyle" prop="mobile"
                      :rules="[{ required: true, message: '请输入手机号码', trigger: 'blur' },{validator: checkPhone, trigger: 'blur'}]">
          <div>
            <el-input type="text" placeholder="手机号" v-model="user.mobile"/>
            <i class="iconfont icon-phone"/>
          </div>
        </el-form-item>

        <el-form-item class="input-prepend" prop="password"
                      :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]">
          <div>
            <el-input type="password" placeholder="密码" v-model="user.password"/>
            <i class="iconfont icon-password"/>
          </div>
        </el-form-item>

        <div class="btn">
          <input type="button" class="sign-in-button" value="登录" @click="submitLogin()">
        </div>
      </el-form>
      <!-- 更多登录方式 -->
      <div class="more-sign">
        <h6>社交帐号登录</h6>
        <ul>
          <li><a id="weixin" class="weixin" target="_blank"
                 href="http://localhost:8150/api/ucenter/wx/login">
             <i class="iconfont icon-weixin"/></a>
          </li>
          <li><a id="qq" class="qq" target="_blank" href="#"><i class="iconfont icon-qq"/></a></li>
        </ul>
      </div>
    </div>

  </div>
</template>
<script>
  import '~/assets/css/sign.css'
  import '~/assets/css/iconfont.css'
  import login from '@/api/login'
  import cookie from 'js-cookie'

  export default {
    layout: 'sign',
    components: {cookie},
    data() {
      return {
        user: {
          mobile: '',
          password: ''
        },
        loginInfo: {}
      }
    },

    methods: {
      //登录
      submitLogin() {
        login.submitLogin(this.user).then(response => {
          if (response.data.success) {
            //第二步将token字符串穿在cookie里面
            // 第一个参数是cookie名称，第二个是是参数值，第三个参数是daomain是作用范围
            cookie.set('token', response.data.data.token, {domain: 'localhost'});
            //根据tonken的值获取用户信息
            login.getLoginInfo().then(response => {
              //将用户信息放进cookie中
              cookie.set('guli_ucenter', response.data.data.userInfo, {domain: 'localhost'})
              //页面跳转
              window.location.href = '/';
            })
          } else {
            this.$message({
              type: 'error',
              message: response.data.message
            })
          }
        })
      },
      checkPhone(rule, value, callback) {
        //debugger
        if (!(/^1[34578]\d{9}$/.test(value))) {
          return callback(new Error('手机号码格式不正确'))
        }
        return callback()
      }
    }
  }
</script>
<style>
  .el-form-item__error {
    z-index: 9999999;
  }
</style>
