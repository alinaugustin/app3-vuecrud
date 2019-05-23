<template>
  <div class="hello">
    
    <input type='button' @click='getData()' value='Arata datele'>
    <div >
    <p>Nr: {{ JSON.parse(this.$store.state.user).nr }} </p>
    <p>Utilizator: {{ JSON.parse(this.$store.state.user).username }} </p>
    <p>Email: {{ JSON.parse(this.$store.state.user).email }} </p>
    </div>

      <ul class="nav nav-pills">
      <li><h2><router-link to="dashboard">Dash</router-link></h2></li>

      <li><h2><router-link to="posts">Posts</router-link></h2></li>

      <li><h2><router-link to="savepostpdf">ToPdf</router-link></h2></li>

      <li><h2><router-link to="editpost">Edit post</router-link></h2></li>

      <li><h2><router-link to="listusers">List users</router-link></h2></li>
      <li><h2><router-link to="registeruser">Register users</router-link></h2></li>
      </ul>

  </div>
</template>

<script>

export default {
  name: 'Home',
  data: function () {
    return {
      msg: 'Panoul de control',
      userData: [],
      error: '',
      loading: false
    }
  },
  methods: {
    getData: function () {
      console.log('3: ',this.userData)
      this.userData = this.$store.state.user
      return this.userData
    }
  }
    // created: function () {
    //   console.log('3: ',this.userData)
    //   //console.log('4: ',this.userData))
    //  return JSON.parse(this.userData)
    // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
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
