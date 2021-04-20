<template>
  <div class="basic-detail">
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :labelCol="{ span: 5 }"
      :wrapperCol="{ span: 14 }"
    >
      <a-form-model-item ref="title" label="副标题" prop="title" required>
        <a-input v-model="form.title" />
      </a-form-model-item>
      <a-form-model-item label="商品描述" prop="desc">
        <a-input v-model="form.desc" type="textarea" />
      </a-form-model-item>
      <a-form-model-item label="商品类目" prop="category">
        <a-select
          v-model.number="form.category"
          placeholder="请选择商品类目"
          allowClear
          @change="handleChange"
        >
          <a-select-option v-for="cate in categoryList" :key="cate.id" :value="cate.id">
              {{ cate.name }}
          </a-select-option>
        </a-select>
        <a-select
          v-model="form.c_item"
          placeholder="请选择商品子类目"
          allowClear
        >
          <a-select-option v-for="item in categoryItems" :key="item" :value="item">
              {{ item }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item ref="tags" label="商品标签" prop="tags" required>
        <a-select
          mode="tags"
          v-model="form.tags"
          placeholder="请选择商品标签"
          :default-value="['包邮，最晚次日达']"
        >
          <a-select-option value="包邮，最晚次日达">
            包邮，最晚次日达
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <div class="btn-group">
        <a-button type="primary" @click="next">
            下一步
        </a-button>
        <a-button @click="resetForm">
          重置
        </a-button>
      </div>
    </a-form-model>
  </div>
</template>

<script>
export default {
    props:{
        form:{
          type:Object,
          require:true,
        }
    },
    created(){
    },
  data() {
    return {
      categoryItems:[],
      rules: {
        title: [
          {
            required: true,
            message: "请输入标题",
            trigger: "change",
          },
        ],
        desc: [
          {
            required: true,
            message: "请输入商品描述",
            trigger: "change",
          },
        ],
        category: [
          {
            required: true,
            message: "请选择商品类目",
            trigger: "change",
          },
        ],
        c_items: [
          { 
            required: true, 
            message: "请选择商品子类目", 
            trigger: "change" 
          },
        ],
      },
    };
  },
  methods: {
    next(){
        this.$refs.ruleForm.validate((valid) => {
            if (valid) {
            this.$emit('next');
            return true;
            } else {
            console.log("error submit!!");
            return false;
            }
        });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
    handleChange(val){
        this.categoryItems=this.categoryList.find(c=>c.id===val)['c_items'];
    }
  },
  computed: {
    categoryList() {
      if ((this.$store.state.categoryList.data)) {
        return this.$store.state.categoryList.data;
      }else{
          this.$store.dispatch('categoryList/getCategoryList');
          return this.$store.state.categoryList.data;
      }
    },
  },
  created(){
    console.log(this.$refs);
  }
};
</script>

<style lang="less" scoped>
.btn-group{
    width:100%;
    text-align:center;
    button{
        margin-right:20px;
    }
}
</style>