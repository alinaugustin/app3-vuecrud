<template>
  <div>
    
    <div class="panel">
      
    <form>
    <span>Alegerea implicita in aplicatie este: "Da"</span><br><br>
    <label>Alegeti Da sau Nu:</label>
        <select v-model="selected">
            <option v-for="option in options" :key='option.text'>  {{ option.text }} </option>
        </select>
    <br><br>
    
    <span>Ati ales: {{ selected }}</span>
    <br><br><br>
    
    <label>Argumentati:</label>
    <textarea  type="textarea" rows="15" cols="80" placeholder="argumente" v-model="args"></textarea>
    <br><br>
    <span>Argumentele date: {{ args }}</span>
    <br><br>

    <br>
    <button id="button" class="btn btn-primary" v-on:click.prevent="insertOpt">Save</button>
    <br>

    </form>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Editpost',
  data () {
    return {
        msg: 'Argumentare Page',
        selected: 'Da',
        options: [
          { text: 'Da', values: 'da' },
          { text: 'Nu', values: 'nu' }
        ],
        argumente: 'nimic',
        args: "nimic",
        showit: true,
        updatedata: {
          'optiuni': "Da",
          'args': '',
          'token': ''
        },
        dateprimite: {}
    }
  },
  methods: {
    insertOpt: function () {
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
      // this.args.push(this.argumente)
      // console.log(this.argumente) // => 'not updated'
      this.updatedata.optiuni = this.selected,
      this.updatedata.args = this.args,
      this.updatedata.token = localStorage.getItem('token'),
      //console.log(this.updatedata)
      axios.post('http://localhost:4000/apiargs/insertargsopts/', this.updatedata).then((response) => {
                 this.dateprimite = response.data.ok,
                 alert('response: ' + this.dateprimite)
                 this.$router.push({name: 'Editpost'})
                })
              .catch(error => alert('Eroare: ' + error + ' !!'))
    },
    allRecordShow: function () {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
        //console.log('token_vue2:',localStorage.getItem('token'))
        //var token = localStorage.getItem('token')
        axios.get('http://localhost:4000/apiargs/argsopts')
        .then(response => {
          if(response === null) {
            alert("Nu ati introdus nimic!")
          } else {
          this.args[0] = response.data[0].argum
          this.options.text = response.data[0].optiuni
          alert('arg: ' + this.args + ' options: ' + this.options) 
          }
          //console.log('length_method of data:',this.maxlocal)
          })
         .catch(error => alert('Eroare: ' + error + ' Nu este nimic in baza!'))
        // return this.items,
        //console.log("items from axios:", this.items)
        },
        myFunction: function () {
          document.getElementById("panel").style.display = "block";
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
.panel {
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

.notshown {
  display: none;
}

</style>