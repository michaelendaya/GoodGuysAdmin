<template>
  <div class="about-box-main">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-sm-12">
          <div class="contact-form-right">
            <h2>Edit {{ product.title }}</h2>
            <form @submit.prevent="onUpdateProduct">
              <div class="row">
                <!-- Title -->
                <div class="col-md-12">
                  <div class="form-group">
                    <input
                      v-model="title"
                      class="form-control"
                      type="text"
                      :placeholder="product.title"
                    />
                  </div>
                </div>

                <!-- Price -->

                <div class="col-md-12">
                  <div class="form-group">
                    Price<br />
                    <input
                      class="form-control"
                      v-model="price"
                      type="number"
                      :placeholder="product.price"
                    />
                  </div>
                </div>
                <!-- Qty -->

                <div class="col-md-12">
                  <div class="form-group">
                    Quantity <br />
                    <input
                      class="form-control"
                      v-model="quantity"
                      type="number"
                      :placeholder="product.stockQuantity"
                    />
                  </div>
                </div>
                <!-- Category Dropdown -->
                <div class="col-md-12">
                  <div class="form-group">
                    Select Category <br />
                    <select class="form-control" v-model="categoryID">
                      <option
                        v-for="category in categories"
                        :key="category._id"
                        :value="category._id"
                      >
                        {{ category.type }}
                      </option>
                    </select>
                  </div>
                </div>
                <!-- Owner Dropdown -->
                <div class="col-md-12">
                  <div class="form-group">
                    Select Brand<br />
                    <select class="form-control" v-model="ownerID">
                      <option
                        v-for="owner in owners"
                        :key="owner._id"
                        :value="owner._id"
                      >
                        {{ owner.name }}
                      </option>
                    </select>
                  </div>
                </div>

                <!-- File  -->
                <div class="col-md-12">
                  <div class="form-group">
                    <input type="file" @change="onFileSelected" />
                  </div>
                  <p>{{ fileName }}</p>
                  <img :src="image" :alt="fileName" class="preview-img mb-5" />
                </div>
                <!-- Description -->
                <div class="col-md-12">
                  <div class="form-group">
                    <vue-editor v-model="description"></vue-editor>
                  </div>
                  <!-- Submit -->
                  <div class="submit-button text-center">
                    <button type="submit" class="btn hvr-hover">
                      Update {{ product.title }}
                    </button>

                    <div class="h3 text-center hidden"></div>
                    <div class="clearfix"></div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  middleware: "admin",
  head: {
    title: "Edit Product",
  },
  async asyncData({ $axios, params }) {
    try {
      let categories = $axios.$get("/api/categories");
      let owners = $axios.$get("/api/owners");
      let product = $axios.$get(`/api/products/${params.id}`);
      const [catResponse, ownerResponse, productResponse] = await Promise.all([
        categories,
        owners,
        product,
      ]);

      return {
        categories: catResponse.categories,
        owners: ownerResponse.owners,
        product: productResponse.product,
      };
    } catch (error) {
      console.log("grr");
      console.log(error);
    }
  },
  data() {
    return {
      categoryID: null,
      ownerID: null,
      title: null,
      price: null,
      quantity: null,
      description: null,
      selectedFile: null,
      fileName: null,
      image: null,
    };
  },
  mounted() {
    this.title = this.product.title;
    this.quantity = this.product.quantity;
    this.quantity = this.product.quantity;
    this.price = this.product.price;
    this.ownerID = this.product.owner._id;
    this.categoryID = this.product.category._id;
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      console.log(this.selectedFile);
      this.fileName = event.target.files[0].name;
      const file = event.target.files[0];
      this.image = URL.createObjectURL(file);
    },

    async onUpdateProduct() {
      const photo = this.selectedFile;
      let data = new FormData();
      data.append("title", this.title);
      data.append("price", this.price);
      data.append("stockQuantity", this.quantity);
      data.append("description", this.description);
      data.append("ownerID", this.ownerID);
      data.append("categoryID", this.categoryID);
      if (photo) {
        data.append("photo", this.selectedFile, this.selectedFile.name);
      }
      //  data.append("photo",photo?photo:null, photo?photo.name:null);

      let result = await this.$axios.$put(
        `/api/products/${this.$route.params.id}`,
        data
      );
      this.$router.push("/");
    },
  },
};
</script>
<style scoped>
.preview-img {
  max-height: 600px;
  max-width: 680px;
}
</style>