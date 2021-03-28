<template>
  <div>
    <a-menu
      :default-selected-keys="[defaultSelectedKeys]"
      :default-open-keys="[defaultOpenKeys]"
      mode="inline"
      theme="dark"
      :inline-collapsed="collapsed"
    >
      <a-sub-menu v-for="menu in menuRoutes" :key="menu.name">
        <span slot="title">
          <a-icon type="mail" />
          <router-link :to="{name:menu.name}" custom>
            <span>{{ menu.meta.title }}</span>
          </router-link>
        </span>
        <template v-for="sub in menu.children">
          <a-menu-item v-if="!sub.meta.hidden" :key="sub.name">
            <a-icon :type="sub.meta.icon" />
            <router-link :to="{name:sub.name}" custom v-slot="{ navigate }">
              <span @click="navigate" @keypress.enter="navigate" role="link">{{ sub.meta.title }}</span>
            </router-link>
            <!-- <router-link :to="{name:sub.name}" tag="span" >{{ sub.meta.title }}</router-link> -->
          </a-menu-item>
        </template>
      </a-sub-menu>

    </a-menu>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    props:{
        collapsed:{
            type:Boolean,
            require:true
        }
    },
    data(){
      return {
        defaultSelectedKeys:'',
        defaultOpenKeys:''
      }
    },
    
    watch:{
      '$route':{
        immediate:true,
        handler(){
          this.defaultOpenKeys=this.$route.matched[0].name; 
          this.defaultSelectedKeys=this.$route.name;
        }
        
      }
    },
    computed:{
      ...mapState(['menuRoutes']),
      
    }
};
</script>
