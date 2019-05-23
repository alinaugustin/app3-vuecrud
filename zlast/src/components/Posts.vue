<template>
<div class="container">
    <div class="row">
    <div class="col-md-9 col-md-offset-3">
    <div class="well well-sm">

  <input v-model="search" class="form-control" placeholder="Filter users by nume or nr" v-on:keyup.enter="sortBy(search)">
  <p> {{ search }} </p>

<div class="form-group" >
  <table class="table table-striped" align="center" border="1">
    <thead>
      <tr >
        <th @click="sort('username')">Name</th>
        <th @click="sort('nr')">nr</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="user in sortedUsers" v-bind:key="user.id">
        <td>{{ user.username }}</td>
        <td>{{ user.nr }}</td>
      </tr>
    </tbody>
  </table>
</div>



  <div class="form-group">
    <label>Userame</label>
    <input type="text" class="form-control" v-model="newUser.username" >
  </div>


  <div class="form-group">
    <label>nr</label>
    <input type="text" class="form-control" v-model="newUser.nr" >
  </div>
  <button type="submit" class="btn btn-primary" v-on:click="addUser">Add</button>

</div>

</div>
</div>
</div>
</template>

<script>
// import axios from 'axios'
export default {
  name: 'Posts',
  data () {
      return {
    sortKey: '',

    reverse: false,

    search: '',

    columns: ['username', 'nr'],

    newUser: {},

    users: [],

    currentSort:'username',
    currentSortDir:'asc'
  }
  },
    methods: {

    addUser: function() {
      this.users.push(this.newUser)
      this.newUser = {}
    },

    sort:function(s) {
    //if s == current sort, reverse
    if(s === this.currentSort) {
      this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
    }
    this.currentSort = s;
    }
  },
  computed:{
  sortedUsers:function() {
    return this.users.sort((a,b) => {
      let modifier = 1;
      if(this.currentSortDir === 'desc') modifier = -1;
      if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
      if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
      return 0;
    });
  }
},
created:function() {
    fetch('http://localhost:4000/api/users')
    .then(res => res.json())
    .then(res => {
      this.users = res;
    })
  }
}
</script>



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
  color: #f0ec10;
  font-size: 16px;
}
 table.center {
    margin-left:auto;
    margin-right:auto;
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