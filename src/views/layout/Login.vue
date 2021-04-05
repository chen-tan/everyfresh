<template>
    <div class="login-panel">
        <div class="title">登录</div>
        <a-form-model ref="loginForm" :model="loginForm" :rules="rules" v-bind="layout">
        <a-form-model-item has-feedback label="邮箱" prop="email">
        <a-input v-model="loginForm.email" />
        </a-form-model-item>
        <a-form-model-item has-feedback label="密码" prop="password">
        <a-input v-model="loginForm.password" type="password" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="submitForm('loginForm')">
            登录
        </a-button>
        <a-button style="margin-left: 10px" @click="resetForm('loginForm')">
            重置
        </a-button>
        </a-form-model-item>
        </a-form-model>
        <router-link class="login-to" :to="{name:'Reg'}">还没有账号？去注册</router-link>
        <router-link class="login-to" :to="{name:'FindBack'}">忘记密码了？去找回</router-link>
    </div>
</template>
<script>
export default {
  data() {
    let emailReg=/[a-zA-Z0-9_\-\.]+\@([a-zA-Z0-9_\-\.])+\.([a-zA-Z]{2,4})$/
    let checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入邮箱'));
      }
      if(emailReg.test(value)){
          return callback();
      }else{
          return callback(new Error('邮箱格式不正确'));
      }
    };
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      }else{
        return callback();
      }
    };
    return {
      loginForm: {
        password: '',
        email: '',
      },
      rules: {
        password: [{ validator: validatePass, trigger: 'change' }],
        email: [{ validator: checkEmail, trigger: 'change' }],
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    };
  },
 
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          //登录数据正确，向后台发送请求
          // 1154638108@qq.com
         const isLogin = await this.$store.dispatch('loginUser/login',this.loginForm);
         if(isLogin){
           //登录成功，暂定跳转到首页
           this.$router.push('/');
         }else{
           
           alert(this.$store.state.loginUser.err);
         }
        } else {
          alert('数据格式错误，请重新填写');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  created(){
    console.log(this.$route);
  }
};
</script>
<style lang="less" scoped>
    @import url('~@/assets/css/login.less');
</style>
