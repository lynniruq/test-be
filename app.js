

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const sequelize = require('./db');
var indexRouter = require('./routes/index');
var viewRouter = require('./routes/view');

var indexRouter = require('./routes/index');
const http = require('http');
const cors = require('cors');

var app = express();
app.use(cors());
const server = http.createServer(app);

const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/views', viewRouter);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');



// app.js
// const Answers = require('./models/Answers');
// const Question = require('./models/Questions');


async function initialize() {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');

    // Sync your models with the database
    await sequelize.sync({ alter: true }); // Use alter: true to automatically update tables
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

initialize();





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
