<template>
  <div class="listusers">

    <!-- <ul>
    <li><h2><router-link to="login">Login</router-link></h2></li>
    <li><h2><router-link to="editpost">Edit post</router-link></h2></li>
    <li><h2><router-link to="listusers">List users</router-link></h2></li>
    <li><h2><router-link to="registeruser">Register</router-link></h2></li>
    </ul> -->

    <p>Azi: {{ dateTime }} </p>

    <!-- Select All records -->
    <input type='button' @click='allRecords()' value='Arata tot'>
    <br><br>

     <!-- Select record by ID -->
    <input type='text' v-model='userid' placeholder="Enter username ">
    <input type='button' @click='recordByID()' value='Selecteaza user by utilizator'>
    <br><br>


    <table border='1' class='center' allign="center" v-if='items.length'>
    <tr>
      <td>Nr.</td>
      <td>UserName</td>
      <td>Email</td>
      <td>Editeaza</td>
      <td>Sterge</td>
    </tr>

    <tr v-for='item in items' v-bind:key='item.nr'>
      <td>{{ item.nr }}</td>
      <td>{{ item.username }}</td>
      <td>{{ item.email }}</td>
      <td><router-link :to="{name: 'Editusers', params: { id: item.nr }}" class="btn btn-primary">Edit</router-link></td>
      <td><button class="btn btn-danger"  v-on:click="deleteItem(item.nr)">Delete</button></td>
    </tr>

  </table>

  <table border='1' class='center' v-if='seconds.length'>
    <tr>
      <td>Nr.</td>
      <td>UserName</td>
      <td>Email</td>
      <td>Editeaza</td>
      <td>Sterge</td>
    </tr>

    <tr v-for='second in seconds' v-bind:key='second.nr' >
      <td>{{ second.nr }}</td>
      <td>{{ second.username }}</td>
      <td>{{ second.email }}</td>
      <td><router-link :to="{name: 'Editusers', params: { id: second.nr }}" class="btn btn-primary">Edit</router-link></td>
      <td><button class="btn btn-danger"  v-on:click="deleteItemsec(second.nr)">Delete</button></td>
    </tr>
</table>

    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Listusers',
  data () {
      return {
        msg: 'List users',
        items: [],
        userid: '',
        seconds: [],
        maxlengt: 0,
        maxlocal: 0
      }
    },
    created () {
    this.allRecords()
    },
    methods: {
        allRecords: function () {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
        //console.log('token_vue2:',localStorage.getItem('token'))
        //var token = localStorage.getItem('token')
        axios.get('https://api3-alindebian.herokuapp.com/api/users')
        .then(response => {
          this.items = response.data,
          this.maxlengt = response.data.length,
          //console.log('length_method of data:',this.maxlocal)
          this.userid = '',
          this.seconds = []
          })
         .catch(error => alert('Eroare: ',error))
        // return this.items,
        //console.log("items from axios:", this.items)
        },
        recordByID: function () {
          // console.log('this.value', this.userid)
            let username = this.userid
            //console.log('nr: ',username)
            if(username.length == '') { alert('trebuie sa introduceti date valide!') }
            else {
            this.items = []
            axios.get('https://api3-alindebian.herokuapp.com/api/edit/' + username)
            .then(response => {
              this.seconds = response.data})
            .catch(error => alert('Eroare: ' + error + ' nu se afla in baza de date!'))
            //console.log(this.seconds)
            }
          //this.userid = 0,
          //this.items = []
          },
        logout: function() {
          //localStorage.setItem('jwtToken', '')
          localStorage.removeItem('jwtToken')
          localStorage.removeItem('userid')
          this.$router.push({ name: 'Login' })
        },
        deleteItem(nr)  {
              //console.log(this.items)
              this.items.splice(nr-1, 1)
              let uri = 'https://api3-alindebian.herokuapp.com/api/users/delete/' + nr
              axios.get(uri).then(response => {alert('Mesaj: ' + response.data.message)})
        },
        deleteItemsec(nr)  {
              let uri = 'https://api3-alindebian.herokuapp.com/api/users/delete/' + nr
              axios.get(uri).then(response => {
                //id = response.data.id,
                //console.log('id: ', response.data.id)
                alert('Mesaj: ' + response.data.message)
                function thisnumber(element) {
                  return element == nr
                }
                this.seconds.splice(this.seconds.findIndex(thisnumber), 1)
                
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
 table.center {
    margin-left:auto;
    margin-right:auto;
  }
</style>