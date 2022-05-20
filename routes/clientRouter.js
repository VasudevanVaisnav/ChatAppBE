const express = require('express');
const mongoose = require("mongoose");
const router = express.Router();


const register = require("../handlers/register");
const send = require("../handlers/send");

router.post('/register',register);
router.post('/send',send);

module.exports=router
