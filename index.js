const express = require('express')
const app = express()
const path = require('path')
const logger = require('./middleware/logger')
const exphbs = require('express-handlebars')
const members = require('./members')

//Init middleware
//app.use(logger)

//Handlebars middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

//Body Parser Middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))


//Homepage Route
app.get('/', (req,res) => 
res.render('index', {
    title: 'Member App',
    members
})
)

// Set static folder
app.use(express.static(path.join(__dirname, 'public')))

// Members API Routes 
app.use('/api/members', require('./routes/api/members'))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {console.log(`server sarted on port ${PORT}`)})