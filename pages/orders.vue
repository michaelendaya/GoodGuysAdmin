<template>
  <!--YOUR ORDER-->
  <div class="cart-box-main">
    <div class="container">
      <div class="row">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Client</th>
              <th>Orders</th>
              <th>Address</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order._id">
              <td>
                <span>{{ order.owner.name }}</span>
              </td>
              <td>
                <div v-for="product in order.products" :key="product._id">
                  <span>{{ product.productID.title }}</span>
                  <div class="d-flex">
                  <div class="mr-auto p-2">
                       <img :src="product.productID.photo" class="img-fluid" style="width: 100px;" />
                       </div>
                      
                
                  <div class="p-2">
                    Quantity: {{ product.quantity }}
                    <br />
                    Price ${{ product.productID.price * product.quantity }}
                  </div>
                    </div>
                </div>
              </td>
              <td>  
                    <span>Full Name: {{ order.owner.address.fullName}}</span>
                    <br>
                    <span>Contact Number: {{ order.owner.address.phoneNumber}}</span>
                    <br>
                    <span>Address: {{ order.owner.address.streetAddress}}</span>
                    <span>{{ order.owner.address.city}}, {{ order.owner.address.state}}</span>
                    <br>
                    <span>Zipcode: {{ order.owner.address.zipCode}}</span>
              </td>
              <td><a href="#" class="btn hvr-hover2">delete</a></td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th>Client</th>
              <th>Orders</th>
              <th>Address</th>
              <th>Delete</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
  <!--/YOUR ORDER-->

  <!--/MAIN-->
</template>
<script>
export default {
  async asyncData({ $axios }) {
    try {
      let response = await $axios.$get("/api/admin/orders");
      console.log(response);
      return {
        orders: response.products,
      };
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style scoped>
.product-deets{
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
a:hover {
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



