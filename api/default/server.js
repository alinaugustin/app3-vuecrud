const express =       require('express')
const  path =         require('path')
const  bodyParser =   require('body-parser')
const  cors =         require('cors')
const  mongoose =     require('mongoose')
const  config =       require('./config/db')
//const  config2 =       require('./config/config')
const userRoutes   =  require('./routes/users.route')
// const AuthController = require('./user/AuthController')
// const AuthController = require('./user/AuthController')

mongoose.Promise = global.Promise
mongoose.connect(config.DB, { useNewUrlParser: true } )
mongoose.set('useCreateIndex', true)

const app = express()
app.use(bodyParser.json())
app.use(cors())
app.get('/users', userRoutes)
app.get('/users/:nr', userRoutes)


app.post('/login', userRoutes)
//app.get('/login', userRoutes)

app.post('/register', userRoutes)

var port = process.env.PORT || 4000
app.get('/', (req, res) => {
res.send('api running...')
})
app.listen(port, function(){
  console.log('Node js Express js Tutorial at port', port)
})


module.exports = app
