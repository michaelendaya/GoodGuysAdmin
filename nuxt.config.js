const URL = 'http://localhost:3000'
export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  
  head: {
    title: 'GoodRides by Goodguys',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
     



      { rel: 'stylesheet', href: '../css/bootstrap.min.css' },
      { rel: 'stylesheet', href: '../css/bootstrap.css' },
      { rel: 'stylesheet', href: '../css/style.css' },
      { rel: 'stylesheet', href: '../css/responsive.css' },
      { rel: 'stylesheet', href: '../css/custom.css' },
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.15.1/css/all.css' },
 
 
    ],
    script: [
  

       {src: 'https://code.jquery.com/jquery-3.2.1.min.js'},
      {src: 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/2.5.3/umd/popper.min.js'},
      {src: 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js'},
//{src: '../js/bootsnav.js.'},
    //  {src: '../js/jquery.superslides.min.js'},
    //  {src: '../js/bootstrap-select.js'},
    //  {src: '../js/inewsticker.js'},
   
     // {src: '../js/images-loded.min.js'},
    //  {src: '../js/isotope.min.js'},
     // {src: '../js/owl.carousel.min.js'},
     // {src: '../js/baguetteBox.min.js'},
     // {src: '../js/form-validator.min.js'},
   //   {src: '../js/contact-form-script.js'},
    //  {src: '../js/custom.js'}
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/auth',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    proxy:true,
    baseURL:URL
  },
  
  proxy:{
    "/api":URL
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  },

   auth:{
    strategies: {
      local: {
        endpoints: {
          login: {
           url:'/api/auth/admin/login',   propertyName: "token" 
          },
          logout:true
        }
      }
    }
   },

  server: {
    port: 8000 // default: 3000
  }
}
