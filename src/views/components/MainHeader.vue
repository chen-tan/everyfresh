<template>
  <div class="main-header">
      <div class="header-left">
           <a-button type="primary" @click="toggleCollapsed">
                <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
            </a-button>
            <div class="bread-crumb">
                <a-breadcrumb>
                    <a-breadcrumb-item>Home</a-breadcrumb-item>
                    <a-breadcrumb-item><a href="">Center</a></a-breadcrumb-item>
                </a-breadcrumb>
            </div>
      </div>
   
    <div class="user-info">
        <div class="username">
            <span>用户名</span>
            <a-icon type="down" />
        </div>
        <span class="loginout">退出</span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    computed:{
        ...mapState(['collapsed']),
    },
    methods:{
        toggleCollapsed() {
           this.$store.dispatch('toggleCollapsed');
        },
    },
}
</script>

<style>

</style>