<template>
    

     <!-- Start Main Top -->
    <header class="main-header">
        <!-- Start Navigation -->
        <nav class="navbar navbar-expand-lg navbar-light bg-light navbar-default bootsnav">
            <div class="container">
                <!-- Start Header Navigation -->
                <div class="navbar-header">
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-menu" aria-controls="navbars-rs-food" aria-expanded="false" aria-label="Toggle navigation">
                    <i class="fa fa-bars"></i>
                </button>
                    <nuxt-link to="/" class="navbar-brand" ><img src="https://i.imgur.com/D6DXiAa.png" width="150px" height="150px" class="logo" alt=""></nuxt-link>
                </div>
                <!-- End Header Navigation -->

                <!-- Collect the nav links, forms, and other content for toggling -->
				<div class="collapse navbar-collapse" id="navbar-menu">
					<ul class="nav navbar-nav ml-auto" data-in="fadeInDown" data-out="fadeOutUp">
						<li class="nav-item"><nuxt-link to="/" class="nav-link" >Home</nuxt-link></li>
						<li class="nav-item"><nuxt-link to="/orders" class="nav-link" >Orders</nuxt-link></li>
						<li class="nav-item"><a class="nav-link" href="about.html">Go To Client</a></li>
	
                      
                        <template v-if="$auth.$state.loggedIn">
                            <li class="dropdown">
							<a href="#" class="nav-link dropdown-toggle " data-toggle="dropdown"> My Account <i class="fas fa-user"/> </a>
							<ul class="dropdown-menu">
                                <li><a href="/profile">{{$auth.$state.user.name}}</a></li>
								<li><a href="shop.html">Orders</a></li>
								<li><a href="shop-detail.html">Address</a></li>
								<li><a href="cart.html">Account Settings</a></li>
                                <li><a href="#" @click="onLogout">Logout</a></li>
							</ul>
                        </li>
                        </template>
                        <template v-else>
                        <li class="nav-item "><a class="nav-link" href="/login">Log In</a></li>
                        </template>
                      
                    </ul>
                </div>
                <!-- /.navbar-collapse -->

            </div>
    
        </nav>
        <!-- End Navigation -->
    </header>
    <!-- End Main Top -->
</template>
<script>
export default {
    methods:{
        async onLogout(){
            await this.$auth.logout();
             this.$router.push("/login")
        }
    }
}
</script>