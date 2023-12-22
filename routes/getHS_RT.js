const express = require("express");
const router = express.Router();

const getHS_CTLS = require("../controllers/getHS_CTL");

router.get("/", getHS_CTLS.get10);

module.exports = router;
