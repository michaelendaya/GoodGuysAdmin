<template>
  <div class="about-box-main">
    <div class="container">
      <div class="row" v-for="order in orders" :key="order._id">
        <div class="col-sm-6 col-lg-6 mb-3">
          <div class="checkout-address">
            <div class="title-left">
              <h3>Client</h3>
            </div>
            <div class="mb-3">
              <h4>{{ order.owner.name }}</h4>
            </div>
            <div class="mb-3">
              <h4>{{ order.owner.email }}</h4>
            </div>
            <div class="title-left">
              <h3>Subtotal</h3>
            </div>
            <div class="mb-3">
              <h4>₱ {{ parseFloat(order.subTotal).toFixed(2) }}</h4>
            </div>
          </div>
        </div>

        <div class="col-sm-6 col-lg-6 mb-3">
          <div class="checkout-address">
            <div class="title-left">
              <h3>Billing address</h3>
            </div>
            <div class="mb-3">
              <h4>{{ order.owner.address.fullName }}</h4>
            </div>
            <div class="mb-3">
              <h4>{{ order.owner.address.phoneNumber }}</h4>
            </div>
            <div class="mb-3">
              <h4>{{ order.owner.address.streetAddress }}</h4>
            </div>
            <div class="mb-3">
              <h4>
                {{ order.owner.address.city }}, {{ order.owner.address.state }}
              </h4>
            </div>
            <div class="mb-3">
              <h4>{{ order.owner.address.zipCode }}</h4>
            </div>
          </div>
        </div>
        <div class="delete-button"></div>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in order.products" :key="product._id">
              <td>
                <span>{{ product.productID.title }} </span>
              </td>
              <td>
                {{ product.quantity }}
                <br />
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
              <td>₱ {{ parseFloat(product.price).toFixed(2) }}</td>

              <td>
                ₱ {{ parseFloat(product.price * product.quantity).toFixed(2) }}
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </tfoot>
        </table>
        <a
          href="#"
          @click="onDeleteOrder(order._id)"
          class="btn hvr-hover ml-auto"
          >Mark As Completed</a
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  head: {
    title: "Orders"
  },
  async asyncData({ $axios, params }) {
    try {
      let response = await $axios.$get(`/api/admin/orders/${params.id}`);
      console.log(response);
      return {
        orders: response.products
      };
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    async onDeleteOrder(id) {
      if (
        confirm(
          "Are you sure you complete the order(It will remove the order from the list)"
        )
      ) {
        // Delete it!
        try {
          let complete = await this.$axios.$put(`/api/admin/orders/${id}`);
          if (complete.status) {
            this.$router.push("/orders");
          }
        } catch (err) {
          console.log(err);
        }
      } else {
        // Do nothing!
      }
    }
  }
};
</script>
<style scoped>
.delete-button {
  float: right;
}
</style>
