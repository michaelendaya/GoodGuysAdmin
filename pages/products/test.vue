<template>
  <div id="app">
    <vue-editor v-model="content"></vue-editor>
  </div>
</template>
 
<script>

 
export default {
  
 
  data() {
    return {
      content: "<h1>Some initial content</h1>"
    };
  }
};
</script>