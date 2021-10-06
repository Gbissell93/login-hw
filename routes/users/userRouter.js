var express = require('express');
const { createUser } = require('../controller/userController');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
 res.json("connected!")
});

router.post("/create-user", createUser)


module.exports = router;
