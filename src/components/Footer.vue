<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <ul>
    <li><h2><router-link to="login">Login</router-link></h2></li>
    <li><h2><router-link to="listusers">List users</router-link></h2></li>
    </ul>

  </div>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
      msg: 'Footer',
      href: '/footer'
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
