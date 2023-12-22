const express = require("express");
const router = express.Router();
const resetHS_CTLS = require("../controllers/resetHS_CTL");

router.post("/", resetHS_CTLS.resetHS);

module.exports = router;
