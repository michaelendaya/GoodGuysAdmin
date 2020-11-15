<template>
<div class="about-box-main">
    <div class="container">
            <div class="row">
                  <div class="col-lg-8 col-sm-12">
                    <div class="contact-form-right">
                        <h2>Add An Owner</h2>
                        <form action="">
                            <div class="row">
                                <!-- Owner Name -->
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <input v-model="name" class="form-control" type="text"  name="name" placeholder="Owner Name" >
                                    </div>
                                </div>  
                                <!-- Owner About -->
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <input v-model="about" class="form-control" type="text"  name="name" placeholder="About Owner" >
                                    </div>
                                </div>
                                 <!-- File  -->
                                <div class="col-md-12">
                                    <div class="form-group">
                                     <input type="file" @change="onFileSelected"/>  
                                    </div>
                                </div>

                                <div class="col-md-12">
                                    <div class="submit-button text-center">
                                     <a type="button" class="btn hvr-hover" href="#" @click="onAddOwner">Add Category</a>
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
                        <h2>Owner List</h2>
                          <ul class="list-group">
                    <li class="list-group-item" v-for="owner in owners" :key="owner._id">{{owner.name}}</li>
                        </ul>   
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
     title: 'Owner',
    },
    async asyncData({$axios}){
        try{
            let response = await $axios.$get("/api/owners");
                return {
                    owners:response.owners
                }
        
        }catch(err){
            console.log(err)
        }
    },
    data(){
        return{
            name:"",
            about:"",
            selectedFile: null,
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

        async onAddOwner(){
 
            try{
                 let data = new FormData();
                 data.append("name",this.name);
                 data.append("about",this.about);
                 data.append("photo",this.selectedFile, this.selectedFile.fileName);
                 let response = await this.$axios.post(
                "/api/owners"
                ,data
                );
            
            if(response.status){
                this.owners.push({name:this.name});
            }

            }catch(err){
            console.log(err)
            }
           
        } 
    }
    
}
</script>