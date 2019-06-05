
/******************************************************************************
 *  Execution       :cmd> node server.js                      
 *  @description    :chat application
 *  @file           :regController.js
 *  @author         :Shruti
 *  @version        :1.0
 
 ******************************************************************************/
var userService = require('../service/regService');
var middleEmail = require('../middleWare/sendM');
var jwt = require('jsonwebtoken');
var middleToken = require('../middleWare/token')

module.exports.login = (req, res) => {
  try {
    console.log("ctrl 17");
    userService.login(req.body, (err, data) => {
      console.log("ctrl 38", req.body);

      if (err) {
        console.log(err)
        console.log("ctrl 41");

        return res.status(500).send({ message: err })
      } else {
        console.log("data in controller: ", data);

        var token = jwt.sign({ email: req.body.email, id: " data[0]._id " }, 'secret', { expiresIn: 86400000 });
        console.log('fdtyg', token)
        return res.status(200).send({
          message: data,
          "token": token
        });


      }
    })

  }
  catch (err) {
    //handle exception
    console.log("ctrl 61");

    res.send(err);
  }

}




module.exports.register = (req, res) => {
  try {
    console.log("in register controller")

    // res.send(req.body)
    userService.register(req.body, (err, result) => {
      var response = {};
     // console.log("60 rc",req.body);
      
      if (err) {
        //send status as false to show error
        response.success = false;
        response.err = err;
        res.status(400).send(response);
      }
      else {
        //send status as true for successful result
        response.success = true;
        response.result = result;
        res.status(200).send(response);
      }
    })
  }
  catch (err) {
    //handle exception
    req.send(err);
  }
}

module.exports.forgetPassword = (req, res) => {
  //req.checkBody("email","not valid ").isEmail();
  // var err=req.validationError();
  try {
    userService.forgetPassword(req, (err, result) => {


      var response = {};
      console.log("forget paswd")
      if (err) {
        //send status as false to show error
        response.success = false;
        response.err = err;
        res.status(400).send(response);

      }
      else {
        //send status as true for successful result
        response.success = true;
        response.result = result;
        //res.status(200).send(response);
        console.log("resr", response)
        const payload = {
          _id: response.result._id
        }
        console.log("uuuuuuu", payload._id)
        console.log("ppppppp", payload)
        //call the function to create a token
        const resObj = middleToken.generateNewToken(payload);
        console.log("Obj", resObj);
        //url for reset password with the generated token
        const url = `http://localhost:3000/#!/reset/${resObj.token}`;
        console.log("url", url)
        //call sendMail function
        middleEmail.mail(url);
        res.status(200).send(url);
      }

    })
  }
  catch (err) {
    //handle exception
    req.send(err);
  }
}


module.exports.reset = (req, res) => {
  try {
    var responseResult = {};
    console.log('ctrl reset');
    userService.reset(req, (err, result) => {
      if (err) {
        //send status as false to show error
        console.log("ctrl if reset ")
        responseResult.success = false;
        responseResult.error = err;
        res.status(500).send(responseResult)
      }
      else {
        //send status as true for successful result
        console.log('in user ctrl else');
        responseResult.success = true;
        responseResult.result = result;
        res.status(200).send(responseResult);
      }
    })
  } catch (err) {
    //handle exception
    req.send(err);
  }
}

module.exports.allUser = (req, res) => {
  try {
    var responseResult = {};
    console.log("In all user ctrl");
    userService.allUser(req, (err, result) => {
      if (err) {
        //send status as false to show error
        responseResult.success = false;
        responseResult.error = err;
        res.status(400).send(responseResult);
      }
      else {
        //send status as true for successful result
        responseResult.success = true;
        responseResult.result = result;
        res.status(200).send(responseResult);
      }
    })
  } catch (err) {
    //handle exception
    req.send(err);
  }
}



module.exports.getUserMessage = (req, res) => {
  try {
    //   console.log("177:",req);
    userService.getUserMessage(req, (err, result) => {


      var response = {};
      if (err) {
        response.success = false;
        response.err = err;
        res.status(500).send(response);
      }
      else {
        response.success = true;
        response.result = result;
        res.status(200).send(response);
      }
    })
  }
  catch (err) {
    req.send(err);
    console.log(err);

  }
}

module.exports.addMessage = (res, callback) => {
  try {
    console.log(" reg request");
    var response = {};
    userService.addMessage(res, (err, result) => {
      console.log("ctrl 205:", res);

      if (err) {
        // response.success=false;
        // response.err=err;
        // res.status(400).send(response);
        // console.log("error in controller");
        return callback(err);
      } else {
        // result.response=true;
        // response.result=result;
        // //res.status(200).send(response);

        console.log("controller is working fine rc 243");
        return callback(null, result);
      }
    })
  }

  catch (err) {
    console.log("Error in sending message!");
    callback(err)

  }
}
