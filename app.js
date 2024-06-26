const express = require('express');
const app = express();
const port = 3000;
const middleware = require('./middleware');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('./database');
const session = require('express-session');

//server
const server = app.listen(port, () => {
  console.log('Server is listening');
});

// pug config
app.set('view engine', 'pug');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: 'mA2L3Y#BxG70',
    resave: true,
    saveUninitialized: false,
  })
);

//Routes
const loginRoute = require('./routes/loginRoutes');
const registerRoute = require('./routes/registerRoutes');

app.use('/login', loginRoute);
app.use('/register', registerRoute);

// request config and middleware
app.get('/', middleware.requireLogin, (req, res, next) => {
  var payload = {
    pageTitle: 'Home',
    userLoggedIn: req.session.user,
  };

  res.status(200).render('home', payload);
});
