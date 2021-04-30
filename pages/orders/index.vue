<template>
  <!--YOUR ORDER-->
  <div class="cart-box-main">
    <div class="container">
      <div class="row">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Owner</th>
              <th>Subtotal</th>
              <th>Status</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order._id">
              <td>
                <span>({{ order._id }}) </span>
              </td>
              <td>
                <!-- <div v-for="product in order.products" :key="product._id">
                  Quantity: {{ product.quantity }}
                  <br />
                  Price ${{ product.price * product.quantity }}
                  
                </div> -->
                {{ order.owner.name }}
              </td>
              <!-- <td  v-if=" order.owner.address !== null" >  
                    <span>Full Name: {{ order.owner.address.fullName}}</span>
                    <br>
                    <span>Contact Number: {{ order.owner.address.phoneNumber}}</span>
                    <br>
                    <span>Address: {{ order.owner.address.streetAddress}}</span>
                    <span>{{ order.owner.address.city}}, {{ order.owner.address.state}}</span>
                    <br>
                    <span>Zipcode: {{ order.owner.address.zipCode}}</span>
              </td> -->
              <td>₱ {{ parseFloat(order.subTotal).toFixed(2) }}</td>
              <td>{{ order.status }}</td>
              <td>
                <nuxt-link :to="`/orders/${order._id}`" class="address-alert"
                  >View Order</nuxt-link
                >
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th>Order Id</th>
              <th>Owner</th>
              <th>Subtotal</th>
              <th>Status</th>
              <th>View</th>
            </tr>
          </tfoot>
        </table>
        <div class="paginate">
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
  <!--/YOUR ORDER-->

  <!--/MAIN-->
</template>
<script>
import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
Vue.use(BootstrapVue);
export default {
  head: {
    title: "Orders"
  },
  async asyncData({ $axios }) {
    try {
      let response = await $axios.$get("/api/admin/orders");
      console.log(response);
      return {
        orders: response.products,
        currentPage: 1,
        perPage: 10,
        totalRows: response.count
      };
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    async handlePageChange(page) {
      console.log(page);
      let response = await this.$axios.$get(`/api/admin/orders?page=${page}`);
      this.orders = response.products;
    }
  }
};
</script>

<style scoped>
.product-deets {
  margin-left: 20px;
}
span {
  font-weight: 700;
}
.table-head {
  background: #d5b256;
  font-weight: 700;
  color: white;
}

.product-name a:hover {
  color: #d5b256;
}
.product-name {
  font-weight: 700;
}
h1 {
  font-weight: 700;
}
</style>
