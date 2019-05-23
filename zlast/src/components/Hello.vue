<template>
  <div class="hello">




    <h1>{{ msg }}</h1>
    <!-- <ul class="nav nav-pills">
      <li><h2><router-link to="dashboard">Dash</router-link></h2></li>

      <li><h2><router-link to="posts">Posts</router-link></h2></li>

      <li><h2><router-link to="savepostpdf">ToPdf</router-link></h2></li>

      <li><h2><router-link to="editpost">Edit post</router-link></h2></li>

      <li><h2><router-link to="listusers">List users</router-link></h2></li>
      <li><h2><router-link to="registeruser">Register users</router-link></h2></li>
      </ul> -->

  <h2><router-link to="dashboard">Dashboard</router-link></h2>

  </div>
</template>

<script>
export default {
  name: 'hello',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

</style>