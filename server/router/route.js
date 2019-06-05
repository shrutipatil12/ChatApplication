
/******************************************************************************
 *  Execution       :cmd> node server.js                      
 *  @description    :chat application
 *  @file           :route.js
 *  @author         :Shruti
 *  @version        :1.0

 ******************************************************************************/
var express = require('express');
var userCtrl = require('../controller/regController')

var router = express.Router();
var verify = require('../authentication/tokenVerify')

console.log("router");

//login API
router.post('/login', userCtrl.login);

//registeration API
router.post('/register', userCtrl.register);

//reset password API
router.post('/reset/:token', verify.checkToken, userCtrl.reset);

//router.verify=require('../authentication/tokenVerify')
const authentication = require('./authentication');
router.use('/authentication', authentication);

//forget password API
router.post('/forget', userCtrl.forgetPassword);

//displaying all registered user API
router.post('/allUser', userCtrl.allUser);

//to get all users message API
router.post('/getUserMessage',userCtrl.getUserMessage);

//API to add message into the database
router.post('/addMessage',userCtrl.addMessage)
module.exports = router;