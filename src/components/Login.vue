<template>
       <div class="col-sm-6">
         <div v-if="errors && errors.length">
        <div v-for="error of errors" v-bind:key='error.id'>
          <div show>{{error.message}}</div>
        </div>
      </div>

    <form class="login" @submit.prevent="login">
    
    <div class="col-sm-6">
    <label>User:</label>
    <input type="email" id="email" autocomplete="email-ul-inregistrat" placeholder="email" v-model="email" required >
    </div>
    <div class="col-sm-6">
    <span>utilizator: {{ email }}</span>
    </div>

    <div class="col-sm-6">
    <label>Pass:</label>
    <input type="password" id="parola " autocomplete="parola-curenta" placeholder="parola-curenta" v-model="password" minlength="4" required>
    </div>
    <div class="col-sm-6">
    <span>parola: {{ password }}</span><br><br>
    </div>

    <div class="col-sm-6">
    <button id="button" class="btn btn-primary" >Trimite</button>
    </div>

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
              .catch(errors => { alert(" Utilizatorul nu exista sau parola nu e corecta! Eroare: " + this.$store.errors)})
          }
        }
      }
      </script>