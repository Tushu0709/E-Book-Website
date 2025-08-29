const express = require("express");
const router = express.Router();
const { getStore } = require("../controller/bookStoreController");
router.get("/", getStore);

module.exports = router;
