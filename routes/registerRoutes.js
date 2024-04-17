const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const User = require('../schemas/UserSchema');

// pug config
app.set('view engine', 'pug');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));

// request config and middleware
router.get('/', (req, res, next) => {
  res.status(200).render('register');
});

router.post('/', async (req, res, next) => {
  var firstName = req.body.firstName.trim();
  var lastName = req.body.lastName.trim();
  var username = req.body.username.trim();
  var email = req.body.email.trim();
  var password = req.body.password;

  var payload = req.body;

  if (firstName && lastName && username && email && password) {
    var user = await User.findOne({
      $or: [{ username: username }, { email: email }],
    }).catch((err) => {
      console.log(err);
      payload.errorMessage = 'Something went wrong!';
      return res.status(200).render('register', payload);
    });

    if (user == null) {
      // No user found, proceed to create the user
      payload.password = await bcrypt.hash(password, 10);
      User.create(req.body).then((user) => {
        req.session.user = user;
        return res.redirect('/');
      });
    } else {
      payload.errorMessage =
        email === user.email
          ? 'Email already in use!'
          : 'Username already in use!';
      return res.status(200).render('register', payload);
    }
  } else {
    payload.errorMessage = 'Make sure each field has a valid value!';
    return res.status(200).render('register', payload);
  }
});

module.exports = router;
