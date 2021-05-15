<template>
  <div class="about-box-main">
    <div class="container">
      <nuxt-link to="/products" class="btn hvr-hover"
        >Add a new product</nuxt-link
      >
      <nuxt-link to="/category" class="btn hvr-hover"
        >Add a new category</nuxt-link
      >
      <nuxt-link to="/owner" class="btn hvr-hover">Add a new brand</nuxt-link>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Stock</th>
            <th>Image</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in products" :key="product._id">
            <td class="title">{{ product.title }}</td>
            <td class="title">{{ product.stockQuantity }}</td>
            <td><img :src="product.photo" alt="" /></td>
            <td class="table-image">
              <nuxt-link
                :to="`/products/${product._id}`"
                class="btn hvr-hover"
                href="#"
                >Edit
              </nuxt-link>
            </td>
            <td>
              <a
                href="#"
                class="btn hvr-hover2"
                @click="onDeleteProduct(product._id, index)"
                >delete</a
              >
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th>Product Name</th>
            <th>Stock</th>
            <th>Image</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </tfoot>
      </table>
        <div class="paginate">
          
                <div class="d-flex justify-content-center">
      <b-pagination
        @change="handlePageChange"
        v-model="currentPage"
        :total-rows="totalRows"
        :per-page="perPage"
      ></b-pagination>
    </div>
    </div>
    </div>
  
  </div>
</template>



<script>
import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
Vue.use(BootstrapVue);
export default {
  middleware: "auth",
  async asyncData({ $axios }) {
    try {
      let response = await $axios.$get("/api/products");

      return {
        products: response.products,
        currentPage: 1,
        perPage: 10,
        totalRows: response.count,
      };
    } catch (error) {
      console.log(error);
    }
  },

  methods: {
    async onDeleteProduct(id, index) {
      if (confirm("Are you sure you want to delete this item")) {
        try {
          let response = await this.$axios.$delete(
            `/api/products/${id}`
          );
          if (response.status) {
            this.products.splice(index, 1);
          }
        } catch (err) {
          console.log(err);
        }
      }else{
        //nothing happens
      }
    },
    async handlePageChange(page) {
      console.log(page);
      let productsResponse = await this.$axios.$get(
        `/api/products?page=${page}`
      );
      this.products = productsResponse.products;
    },
  },
};
</script>
<style scoped>
table img{
  text-align: center;
    max-width: 150px;
    max-height: 200px;
}
table .title{
  max-width: 150px;
}
.paginate{
  display: flex;
  align-items: center;
  justify-content: center

}
</style>