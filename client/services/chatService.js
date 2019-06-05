
/******************************************************************************
 *  Execution       :cmd> node server.js                      
 *  @description    :chat application
 *  @file           :chatServices.js
 *  @author         :Shruti
 *  @version        :1.0
 
 ******************************************************************************/
app.service('chatService', function ($http) {
    try {
        this.allUser = function ($scope, usertoken) {
            console.log("get all users called in service chat")
             var usertoken = localStorage.getItem('token');
            $http({
                method: 'POST',//assigning value to http proprties 
                url: 'http://localhost:3000/allUser',//changes here...
                headers: {
                     token: usertoken,
                }
            }).then(
                function successCallback(response) {//call back function of http sevice
                    console.log("chat service get all users it returns some response")
                    console.log("ds 15:",response.data)
                    $scope.allUser = response.data.result;



                },
                function errorCallback(response) {
                    console.log("register Unsuccessfull ");
                    console.log(response);
                }
            );
        }
    }
    catch (err) {
        console.log("error found here in getting users")
    }
 
        this.getUserMessage = function ($scope) {
            try {
            console.log("get user msg is called")
            var arr = [];
            var usertoken = localStorage.getItem('token');
            $http({
                method: 'POST',//assigning value to http proprties 
                url: 'http://localhost:3000/getUserMessage',//assigning value to http proprties 
                headers: {
                      'token': usertoken,
                }
            }).then(
                function successCallback(response) {
                    console.log("get user msg returns something")
                    console.log(response.data);

                    for (let i = 0; i < (response.data.result.length); i++) {  //(response.data.message).length *change was done
                        var a = response.data.result[i];
                        console.log("a is print is values" + a)
                        if (((localStorage.getItem('userid') == a.senderId) &&
                            (localStorage.getItem('ruserId') == a.receiverId)) ||
                            ((localStorage.getItem('userid') == a.receiverId &&
                                localStorage.getItem('ruserId') == a.senderId))) {


                            console.log("local user is ", localStorage.getItem('userid'), "a user is ", a.senderId, " local rcvrid is ", localStorage.getItem('ruserId'), "  reciver is ", a.receiverId);

                            arr.push(a);//pushing all message to array
                            console.log("after if loop" + arr)
                        }
                    }

                    $scope.allUserArr = arr;

                    console.log("Users msg successfull ", arr);

                },
                function errorCallback(response) {
                    console.log("Unsuccessfull ");
                    console.log(response);

                }
            );
        }
    
    catch (err) {
        console.log(" error in getting message")
    }
        }
})