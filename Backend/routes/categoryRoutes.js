const express= require('express');
const router = express.Router();
const {getCategory} = require('../controller/categoryController');

router.get("/",getCategory);

module.exports = router;