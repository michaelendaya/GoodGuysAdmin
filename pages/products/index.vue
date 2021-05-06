<template>
<div class="about-box-main">
    <div class="container">
            <div class="row">
                <div class="col-lg-8 col-sm-12">
                    <div class="contact-form-right">
                        <h2>Add A New Product</h2>
                        <form @submit.prevent="onAddProduct">
                            <div class="row">
                                <!-- Title -->
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <input v-model="title" class="form-control" type="text" required name="name" placeholder="Product Title" >
                        
                                    </div>
                                </div>
                                <!-- Price -->
                                <div class="col-md-12">
                                    <div class="form-group">
                                              Price <br>
                                        <input class="form-control" v-model="price" type="number" required placeholder="Product Price" name="name" >
                       
                                    </div>
                                </div>
                                <!-- Qty -->
                                <div class="col-md-12">
                                    <div class="form-group">
                                              Quantity <br>
                                        <input class="form-control" v-model="quantity" type="number" required placeholder="Product Quantity" name="name" >
                       
                                    </div>
                                </div>
                                <!-- Category Dropdown -->
                                <div class="col-md-12">
                                    <div class="form-group">
                                    Select Category <br>
                                     <select class="form-control" required  v-model="categoryID"> 
                                         <option v-for="category in categories" :key="category._id" :value="category._id">{{category.type}}</option>
                                   
                                     </select>
                                    </div>
                                </div>
                                <!-- Owner Dropdown -->
                                <div class="col-md-12">
                                    <div class="form-group">
                                    Select Brand <br>
                                     <select class="form-control" required v-model="ownerID"> 
                                            <option v-for="owner in owners" :key="owner._id" :value="owner._id">{{owner.name}}</option>

                                  
                                     </select>
                                    </div>
                                </div>

 

                            <!-- File  -->
                                <div class="col-md-12">
                                    <div class="form-group">
                                     <input required type="file" @change="onFileSelected"/>  
                                    </div>
                                    <p>{{fileName}}</p>
                                     <img :src="image" :alt="fileName" class="preview-img mb-5">
                                </div>
                            <!-- Description -->
                                <div class="col-md-12">
                                    <div class="form-group">
                                     <vue-editor v-model="description"></vue-editor>
                                        
                                    </div>
                            <!-- Submit -->
                                    <div class="submit-button text-center">
                                    <button type="submit" class="btn hvr-hover" href="#" >Add A Product</button>                                 
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
 
     middleware: "auth",
        head:{
     title: 'Product',
    },
   async asyncData({$axios}){

       try {
         let categories=  $axios.$get("/api/categories");
         let owners =  $axios.$get("/api/owners");
         const[catResponse,ownerResponse]= await Promise.all([
            categories,owners
        ]);

            console.log(catResponse);
        
            return{
                categories: catResponse.categories,
                owners: ownerResponse.owners
            }
          
       } catch (error) {
                console.log("grr") 
          console.log(error) 
       }
   
    },
       data(){
        return{
            categoryID:null,
            ownerID:null,
            title:"",
            price:0,
            quantity:0,
            description:"",
            selectedFile:null,
            fileName:"",
            image:""
        };
    },
       methods:{
        onFileSelected(event){
            this.selectedFile = event.target.files[0];
            console.log(this.selectedFile);
            this.fileName = event.target.files[0].name;
            const file = event.target.files[0]
             this.image = URL.createObjectURL(file)
        },

        async onAddProduct(){
            let data = new FormData
             data.append("title",this.title);
             data.append("price",this.price);
             data.append("description",this.description);
             data.append("stockQuantity",this.quantity);
             data.append("ownerID",this.ownerID);
             data.append("categoryID",this.categoryID);
             data.append("photo",this.selectedFile, this.selectedFile.name);

             let result = await this.$axios.$post('/api/products',data);
                        this.$router.push("/")
        }
       }
}
</script>
<style scoped>
.preview-img{
    max-height: 600px;
    max-width: 680px;
}
</style>