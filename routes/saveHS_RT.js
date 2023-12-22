const express = require("express");
const router = express.Router();
const saveHS_CTLS = require("../controllers/saveHS_CTL");

router.post("/", saveHS_CTLS.saveSC);

module.exports = router;
