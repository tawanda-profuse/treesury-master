if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const mongoose = require('mongoose');
const session = require('express-session');

const indexRouter = require('./routes/index')
const categoryRouter = require('./routes/categories')
const itemRouter = require('./routes/trees')

// Public Folder
app.use("/public", express.static('public')); 
app.use(express.static('public'))

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true, useUnifiedTopology: true}
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')

// Excluding the layouts from the web pages
app.set('layout landing', false); 
app.set('layout index', false); 

// Express body parser
app.use(bodyParser.urlencoded({
  limit: '50mb',
  // parameterLimit: 100000,
  extended: false 
}));
// Testing

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Method Override
app.use(methodOverride('_method'))

// Routes
app.use('/', indexRouter)
app.use('/categories', categoryRouter)
app.use('/trees', itemRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));