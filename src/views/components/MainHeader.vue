<template>
  <div class="main-header">
      <div class="header-left">
           <a-button type="primary" @click="toggleCollapsed">
                <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
            </a-button>
            <div class="bread-crumb">
                <a-breadcrumb>
                    <a-breadcrumb-item>主页</a-breadcrumb-item>
                    <a-breadcrumb-item><a href="">统计</a></a-breadcrumb-item>
                </a-breadcrumb>
            </div>
      </div>
    <div class="user-info">
        <!-- 情况1 正在登录中 -->
        <template v-if="isLoading">
            <span>Loading...</span>
        </template>
        <!-- 情况2 已经登录了 -->
        <template v-else-if="data">
            <div class="username">
                <span>{{ data.username }}</span>
                <a-icon type="down" />
            </div>
            <span class="loginout" @click="loginOut">退出</span>
        </template>
        <!-- 情况3 还没有登录 -->
        <template v-else>
            <router-link :to="{name:'Login'}" class="to-login">登录</router-link>
            <router-link :to="{name:'Reg'}" class="to-reg">注册</router-link>
        </template>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    computed:{
        ...mapState(['collapsed']),
        ...mapState('loginUser',['data','isLoading']),
    },
    methods:{
        toggleCollapsed() {
           this.$store.dispatch('toggleCollapsed');
        },
        loginOut(){
            this.$store.dispatch('loginUser/loginOut');
        }
    },
}
</script>

<style>

</style>