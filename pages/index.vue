<template>
  <div class="about-box-main">
    <div class="container">
      <nuxt-link to="/products" class="btn hvr-hover"
        >Add a new product</nuxt-link
      >
      <nuxt-link to="/category" class="btn hvr-hover"
        >Add a new category</nuxt-link
      >
      <nuxt-link to="/owner" class="btn hvr-hover">Add a new owner</nuxt-link>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Image</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product._id">
            <td>{{ product.title }}</td>
            <td><img :src="product.photo" alt="" /></td>
            <td>
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
            <th>Image</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </tfoot>
      </table>
    </div>
    <div class="text-center">
      <b-pagination
        @change="handlePageChange"
        v-model="currentPage"
        :total-rows="totalRows"
        :per-page="perPage"
      ></b-pagination>
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
        perPage: 5,
        totalRows: response.count
      };
    } catch (error) {
      console.log(error);
    }
  },

  methods: {
    async onDeleteProduct(id, index) {
      try {
        let response = await this.$axios.$delete(
          `http://localhost:3000/api/products/${id}`
        );
        if (response.status) {
          this.products.splice(index, 1);
        }
      } catch (err) {
        console.log(err);
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