var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require("express-session");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var homeRouter = require('./routes/home');
var logoutRouter = require('./routes/logout');
var actionRouter = require('./routes/action');

var app = express();

app.use(session({ 
	secret: 'secret',
	cookie:{ 
		maxAge: 1000*60*30
	}
}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(function(req,res,next){ 
	res.locals.user = req.session.user;
	var err = req.session.error;
	delete req.session.error;
	res.locals.message = "";
	if(err){ 
		res.locals.message = '<div class="alert alert-danger" style="margin-bottom:20px;color:red;">'+err+'</div>';
	}
	next();
});
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter); // 即为为路径 /login 设置路由
app.use('/home', homeRouter); // 即为为路径 /home 设置路由
app.use("/logout", logoutRouter); // 即为为路径 /logout 设置路由
app.use("/action", actionRouter); // 即为为路径 /logout 设置路由

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
