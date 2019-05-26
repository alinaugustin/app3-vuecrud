<template>
  <div class="hello">

    <!-- <div>
      <p> State: {{ JSON.parse(this.$store.state.user).username }}  </p>
    </div> -->

    <input type='button' @click='hideData()' value='Verifica'>
    {{ (msg.username == userData.username) ? 'OK!' : 'NOT ok' }}
    <div>
    <p>Nr: {{ userData.nr }} </p>
    <p>Utilizator: {{ userData.username }} </p>
    <p>Email: {{ userData.email }} </p>
    </div>
    
    <!-- <div>
    <p>Nr: {{ user.nr }} </p>
    <p>Utilizator: {{ user.username }} </p>
    <p>Email: {{ user.email }} </p>
    </div> -->



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
import axios from 'axios'
export default {
  name: 'Home',
  data: function () {
    return {
      msg: 'Panoul de control',
      userData: [],
      error: '',
      loading: false,
      user: [],
      username: null,
      id: 0,
      token: null
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData: function () {
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('token'),
      this.user = localStorage.getItem('token'),
      //this.token = localStorage.getItem('token'),
      //this._id = JSON.parse(this.user)._id,
      this._id = this.user,
        //axios.get('http://localhost:4000/api/user/' + this._id)
        axios.get('http://localhost:4000/api/user/' + this._id)
        .then(response => {
          this.userData = response.data
          console.log('this.userData: ',this.userData)
          })
         .catch(error => alert('Eroare: ',error))
    },
  hideData: function () {
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('token'),
      //this.user = localStorage.getItem('user'),
      this.token = localStorage.getItem('token')
      //console.log('this.token: ',this.token)
        axios.get('http://localhost:4000/api/token/' + this.token)
        .then(response => {
          this.msg = response.data
          //console.log('this.userData: ',this.userData)
          })
         .catch(error => alert('Eroare: ',error))
    }
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
