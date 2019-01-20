const https = require('https')
const fs = require('fs')
var path = require('path');
var cookieParser = require('cookie-parser');
var createError = require('http-errors');
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var ejs = require('ejs');
var engine = require('ejs-mate');
var passport = require('passport');
var session = require('express-session'); //USE TO STORE THE session in memnory but wil vanish on restarting the server
var cookieParser = require('cookie-parser');
var MongoStore = require('connect-mongo')(session);
var flash = require('express-flash');
// var cookieSession = require('cookie-session');
var passportConfig = require('./config/passport');

const port = 8080
var app = express();

var secret = require('./config/secret');


mongoose.Promise = global.Promise;

mongoose.connect(secret.database, { useNewUrlParser: true });

var db = mongoose.connection;

//check connection
db.once('open', function () {
    console.log('Connected to Mongo DB');
});



//Middlewares
app.use(express.static(__dirname + '/public'));
app.engine('ejs', engine);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'abc123',
    store: new MongoStore({ url: secret.database, autoReconnect: true }),
    cookie: { secure: true }
}));




app.use(passport.initialize());
app.use(passport.session());


app.use(flash());
app.use(function (req, res, next) {
    res.locals.user = req.user;
    next();
});

require('./routes/main')(app);
require('./routes/user')(app);
require('./routes/teacher')(app);
require('./routes/payment')(app);







// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};

//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
// });


const httpsOptions = {
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem')
}
const server = https.createServer(httpsOptions, app).listen(port, () => {
    console.log('server running at ' + port)
})

// module.exports = app;