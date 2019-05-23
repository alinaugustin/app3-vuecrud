<template>
  <div class="hello">

    <!-- <ul>
    <li><h2><router-link to="login">Login</router-link></h2></li>
    <li><h2><router-link to="editpost">Edit post</router-link></h2></li>
    <li><h2><router-link to="listusers">List users</router-link></h2></li>
    <li><h2><router-link to="registeruser">Register users</router-link></h2></li>

    </ul> -->

    <p>Azi: {{ dateTime }} </p>

    <div v-if="errors && errors.length">
        <div v-for="error of errors" v-bind:key='error.id'>
          <div show>{{error.message}}</div>
        </div>
      </div>

    <form @submit="sendLogin">
    <label>User:</label>
    <input type="email" id="email" autocomplete="email-ul-inregistrat" placeholder="email" v-model="users.email" required >
    <br>


    <span>utilizator: {{ users.email }}</span><br><br>

    <label>Pass:</label>
    <input type="password" id="parola " autocomplete="parola-curenta" placeholder="parola-curenta" v-model="users.password" minlength="4" required>
    <br>

    <span>parola: {{ users.password }}</span><br><br>

    <button id="button" class="btn btn-primary" >Trimite</button>
    <br>



    </form>



    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Login',
  props: {
  credentials: {
    type: String,
  }
  },
  data () {
    return {
        msg: 'Login Page',
        users: {},
        items: [],
        errors: []
    }
    },
    methods: {
        pushUsers: function () {
            this.users.push(this.users)
            this.message = "Ati introdus: " + this.users.username + " parola: " + this.users.password
            alert(this.message)
            // //Vue.set(this.data, this.users, this.newUser),
            // //this.$set(this.$data, 'users', this.newUser),
            // localStorage.setItem('varStorage', JSON.stringify(this.users)),
            // console.log("example1.users:",example1.users),
            // console.log("localStorage:",localStorage),
            // this.newUser = '',
            // this.newPass = '',
            // //localStorage.clear()
            // //console.log(localStorage),
        axios
        .get('http://localhost:4000/users')
        .then(response => (this.items = response.data))
        console.log("response from axios:", this.items)
        },
        sendLogin (evt) {
          evt.preventDefault()
          //console.log('this.users:',this.users)
          axios.post(`http://localhost:4000/login`, this.users)
          .then(response => {
          localStorage.setItem('jwtToken', response.data.token)
          //console.log("response.data._id:",response.data.userid)
          //localStorage.setItem('userid',JSON.stringify(response.data.userid))
          this.$router.push({ name: 'Listusers'})
          })
        .catch(err => {
          console.log('err1:',err)
          this.errors.push(err)
        })
        },
      register () {
        this.$router.push({
        name: 'Registeruser'
        })
      }
    },
 computed: {
  dateTime() {
            var today = new Date()
            var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
            var dateTime = date + ' ' + time
            // console.log(dateTime)
            return dateTime
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
