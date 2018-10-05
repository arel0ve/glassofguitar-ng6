const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const logger = require('morgan');
const busboy = require('connect-busboy');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const authoRouter = require('./routes/autho');
const regRouter = require('./routes/registr');
const verRouter = require('./routes/verify');
const logoutRouter = require('./routes/logout');

const newSongRouter = require('./routes/new-song');
const saveSongRouter = require('./routes/save-song');

const biographyRouter = require('./routes/biography');
const imageRouter = require('./routes/image');
const pictureSaveRouter = require('./routes/picture-save');

const queryRouter = require('./routes/search-query');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});

const MongoStore = require('connect-mongo')(session);

const app = express();

const corsOptions = {
  origin: 'http://localhost:4200',
  credentials: true
}
app.use(cors(corsOptions));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.set('trust proxy', 1);
app.use(session({
  secret: "balerion-2nd_dc",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: false,
    secure: false
  },
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  })
}));

app.use(function (req, res, next) {
  // res.set('Cache-Control', 'public, max-age=31557600');
  next();
});

app.use(busboy());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/user/', usersRouter);

app.use('/api/registration', regRouter);
app.use('/v', verRouter);
app.use('/a', authoRouter);
app.use('/o', logoutRouter);

app.use('/n', newSongRouter);
app.use('/s', saveSongRouter);

app.use('/b', biographyRouter);
app.use('/i', imageRouter);
app.use('/p', pictureSaveRouter);

app.use('/q', queryRouter);

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
