<template>
  <a-form-model
    layout="inline"
    :model="searchForm"
    @submit="handleSubmit"
    @submit.native.prevent
  >
    <a-form-model-item>
      <a-input v-model="searchForm.searchWord" placeholder="请输入关键字"> </a-input>
    </a-form-model-item>
    <a-form-model-item label="类别" prop="category" v-if="categoryList.length">
      <template>
        <a-select placeholder="请选择商品类目" :allowClear="true" style="width: 200px" @change="handleChange">
          <a-select-option v-for="cate in categoryList" :key="cate.id" :value="cate.id">
            {{ cate.name }}
          </a-select-option>
        </a-select>
    </template>
    </a-form-model-item>
    <a-form-model-item>
      <a-button
        type="primary"
        html-type="submit"
      >
        搜索
      </a-button>
    </a-form-model-item>
      <a-button class="to-product-add">
        <router-link :to="{name:'ProductAdd'}">添加商品</router-link>
      </a-button>
  </a-form-model>
</template>
<script>
export default {
   props:{
     searchForm:{
       type:Object,
       require:true,
     }
   },
  data() {
    return {
      categoryList:[]
    };
  },
  watch:{
      '$store.state.categoryList.data':{
        immediate:true,
        handler(){
          const data=this.$store.state.categoryList.data;
          if(data){
            this.categoryList=data;
            // this.searchForm.category=data[0].name;
          }
        }
      }
  },
  methods: {
    
    handleSubmit() {
      this.$emit('search-submit',this.searchForm);
    },
    handleChange(val) {
      this.searchForm.category=val;
    },
  },
  created() {
    this.$store.dispatch('categoryList/getCategoryList');

  }
};

</script>
<style scoped lang="less">
    .ant-form{
      position:relative;
      height:60px;
      line-height: 60px;
      .to-product-add{
        position:absolute;
        right:10px;
        top:3px;
      }
    }
    
</style>