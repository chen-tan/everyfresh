<template>
  <div>
    <a-menu
      :default-selected-keys="[menuRoutes[0].children[0].name]"
      :default-open-keys="[menuRoutes[0].name]"
      mode="inline"
      theme="dark"
      :inline-collapsed="collapsed"
    >
      
      <a-sub-menu v-for="menu in menuRoutes" :key="menu.name">
        <span slot="title"><a-icon type="mail" /><span>{{ menu.meta.title }}</span></span>
        <a-menu-item v-for="sub in menu.children" :key="sub.name">
          <a-icon :type="sub.meta.icon" /><span>{{ sub.meta.title }}</span>
        </a-menu-item>
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
    computed:{
      ...mapState(['menuRoutes']),
    }
};
</script>
