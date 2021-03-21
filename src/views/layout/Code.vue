<template>
    <div class="login-panel">
        <div class="title">验证码</div>
        <a-form-model ref="codeForm" :model="codeForm" :rules="rules" v-bind="layout">
        <a-form-model-item has-feedback label="邮箱" prop="email">
        <a-input v-model="codeForm.email" />
        <a-button type="primary" @click="submitForm('codeForm')">
            获取验证码
        </a-button>
        <a-button style="margin-left: 10px" @click="resetForm('codeForm')">
            重置
        </a-button>
        </a-form-model-item>
    </a-form-model>
      <router-link class="login-to" :to="{name:'Login'}">已有账号？去登录</router-link>
      <router-link class="login-to" :to="{name:'Reg'}">还没有账号？去注册</router-link>
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
    return {
      codeForm: {
        email: '',
      },
      rules: {
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
          //邮箱格式正确，向后台发送请求，获取验证码
          // 1154638108@qq.com
         const hasCodeMsg = await this.$store.dispatch('loginUser/code',this.codeForm);
         if(hasCodeMsg){
           //登录成功，暂定跳转到注册页
           alert(hasCodeMsg)
           this.$router.push({
             name:"Reg"
           });
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
};
</script>
<style lang="less" scoped>
    @import url('~@/assets/css/login.less');
</style>
