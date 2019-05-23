<template>
  <div class="container">
  <div class="row">
  <div class="col-md-9 col-md-offset-3">
  <div class="well well-sm">

    <!-- <ul>
    <li><h2><router-link to="login">Login</router-link></h2></li>
    <li><h2><router-link to="editpost">Edit post</router-link></h2></li>
    <li><h2><router-link to="listusers">List users</router-link></h2></li>
    <li><h2><router-link to="registeruser">Register users</router-link></h2></li>

    </ul> -->

    <p>Azi: {{ dateTime }} </p>

    <form class="login" @submit.prevent="register">

    <div class="form-group">
    <label class="col-md-9 control-label">Nr:</label>
    <div class="col-md-9">
    <input type="number" placeholder="numar user" autocomplete="nr" v-model="nr" >
    </div>
    <span>numar utilizator: {{ nr }}</span><br>
    </div><br>

    <div class="form-group">
    <label class="col-md-9 control-label">Username:</label>
    <div class="col-md-9">
    <input type="text" placeholder="utilizator" autocomplete="utilizator" v-model="username" >
    </div>
    <span>utilizator: {{ username }}</span><br>
    </div><br>

    <div class="form-group">
    <label class="col-md-9 control-label">Email:</label>
    <div class="col-md-9">
    <input type="email" placeholder="email" autocomplete="email" v-model="email" >
    </div>
    <span>e-mail: {{ email }}</span><br>
    </div><br>


    <div class="form-group">
    <label class="col-md-9 control-label">Pass:</label>
    <div class="col-md-9">
    <input type="password" placeholder="parola" autocomplete="parola" v-model="password" >
    </div>
    <span>parola: {{ password }}</span><br>
    </div><br>

    <div class="form-group">
    <label class="col-md-9 control-label">Repeta Pass:</label>
    <div class="col-md-9">
    <input type="password" placeholder="repeta parola" autocomplete="repeta parola" v-model="passwordconf" >
    </div>
    <span>parola: {{ passwordconf }}</span><br>
    </div><br>

    <div class="form-group">
    <button id="button" class="btn btn-primary" >Register</button>
    </div>

    </form>

</div>
</div>
</div>
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
.form-group {
  font-size: 16px;
  padding: 10px;
  text-align: center;
  background-color: rgb(134, 152, 204);
  color: rgb(0, 2, 8);
  border: solid 1px #a6d8a8;
  margin: auto;
  height: 50%;
  width: 50%;
}
</style>
