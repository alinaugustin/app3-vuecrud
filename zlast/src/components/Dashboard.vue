<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h3>{{ error }}</h3>

    <div v-if="user">
    <p>Nr: {{ user.nr }} </p>
    <p>Utilizator: {{ user.username }} </p>
    <p>Email: {{ user.email }} </p>
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
import { mapGetters } from 'vuex'
export default {
  name: 'Home',
  data () {
    return {
      msg: 'Panoul de control',
      user: [],
      error: '',
      loading: false
    }
  },
  // created: function() {
  //   this.gedata()
  // },
   methods: {
       getdata: function() {
           this.user = JSON.parse(this.$store.state.user)
           console.log(user)
           return this.user
     }
  },
  created: function() {
  this.getdata()
  }
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
