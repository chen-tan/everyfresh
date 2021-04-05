<template>
  <div class="sale-detail">
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :labelCol="{ span: 5 }"
      :wrapperCol="{ span: 14 }"
    >
      <a-form-model-item ref="price" label="商品售价" prop="price" required>
        <a-input v-model.number="form.price" />
      </a-form-model-item>
      <a-form-model-item ref="price_off" label="商品折扣价" prop="price_off">
        <a-input v-model.number="form.price_off" />
      </a-form-model-item>
      <a-form-model-item
        ref="inventory"
        label="商品库存"
        prop="inventory"
        required
      >
        <a-input v-model.number="form.inventory" />
      </a-form-model-item>
      <a-form-model-item ref="unit" label="计量单位" prop="unit" required>
        <a-input v-model="form.unit" />
      </a-form-model-item>
      <a-form-model-item :wrapperCol="{ span: 19 }">
        <div class="clearfix img-upload">
          <a-upload
            :action="`https://mallapi.duyiedu.com/upload/images?appkey=${$store.state.loginUser.data.appkey}`"
            list-type="picture-card"
            :file-list="fileList"
            name="avatar"
            @preview="handlePreview"
            @change="handleChange"
          >
            <div v-if="fileList.length < 8">
              <a-icon type="plus" />
              <div class="ant-upload-text">上传</div>
            </div>
          </a-upload>
          <a-modal
            :visible="previewVisible"
            :footer="null"
            @cancel="handleCancel"
          >
            <img alt="example" style="width: 100%" :src="previewImage" />
          </a-modal>
        </div>
      </a-form-model-item>
      <div class="btn-group">
        <a-button @click="prev"> 上一步 </a-button>
        <a-button type="primary" @click="submit"> 提交 </a-button>
        <a-button @click="resetForm"> 重置 </a-button>
      </div>
    </a-form-model>
  </div>
</template>

<script>
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
export default {
  props: {
    form: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      previewVisible: false,
      previewImage: "",
      images:[],
      fileList: [],
      rules: {
        price: [
          {
            required: true,
            type: "number",
            message: "请输入价格",
            trigger: "change",
          },
        ],
        inventory: [
          {
            required: true,
            type: "number",
            message: "请输入商品库存",
            trigger: "change",
          },
        ],
        unit: [
          {
            required: true,
            message: "请输入商品计量单位",
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    prev() {
      this.$emit("prev");
    },
    submit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit("submit",this.images);
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
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChange({ file,fileList }) {
      if(file.status==='done'){
        //上传成功
        if(file.response.status==='success'){
          this.images.push(file.response.data.url);
        }
      }else if(file.status==='removed'){
        //移除图片
        if(file.response){
          const url=file.response.data.url;
          this.images=this.images.filter(i=>i!==url);
        }else{
          const url = file.url;
          this.images=this.images.filter(i=>i!==url);
        }
      }
      this.fileList=fileList;
    }
  },
  computed: {
    categoryList() {
      if (this.$store.state.categoryList.data) {
        return this.$store.state.categoryList.data;
      } else {
        this.$store.dispatch("categoryList/getCategoryList");
        return this.$store.state.categoryList.data;
      }
    },
  },
  created(){
    if(this.form.images.length){
      this.images=[...this.form.images];
      this.fileList=this.form.images.map((item,index)=>{
        return {
          uid: index,
          name: `image${index}.png`,
          status: 'done',
          url: item
        }
      })
    }
  }
};
</script>

<style lang="less" scoped>
.sale-detail {
  .img-upload {
    max-width: 1080px;
    margin: 10px auto;
    padding-left: 26.3%;
  }
  .btn-group {
    width: 100%;
    text-align: center;
    button {
      margin-right: 20px;
    }
  }
}
</style>