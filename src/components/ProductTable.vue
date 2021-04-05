<template>
  <a-table :columns="columns" :data-source="renderData" :scroll="{ y: 440 }">
    <div slot="operate" slot-scope="text,record">
        <a-button @click="productEdit(text,record)">编辑</a-button>
        <a-button @click="productDelete(text,record)">删除</a-button>
    </div>
    <!-- <a-pagination :total="50" show-less-items /> -->
  </a-table>
</template>
<script>
import { mapState } from 'vuex';
import api from '../api/index'
const columns = [
  {
    title: '名称',
    dataIndex: 'c_item',
    key: 'c_item',
  },
  {
    title: '类目',
    dataIndex: 'categoryName',
    key: 'categoryName',
    ellipsis: true,
  },
  {
    title: '标签',
    dataIndex: 'tags',
    key: 'tags',
    ellipsis: true,
  },
  {
    title: '价格',
    dataIndex: 'price',
    key: 'price',
    ellipsis: true,
  },
  {
    title: '折扣价',
    dataIndex: 'price_off',
    key: 'price_off',
    ellipsis: true,
  },
  {
    title: '单位',
    dataIndex: 'unit',
    key: 'unit',
    ellipsis: true,
  },
  {
    title: '上架状态',
    dataIndex: 'status',
    key: 'status',
    ellipsis: true,
  },
  {
    title: '商品库存量',
    dataIndex: 'inventory',
    key: 'inventory',
    ellipsis: true,
  },
  {
    title: '描述',
    dataIndex: 'desc',
    key: 'desc',
    ellipsis: true,
  },
  
  {
    title: '操作',
    dataIndex: 'operate',
    key: 'operate',
    align:'center',
    width:180,
    scopedSlots: { customRender: 'operate' },
  }
];
export default {
    props:{
        tableData:{
            type:Array,
            require:true,
        }
    },
    data() {
        return {
          columns,
        };
    },
    computed:{
        ...mapState('categoryList',['data']),
        renderData(){
          let categoryList = this.data;
          // const arr = categoryList.map(c=>c.id);
          // const res = this.tableData.find(t=>{
          //   if(arr.indexOf(t.category)===-1){
          //     console.log(t);
          //   }
          // });
            return this.tableData.map(i=>{
              const cate = categoryList.find(c=>i.category===c.id)
                return {
                    ...i,
                    key:i.id,
                    categoryName:cate.name
                }
            })
        }
    },
    methods:{
      productEdit(text,record){
        this.$emit('product-edit',record);
      },
      productDelete(text,record){
        this.$emit('product-delete',record);
      }
    },
};
</script>
<style scoped>
  /* button{
    display: inline-block;
    width:41px;
    padding:0;
  } */
</style>