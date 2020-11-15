<template>

  
  <div class="about-box-main">
    <div class="container">
      <nuxt-link to="/products" class="btn hvr-hover">Add a new product</nuxt-link>
            <nuxt-link to="/category" class="btn hvr-hover" >Add a new category</nuxt-link>
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
    <tr v-for="product in displayedPosts">
      <td>{{product.title}}</td>
      <td><img :src="product.photo" alt=""></td>
      <td>  <nuxt-link :to="`/products/${product._id}`" class="btn hvr-hover" href="#" >Edit </nuxt-link></td>
      <td> <a href="#" class="btn hvr-hover2" @click="onDeleteProduct(product._id, index)">delete</a></td>
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

     
				  <a class="btn hvr-hover"  href="#"  v-if="page != 1" @click="page--"> Previous </a>
		

					  <a class="btn hvr-hover"  href="#"  v-for="pageNumber in pages.slice(page-1, page+5)" @click="page = pageNumber"> {{pageNumber}} </a>
		
		
				  <a class="btn hvr-hover"  href="#"  @click="page++" v-if="page < pages.length"> Next </a>
            </div>
</div>
</template>



<script>

export default {
     middleware: "auth",
    
 
    async asyncData({$axios}){
   try {
     let response = await $axios.$get("/api/products");
    console.log(response)
    return{
       products:response.products
     }

   } catch (error) {
     console.log(error)
   }
 },

   data () {
		return {
			posts : [''],
			page: 1,
			perPage: 9,
			pages: [],		
		}
	},
	methods:{
       async onDeleteProduct(id, index){
      try{
      let response = await this.$axios.$delete(
        `http://localhost:3000/api/products/${id}`
        );
      if(response.status){
        this.products.splice(index,1);
      }
      }catch(err){
        console.log(err)
      }
    },
		getPosts () {	
      let data = [];
      for(let i = 0; i < 50; i++){
        this.posts.push({first: 'Boss',
               last:'Doe', 
               suffix:'#' + i});
      }  
		},
		setPages () {
			let numberOfPages = Math.ceil(this.products.length / this.perPage);
			for (let index = 1; index <= numberOfPages; index++) {
				this.pages.push(index);
			}
		},
		paginate (posts) {
			let page = this.page;
			let perPage = this.perPage;
			let from = (page * perPage) - perPage;
			let to = (page * perPage);
			return  posts.slice(from, to);
		}
	},
	computed: {
		displayedPosts () {
			return this.paginate(this.products);
		}
	},
	watch: {
		posts () {
			this.setPages();
		}
	},
	created(){
		this.getPosts();
	},
	filters: {
		trimWords(value){
			return value.split(" ").splice(0,20).join(" ") + '...';
		}
}
}

 
	

</script>