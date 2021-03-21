<template>
  <div class="login-panel">
    <div class="title">注册</div>
    <a-form-model ref="regForm" :model="regForm" :rules="rules" v-bind="layout">
      <a-form-model-item has-feedback label="邮箱" prop="email">
        <a-input v-model="regForm.email" />
      </a-form-model-item>
      <a-form-model-item has-feedback label="用户名" prop="username">
        <a-input v-model="regForm.username" />
      </a-form-model-item>
      <a-form-model-item has-feedback label="密码" prop="password">
        <a-input v-model="regForm.password" type="password" autocomplete="off" />
      </a-form-model-item>
    <a-form-model-item has-feedback label="确认密码" prop="checkPass">
      <a-input v-model="regForm.checkPass" type="password" autocomplete="off" />
    </a-form-model-item>
    <a-form-model-item has-feedback label="验证码" prop="code">
        <a-input v-model="regForm.code" />
      </a-form-model-item>
      <a-form-model-item label="用户角色">
      <a-select v-model="regForm.role" placeholder="请选择用户角色">
        <a-select-option value="customer">
          普通用户
        </a-select-option>
        <a-select-option value="admin">
          管理员用户
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="submitForm('regForm')">
        注册
      </a-button>
      <a-button style="margin-left: 10px" @click="resetForm('regForm')">
        重置
      </a-button>
    </a-form-model-item>
  </a-form-model>
      <router-link class="login-to" :to="{name:'Login'}">已有账号？去登录</router-link>
      <router-link class="login-to" :to="{name:'Code'}">还没有验证码？去获取</router-link>

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
    let checkEmpty = (rule, value, callback) => {
      if (!value) {
        return callback(new Error(`${rule.field}不能为空`));
      }else{
        return callback();
      }
    };
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.regForm.checkPass !== '') {
          this.$refs.regForm.validateField('checkPass');
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.regForm.password) {
        callback(new Error("两次密码不一致"));
      } else {
        callback();
      }
    };
    return {
      regForm: {
        email:'',
        username:'',
        password: '',
        checkPass: '',
        code:'',
        role:''
      },
      rules: {
        email: [{ validator: checkEmail, trigger: 'change' }],
        username: [{ validator: checkEmpty, trigger: 'change' }],
        password: [{ validator: validatePass, trigger: 'change' }],
        checkPass: [{ validator: validatePass2, trigger: 'change' }],
        code: [{ validator: checkEmpty, trigger: 'change' }],
        // role: [{ validator: checkEmpty, trigger: 'change' }],
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
          //验证数据正确，向后台发送请求，注册
          // 1154638108@qq.com
          const res = await this.$store.dispatch('loginUser/reg',this.regForm);
          if(res){
              this.$router.push({
                name:'Login'
              })
          }else{
            alert(this.$store.state.loginUser.err);
            if(this.$store.state.loginUser.err==='该用户已经注册，请直接登陆'){
             this.$router.push({name:'Login'})
           }
          }
        } else {
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
  @import url('../../assets/css/login.less');
</style>