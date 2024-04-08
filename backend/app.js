if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require("cors");
const morgan = require('morgan');

const categoryRouter = require('./routes/categories')
const itemRouter = require('./routes/trees')

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose.set('strictQuery', false);
mongoose
  .connect(
    db,
    { useNewUrlParser: true, useUnifiedTopology: true}
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

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

// middleware & static files
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

// Method Override
app.use(methodOverride('_method'))

// Routes
app.use('/categories', categoryRouter)
app.use('/trees', itemRouter)

const PORT = process.env.PORT || 7000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));