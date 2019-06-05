
/******************************************************************************
 *  Execution       :cmd> node server.js                      
 *  @description    :chat application
 *  @file           :regModel.js
 *  @author         :Shruti
 *  @version        :1.0

 ******************************************************************************/
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
/**
* @description    : create schema
*/
var mongooseSchema = mongoose.Schema;
var userData = mongooseSchema({
    "firstname": {
        type: String,
        // required: [true, "firstname is require"]
    },
    "email": {
        type: String,
        // required: [true, "email is require"]
    },
    "password": {
        type: String,
        // required: [true, "password is require"]
    }
});


var user = mongoose.model('user', userData);

function hashing(password) {
    var hash = bcrypt.hashSync(password, 10)
    return hash;
}
module.exports.register = (req, callback) => {
    try {
       // console.log('inside model', req);

        /**
        * @description: check the email address and if already present throw error
       */
        user.findOne({ 'email': req.email }, function (err, data) {
            console.log("47 rm",req.password);
            
            if (err) {
                console.log(err);
                return callback(err)

            }
            else if (data != null) {
                console.log("sss", err)
                console.log('Email id exist');
                callback(err)

            } else {


                /**
                 * @description: if email address is not present save the registered user details
                */

               // console.log("66 rm", req)

                //     console.log("69 : ",errorPassword);
                //     console.log("70 : ",resultPassword);
                req.password = hashing(req.password)
                console.log("register firstnm 69",req.firstname)
                const newUser = new user(
                    {
                        "firstname": req.firstname,
                        "email": req.email,
                        "password": req.password
                    })
                 console.log("register firstnm",req.firstname)
                newUser.save(function (err, data) {
                    if (err) {
                        return callback(err);
                    } else {
                        console.log('inside saved');

                        console.log("84 rm", data)
                        return callback(null, data);
                    }
                });

            }
        })

    }
    catch (err) {
        res.send(err);
    }
}

module.exports.login = (res, callback) => {
    try {
        console.log("model 106", res);
        /**
         * @description: check the email address and if already present throw error
        */
        user.findOne({ "email": res.email }, function (err, result) {
            if (err) {
                console.log(err);
                return callback(err)
            }
            else if (result != null) {
                console.log("result after finding data: ", result);

                /**
                 * @description: compare the database password with the user entered password
                */
                bcrypt.compare(res.password, result.password, function (err, res) {
                    console.log("resu...", res)
                    if (err) {
                        console.log("error in model: ", err);

                        callback(err)
                    }
                    else {
                        //show result if data is correct
                        console.log("Login successfully");
                        callback(null, result);
                    }

                })
            }
            else {
                //else print the error message
                console.log("Enter correct data")
                callback(err);
            }


        })
    }
    catch (err) {
        //handle exception
        res.send(err);
    }
}




module.exports.forgetPassword = (res, callback) => {
    try {
        //check the email address 
        user.findOne({ "email": res.body.email }, function (err, result) {
            if (err) {
                console.log(err);
            }
            else {
                //check the registered email address with the email address entered while forget password
                if (result !== null && res.body.email == result.email) {
                    //console.log("ur name"+res.name);
                    callback(null, result)

                }
                else {
                    callback("incorrect Email");
                }

            }
        })
    }
    catch (err) {
        //handle exception
        res.send(err);
    }
}




module.exports.reset = (res, callback) => {
    try {
        //generate a hash password for new password
        let newPassword = hashing(res.body.password)
        console.log("new pswd", newPassword);
        console.log(JSON.stringify(res.decoded))
        // update the new password in place of old password
        user.updateOne({ '_id': res.decoded.payload._id }, { 'password': newPassword }, (err, data) => {
            if (err) {
                console.log("err in reset model", err);
                callback(err)
            }
            else {
                console.log("fine")
                callback(null, data);
            }
        });
    }
    catch (err) {
        //handle exception
        console.log("error in catch")
        res.send(err);
    }
}

module.exports.allUser = (res, callback) => {
    try {
        //find the all the users in database
        user.find({}, (err, data) => {
            if (err) {
                console.log(err, "error is there")
                return callback(err);
            }
            else {
                //return the result
                return callback(null, data)
            }
        })
    }
    catch (err) {
        //handle exception
        res.send(err);
    }
}
/**
 * @description:create schema for sender emailId, receiver enailID,and message 
*/
var chatSchema = new mongooseSchema({
    "senderId": {
        type: String,
        // required: [true, "Sender id is require enter sender email id"]
    },

    "receiverId": {
        type: String,
        // required: [true, "Receiver id is require enter receiver email id"]
    },

    "message": {
        type: String,
        // required: [true, "Enter any message"]
    }

});
var chat = mongoose.model('chatDatabase', chatSchema);


module.exports.addMessage = (res, callback) => {
    try {
        console.log(' rm  257', res.senderId)

        const newMsg = new chat({
            "senderId": res.senderId,
            "receiverId": res.receiverId,
            "message": res.message
        });
        console.log("new Msg in model==>", newMsg);
        /**
     * @description: save the message into the database
    */
        newMsg.save((err, result) => {
            if (err) {
                console.log("Fail to store message", err);
                return callback(err);
            } else {
                console.log("message saved in database");
                return callback(null, result);
            }
        });
    }

    catch (err) {
        console.log("result not found", err);
        //  res.send(err)
    }
}


module.exports.getUserMessage = (res, callback) => {
    try {
        //console.log("279:",res.body);
        /**
         * @description: find the all user messages and display it
        */
        chat.find({}, (err, result) => {
            if (err) {
                return callback(err);

            }
            else {
                return callback(null, result);
            }

        })
    }
    catch (err) {
        console.log("err c", err);

        res.send(err);
    }
}