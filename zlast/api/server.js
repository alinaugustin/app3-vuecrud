const express =       require('express')
//const  path =         require('path')
const  bodyParser =   require('body-parser')
const  cors =         require('cors')
const  mongoose =     require('mongoose')
//const jwt = require('jsonwebtoken')
const  config =       require('./config/config')
//const configbcr = require('./config/config')
//const  config2 =       require('./config/config')
const userRoutes    =   require('./routes/users.route')
const argsRoutes    =   require('./routes/argsopts.route')
const verifyToken = require('./config/verifyToken')
// const AuthController = require('./user/AuthController')
// const AuthController = require('./user/AuthController')
//protect routes



mongoose.Promise = global.Promise
mongoose.connect(config.DB, { useNewUrlParser: true } )
mongoose.set('useCreateIndex', true)

const app = express()
//protect routes
//app.set('Secret', config.secret)
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
app.use(cors())
//app.get('/users', userRoutes)
//app.get('/users/:nr', userRoutes)


app.post('/login', userRoutes)
//app.get('/login', userRoutes)

app.post('/register', userRoutes)


//protect routes
//const  userRoutes = express.Router()
//app.use(cors({allowedHeaders: 'Authorization', origin: 'http://localhost:8080'}));

app.use('/api',  userRoutes)
//users
app.get('/api/users',  userRoutes)
app.post('/api/users/me',  userRoutes)
app.get('/api/users/:nr',  userRoutes)
app.get('/api/users/delete/:nr', verifyToken, userRoutes)
//editusers and update
app.post('/api/users/update/:nr', verifyToken, userRoutes)
app.get('/api/edit/:username', verifyToken, userRoutes)
//arguments and options routes
app.use('/apiargs', verifyToken, argsRoutes)
app.get('/apiargs/argsopts', verifyToken, argsRoutes)
app.post('/apiargs/insertargsopts', verifyToken, argsRoutes)

var port = process.env.PORT || 4000
app.get('/', (req, res) => {
res.send('api running...')
})
app.listen(port, function() {
  // eslint-disable-next-line no-console
  console.log('Node js Express js Tutorial at port', port)
  //alert('Node js Express js Tutorial at port', port)
})


module.exports = app
