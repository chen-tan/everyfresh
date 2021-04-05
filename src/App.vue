<template>
  <div id="app">
    <!-- <upload /> -->
    <router-view></router-view>
  </div>
</template>

<script>
import Upload from './components/Upload.vue';
export default {
  name: 'app',
  components: {
    Upload
  },
};
</script>

<style>

</style>
