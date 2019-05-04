<template>
  <div class="hello">

    <!-- <ul>
    <li><h2><router-link to="login">Login</router-link></h2></li>
    <li><h2><router-link to="editpost">Edit post</router-link></h2></li>
    <li><h2><router-link to="listusers">List users</router-link></h2></li>
    <li><h2><router-link to="registeruser">Register users</router-link></h2></li>

    </ul> -->

    <p>Azi: {{ dateTime }} </p>

     <form class="login" @submit.prevent="register">

    <label>Nr:</label>
    <input type="string" placeholder="numar user" v-model="nr" >
    <br>
    <span>numar utilizator: {{ nr }}</span><br>

    <label>Username:</label>
    <input type="text" placeholder="utilizator" v-model="username" >
    <br>
    <span>utilizator: {{ username }}</span><br>

    <label>Email:</label>
    <input type="email" placeholder="email" v-model="email" >
    <br>
    <span>e-mail: {{ email }}</span><br>

    <label>Pass:</label>
    <input type="password" placeholder="parola" v-model="password" >
    <br>
    <span>parola: {{ password }}</span><br>
    <label>Repeta Pass:</label>
    <input type="password" placeholder="repeta parola" v-model="passwordconf" >
    <br>
    <span>parola: {{ passwordconf }}</span><br>

    <button id="button" class="btn btn-primary" >Register</button>
    <br>

    </form>

    </div>
</template>

<script>
export default {
  data() {
    return {
        msg: 'Registeruser',
        errors: '',
        email: '',
        nr: 0,
        password: '',
        username: '',
        passwordconf: ''
    }
  },
    methods: {
          register: function() {
            let nr = this.nr
            // console.log('nr si tip :',nr + typeof(nr))
            let username = this.username
            let email = this.email
            let password = this.password
            let passwordconf = this.passwordconf
            //evt.preventDefault()
            //this.items.push(this.newUser)
            if(nr <= 0) {
              return alert('Trebuie sa introduceti un numar mai mare de 0!')
            }
            if(password !== passwordconf) {
              return alert('Trebuie sa introduceti aceeasi parola!')
            }
            // //Vue.set(this.data, this.items, this.newUser),
            // //this.$set(this.$data, 'items', this.newUser),
            // localStorage.setItem('varStorage', JSON.stringify(this.items)),
            // console.log("example1.items:",example1.items),
            // console.log("localStorage:",localStorage),
            // this.newUser = '',
            // this.newPass = '',
            // //localStorage.clear()
            // //console.log(localStorage),
        // console.log('this.items',this.items)
            this.$store
              .dispatch("register", { nr, username, email, password })
              .then(() => this.$router.push("/"))
              // .catch(errors => console.log(errors))
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
