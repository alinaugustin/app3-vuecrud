<template>

<div class="container">
<div class="row">
  <div class="col-md-9 col-md-offset-3">
    <div class="well well-sm">

    <form class="login" @submit.prevent="login">
    
    <div class="form-group">
    <label>User:</label>
    <input type="email" id="email" autocomplete="email-ul-inregistrat" placeholder="email" v-model="email" required >  
    </div>
    <span>utilizator: {{ email }}</span><br>

    <div class="form-group">
    <label>Pass:</label>
    <input type="password" id="parola " autocomplete="parola-curenta" placeholder="parola-curenta" v-model="password" minlength="4" required>
    <br>
    <span>parola: {{ password }}</span><br><br>
    </div>

    <button id="button" class="btn btn-primary" >Trimite</button>
    <br>

    </form>

        <div v-if="errors && errors.length">
        <div v-for="error of errors" v-bind:key='error.id'>
          <div show>{{error}}</div>
        </div>
      </div>

       </div>
  </div>
</div>
</div>
      </template>
      <script>
      export default {
        data() {
          return {
            email: "",
            password: "",
            errors: ""
          }
        },
        methods: {
          login: function() {
            let email = this.email;
            let password = this.password;
            this.$store
              //.dispatch('auth_error', errors)
              .dispatch("login", { email, password })
              .then(() => this.$router.push("/dashboard"))
              .catch(errors => { alert(" Err: " + errors + ". Eroare: " + this.$store.errors)})
            }
        }
      }
      </script>


  <style scoped>
  .form-group, .container {
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
      