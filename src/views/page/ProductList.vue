<template>
  <div class="product-list">
    <search-list :searchForm="searchForm" @search-submit="searchSubmit" />
    <product-table :tableData="tableData" @product-edit="productEdit" @product-delete="productDelete" />
  </div>
</template>

<script>
import ProductTable from "../../components/ProductTable.vue";
import SearchList from "../../components/SearchList.vue";
import api from "../../api/index";
import { mapState } from "vuex";
export default {
  components: { SearchList, ProductTable },
  data() {
    return {
      tableData: [],
      searchForm: {
        searchWord: "",
        category: "",
      },
    };
  },
  computed: {
    ...mapState("categoryList", ["data"]),
  },
  methods: {
    async searchSubmit(searchForm) {
      this.searchForm = searchForm;
      this.getTableData();
    },
    async getTableData() {
      const resp = await api.getProductsList({
        ...this.searchForm,
      });
      if (resp.status === "success") {
        this.tableData = resp.data.data;
      }
    },
    productEdit(record) {
      this.$router.push({
        name: "ProductEdit",
        params: {
          id: record.id
        },
      });
    },
    productDelete(record){
      this.$confirm({
        title: '确认删除吗？',
        content: `确认删除title为${record.title}的商品吗？`,
        okText: '是',
        okType: 'danger',
        cancelText: '否',
        onOk:async ()=>{
          const resp = await api.delete(record.id);
          if(resp.status==='success'){
            alert(`成功删除title为${record.title}的商品`);
            this.getTableData();
          }
        },
        onCancel() {
          // console.log('Cancel');
        },
      });
    }
  },
  created() {
    this.getTableData();
  },
};
</script>

<style>
</style>