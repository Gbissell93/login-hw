var express = require('express');
const { createUser, login } = require('../controller/userController');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
 res.json("connected!")
});

router.post("/create-user", createUser)

router.post("/login", login)


module.exports = router;
