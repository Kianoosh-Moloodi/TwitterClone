const express = require('express');
const app = express();
const router = express.Router();

// pug config
app.set('view engine', 'pug');
app.set('views', 'views');

// request config and middleware
router.get('/', (req, res, next) => {
  res.status(200).render('login');
});

module.exports = router;
