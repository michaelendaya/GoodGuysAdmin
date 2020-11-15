<template>
<div class="about-box-main">
    <div class="container">
            <div class="row">
                <div class="col-lg-8 col-sm-12">
                    <div class="contact-form-right">
                        <h2>Add A Category</h2>
                        <form action="">
                            <div class="row">
                                <!-- Category -->
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <input v-model="type" class="form-control" type="text"  name="name" placeholder="Category Type" >
                        
                                    </div>
                                </div>  
                                <div class="col-md-12">
                                    <div class="submit-button text-center">
                                     <a type="button" class="btn hvr-hover" href="#" @click="onAddCategory">Add Category</a>
                                        <div class="h3 text-center hidden"></div>
                                        <div class="clearfix"></div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                
				<div class="col-lg-4 col-sm-12">
                    <div class="contact-info-left">
                        <h2>CONTACT INFO</h2>
                          <ul class="list-group">
                    <li class="list-group-item" v-for="category in categories" :key="category._id">{{category.type}}</li>
                        </ul>   
                    </div>
                </div>
            </div>
        </div>
          </div>
</template>


<script>
export default { 
    middleware: 'auth',
    head:{
     title: 'Category',
    },
    

    async asyncData({$axios}){
        try{
            let response = await $axios.$get("/api/categories");
                return {
                    categories:response.categories
                }
        
        }catch(err){
            console.log(err)
        }
    },
    data(){
        return{
            type:""
        };
    },
    methods:{
        async onAddCategory(){
            try{
                 let data = {type: this.type};
            let response = await this.$axios.post("/api/categories"
            ,data
            );       
            if(response.status){
                this.categories.push(data);
            }
            }catch(err){
            console.log(err)
            }    
        } 
    }
    
}
</script>