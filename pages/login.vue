<template>
<div class="about-box-main">
    <div class="container">
            <div class="row">
                 <div class="col-lg-2 "></div>
                <div class="col-lg-8 col-sm-12">
                    <div class="contact-form-right">
                        <h2>Sign In</h2>
                     
                        <form action="">
                            <div class="row">
                            <!-- Email -->
                                <div class="col-md-12">
                                    <div clas="form-group why-text">
                                            <br>
                                           <h4>Email</h4>
                                           
                                        <input class="form-control"   v-model="email"  >
                       
                                    </div>
                                </div>
                            <!-- Password -->
                                <div class="col-md-12">
                                    <div clas="form-group why-text">
                                            <br>
                                           <h4>Password</h4>
                                           
                                        <input class="form-control"  type="password"  v-model="password">
                                          <b>
                                     Don't have an account?
                                    <a class="link2" href="/signup">Register an Account</a>
                                    
                                    </b>
                                    <!-- Submit -->
                                    </div>
                                      <br>  
                                    <div class="submit-button text-center">
                                       <a type="button" class="btn hvr-hover" href="#" @click="onLogin" >Login</a>     
                                        <div class="h3 text-center hidden"></div>
                                        <div class="clearfix"></div>
                                    </div>
                                      <div>
                               
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
  auth: "guest",

  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    async onLogin() {
      try {
        await this.$auth.loginWith("local", {
          data: {
            email: this.email,
            password: this.password
          }
        });
        //this.$router.push("/");
          await this.$router.go("/")
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>