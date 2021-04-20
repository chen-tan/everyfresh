<template>
  <div class="product-add">
    <a-steps :current="current" class="steps-container">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <div class="steps-content">
        <basic-detail v-bind="text" v-if="current===0" :form="form" @next="next" />
        <sale-detail v-if="current===1" :form="form" @prev="prev" @submit="submit" />
    </div>
  </div>
</template>

<script>
import BasicDetail from '../../components/BasicDetail.vue';
import SaleDetail from '../../components/SaleDetail.vue';
import api from '../../api/index'
export default {
  components: { BasicDetail, SaleDetail },
      data() {
        return {
          current: 0,
          steps: [
            {
              title: '填写商品基本信息',
            },
            {
              title: '填写商品销售信息',
            },
          ],
          form:{
            title: "",
            desc: "",
            category: 0,
            c_item: [],
            tags: [],
            price: 0,
            price_off: 0,
            inventory: 0,
            unit: "",
            images:[],
          },
          text:{
            a:1,
            b:'haha',
            c:{
              d:'obj'
            }
          }
        };
      },
      methods: {
        next() {
          this.current++;
        },
        prev() {
          this.current--;
        },
        async submit(images){
          if(this.$route.params.id){
            //编辑商品提交
            this.form.images=[...images];
            const resp = await api.editProduct(this.form);
            if(resp.status==='success'){
              this.$router.push({
                name:'ProductList'
              })
            }else{
              alert('添加失败，请检查商品信息是否填写正确');
            }
          }else{
            // 添加商品提交
            this.form.images=[...images];
            const resp = await api.add(this.form);
            if(resp.status==='success'){
              // 添加商品成功
              this.$router.push({
                name:'ProductList'
              })
            }else{
              alert('添加失败，请检查商品信息是否填写正确');
            }
          }
        }
      },
      async created(){
        console.log(this.$refs);
        const id=this.$route.params.id;
        if(id){
          //编辑页面
          const resp = await api.detail(id);
          if(resp.status==='success'){
            this.form=resp.data;
          }
        }else{
          //添加页面

        }
      },
}
</script>

<style lang="less" scoped>
.product-add{
  .steps-container{
    width:50%;
    margin:20px auto;
} 
.steps-action {
  width:50%;
  margin:34px auto;
  .steps-btn{
    padding:0 25px;
  }
}
}


</style>