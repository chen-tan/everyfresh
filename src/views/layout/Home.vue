<template>
  <div class="home-page">
      <div class="slider-menu">
          <slider-menu :class="{'slider-menu-container':true,'menu-flod':collapsed}" />
      </div>
      <div :class="{'main-app':true,'menu-fold':collapsed}">
          <main-header />
      </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import MainHeader from '../components/MainHeader.vue';
import SliderMenu from '../components/SliderMenu.vue';

export default {
  name: 'Home',
  data(){
    return {
      
    }
  },
  computed:{
    ...mapState(['collapsed']),
  },
  methods:{
        
    },
  components: {
    SliderMenu,
    MainHeader
  },
};
</script>

<style lang="less">
  @import url('~@/assets/css/home.less');
</style>