<template>
       <div>
         <div v-if="errors && errors.length">
        <div v-for="error of errors" v-bind:key='error.id'>
          <div show>{{error.message}}</div>
        </div>
      </div>

     <form class="login" @submit.prevent="login">
    <label>User:</label>
    <input type="email" id="email" autocomplete="email-ul-inregistrat" placeholder="email" v-model="email" required >
    <br>
    <span>utilizator: {{ email }}</span><br><br>

    <label>Pass:</label>
    <input type="password" id="parola " autocomplete="parola-curenta" placeholder="parola-curenta" v-model="password" minlength="4" required>
    <br>
    <span>parola: {{ password }}</span><br><br>

    <button id="button" class="btn btn-primary" >Trimite</button>
    <br>

    </form>

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
              .dispatch("login", { email, password })
              .then(() => this.$router.push("/"))
              // .catch(errors => console.log(errors))
          }
        }
      }
      </script>