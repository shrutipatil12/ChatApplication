
/******************************************************************************
 *  Execution       :cmd> node server.js                      
 *  @description    :chat application
 *  @file           :regService.js
 *  @author         :Shruti
 *  @version        :1.0
 
 ******************************************************************************/
var userModel = require('../model/regModel');


module.exports.register = (data, callback) => {
    try {
        userModel.register(data, (err, result) => {
            if (err) {
                //display the error
                console.log(err);
            }
            else {
                //return the result 
                return callback(null, result);
            }
        })
    }
    catch (err) {
        //handle exception
        callback(err);
    }
}


module.exports.login = (data, callback) => {
    try {
        console.log("service 35");

        userModel.login(data, (err, result) => {
            if (err) {
                //display the error
                console.log(err);
                callback(err);
            }
            else {
                //return the result
                console.log("45 ser", result);

                callback(null, result);
            }
        })
    }
    catch (err) {
        //handle exception
        console.log("service 51");

        // data.send(err);
        callback(err);
    }
}



module.exports.forgetPassword = (data, callback) => {
    try {
        userModel.forgetPassword(data, (err, result) => {
            if (err) {

                //display the error 
                console.log(err);
                callback(err)
            }
            else {

                //return the result of the function
                return callback(null, result);
            }
        })
    }
    catch (err) {
        //handle the exception
        callback(err);
    }

}


module.exports.reset = (data, callback) => {
    try {
        console.log("reset services")
        userModel.reset(data, (err, result) => {
            if (err) {
                //throw an error
                console.log("service error");
                callback(err);
            } else {
                //display the result
                console.log("In service", result);
                callback(null, result);
            }
        })
    } catch (err) {
        //handle the exception
        callback(err);
    }
}


module.exports.allUser = (data, callback) => {
    try {
        userModel.allUser(data, (err, result) => {
            if (err) {
                //throw the error
                callback(err);
            }
            else {
                //return the result
                // console.log(" All available users", result)
                callback(null, result);
            }
        })
    }
    catch (err) {
        //handle the exception
        callback(err);
    }
}

module.exports.getUserMessage = (data, callback) => {
    try {
        // console.log("122:",req.body);
        userModel.getUserMessage(data, (err, result) => {
            if (err) {
                //throw the error
                return callback(err);
            }
            else {
                 //return the result
                //  console.log("result in services",result);
                return callback(null, result);
            }
        })
    }
    catch (err) {
        //handle exception
        console.log("in catch err", err);
        callback(err);
    }
}


module.exports.addMessage = (data, callback) => {
    try {
        console.log("ad service");

        userModel.addMessage(data, (err, result) => {
            if (err) {
                //throw the error
                return callback(err);
            }
            else {
                //return the result
                console.log("result", result);
                return callback(null, result);
            }
        })
    }
    catch (err) {
        //handle exception
        callback(err);
        console.log("err in rs catch", err);

    }
}