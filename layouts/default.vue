<template>
  <div>
    <Navbar />
     <Titlebox/>
    <Nuxt />
  </div>
</template>


<script>
import Navbar from "~/components/Navbar"
import Titlebox from "~/components/Titlebox"
export default {
  components:{
    Navbar,
    Titlebox
  }
}
</script>
