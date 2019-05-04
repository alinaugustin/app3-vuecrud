<template>
  <div class="container">
        <div class="card">
            <div class="card-header">
                <h3>Edit users</h3>
            </div>
            <div class="card-body">
                <form v-on:submit.prevent="updateusers" v-for='item in items' v-bind:key='item.nr'>
                  <div class="form-group">
                        <label>nr: {{ item.nr }} </label><br>date noi
                        <input type="text" class="form-control" v-model="users.nr" />
                    </div>
                    <br>
                    <div class="form-group">
                        <label>user name: {{ item.username }} </label><br>date noi
                        <input type="text" class="form-control" v-model="users.username" />
                    </div>
                    <br>
                    <div class="form-group">
                        <label>users email: {{ item.email }} </label><br>date noi
                        <input type="email" class="form-control" v-model="users.email" />
                    </div>
                    <br>
                    <div class="form-group">
                        <input type="submit" class="btn btn-primary" value="Update users"/>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default{
        data(){
            return{
                users: {},
                items: []
            }
        },
        created: function(){
            this.getitems();
        },
        methods: {
            getitems()  {
              //alert('this.$route.params.id :' + this.$route.params.id)
              let uri = 'http://localhost:4000/api/users/' + this.$route.params.id
                axios.get(uri).then((response) => {
                    this.items = response.data
                    //console.log('items: ', this.items)
                    //alert('response: ' + response.data)
                })
                .catch(error => alert('Eroare: ' + error + ' nu se afla in baza de date!'))
            },
            updateusers() {
              //console.log(this.users)
              let uri = 'http://localhost:4000/api/users/update/' + this.$route.params.id
                axios.post(uri, this.users).then((response) => {
                  this.users = response.data,
                  this.$router.push({name: 'Listusers'})
                })
              .catch(error => alert('Eroare: ' + error + ' !'))
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