const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const logger = require('morgan');
const busboy = require('connect-busboy');

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');

const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');

const songRouter = require('./routes/song');
const songsRouter = require('./routes/songs');

const avatarRouter = require('./routes/avatar');

const queryRouter = require('./routes/search-query');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/guitar_v2_0_0', {useNewUrlParser: true});

const MongoStore = require('connect-mongo')(session);

const ws = require('./ws/guitar-stream.ws');

const app = express();

const corsOptions = {
  origin: 'http://localhost:4200',
  credentials: true
};
app.use(cors(corsOptions));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.set('trust proxy', 1);

app.use(busboy());

app.use('/', indexRouter);
app.use('/api/song/', songRouter);
app.use('/api/songs/', songsRouter);
app.use('/api/user/', userRouter);

app.use('/api/login', loginRouter);
app.use('/api/logout', logoutRouter);

app.use('/api/avatar', avatarRouter);

app.use('/api/query', queryRouter);

app.use(function (req, res, next) {
  // res.set('Cache-Control', 'public, max-age=31557600');
  next();
});

app.use(express.static(path.join(__dirname, 'front-ng/dist/')));

app.use('*', indexRouter);


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
  res.sendFile(path.join(__dirname, 'front-ng/dist/index.html'));
  // res.render('error');
});

module.exports = app;
