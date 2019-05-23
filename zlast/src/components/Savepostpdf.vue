<template>
  <div>
    <button @click="downloadWithCSS">Download PDF WITH CSS</button>
    <br>
    <br>
    
    <div ref="content">
    <form>
    
    <div class="form-group">  
    <span>Alegerea implicita in aplicatie este: "Da"</span><br><br>
    <label>Alegeti Da sau Nu:</label>
        <select v-model="selected">
            <option v-for="option in options" :key='option.text'>  {{ option.text }} </option>
        </select>
    </div>
    
    <div class="form-group">
    <span>Ati ales: {{ options.text }}</span>
    </div>
    
    <div class="form-group">
    <label>Argumentati:</label>
    <textarea  type="textarea" rows="15" cols="80" placeholder="argumente" v-model="args"></textarea>
    </div>

    <div class="form-group">
    <span>Argumentele date: {{ args }}</span>
    </div>

    <br>
    <button id="button" class="btn btn-primary" v-on:click.prevent="updateOpt">Save</button>
    <br>

    </form>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import jsPDF from "jspdf";
import html2canvas from "html2canvas"
export default {
  name: "Savepostpdf",
  props: {
    msg: String
  },
  data () {
    return {
        selected: 'Da',
        options: [
          { text: 'Da', values: 'da' },
          { text: 'Nu', values: 'nu' }
        ],
        argumente: 'nimic',
        args: [],
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
    downloadWithCSS() {
    var canvasElement = document.createElement('canvas');
    html2canvas(this.$refs.content, { canvas: canvasElement }).then(function (canvas) {
    var imgWidth = 210; 
    var pageHeight = 295;  
    var imgHeight = canvas.height * imgWidth / canvas.width;
    var heightLeft = imgHeight;
    const imgData = canvas.toDataURL("image/png")

    var doc = new jsPDF('p', 'mm');
    var position = 0;

    doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      doc.addPage();
      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    doc.save( 'file.pdf');
    })
    },
    updateOpt: function () {
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
      // this.args.push(this.argumente)
      // console.log(this.argumente) // => 'not updated'
      this.updatedata.optiuni = this.selected,
      this.updatedata.args = this.args,
      this.updatedata.token = localStorage.getItem('token'),
      //console.log(this.updatedata)
      axios.post('http://localhost:4000/apiargs/insertargsopts/', this.updatedata).then((response) => {
                 this.dateprimite = response.data,
                 alert('response: ' + this.dateprimite)
                 this.$router.push({name: 'Editpost'})
                })
              .catch(error => alert('Eroare: ' + error + ' !!'))
    },
    allRecordGet: function () {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
        //console.log('token_vue2:',localStorage.getItem('token'))
        //var token = localStorage.getItem('token')
        axios.get('http://localhost:4000/apiargs/argsopts')
        .then(response => {
          if(response === null) {
            alert("Nu ati introdus nimic!")
          } else {
          this.args = response.data[0].argum
          console.log('this.args[0]: ',this.args)
          this.options.text = response.data[0].optiuni
          console.log('this.options.text: ',this.options.text)
          alert('arg: ' + this.args + ' options: ' + this.options.text) 
          }
          //console.log('length_method of data:',this.maxlocal)
          })
         .catch(error => alert('Eroare: ' + error + ' Nu este nimic in baza!'))
        // return this.items,
        //console.log("items from axios:", this.items)
        }
  },
  created: function() {
    this.allRecordGet()
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 3px 3px 3px;
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
  font-size: 10px;
  padding:3px;
  text-align: center;
  background-color: rgb(134, 152, 204);
  color: rgb(0, 2, 8);
  border: solid 1px #a6d8a8;
  margin:2px auto;
  height: 75%;
  width: 75%;
}

textarea {
  margin:10px 10px;
  padding:2px;
  
  line-height:10px;
  height: 100%;
  width:75%;
  display:block;
  margin:2px auto;    
}
</style>
