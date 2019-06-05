
/******************************************************************************
 *  Execution       :cmd> node server.js                      
 *  @description    :chat application
 *  @file           :chatController.js
 *  @author         :Shruti
 *  @version        :1.0
 
 ******************************************************************************/

app.controller('chatController', function ($scope, SocketService, $state, chatService) {
    $scope.message = '';
    $scope.allUserArr = [];
    $scope.currUserName = localStorage.getItem('name');
    $scope.currUser = localStorage.getItem('userid');
    $scope.token=localStorage.getItem('token')
   
    var token = $scope.token
    console.log(token);
    if (token === null) {//if the tocken is null then go to login page
        $state.go('login');
    }
    try {
        SocketService.on('newMessageSingle', (message) => {
            //listening to the evnts
            console.log("in cc 16");
            
            if (localStorage.getItem('userid') == message.senderId || (localStorage.getItem('userid') == message.receiverId && localStorage.getItem('ruserId') == message.senderId)) {
                if ($scope.allUserArr === undefined) {
                    $scope.allUserArr = message;//assighning message to variable
                } else {
                    $scope.allUserArr.push(message);
                    console.log("arr", $scope.allUserArr);
                    
                }
            }
        })
    }
    catch (err) {
        console.log("error in finding message")
    }
    $scope.allUser = function () {
        console.log("get all users token inside "+token);
        chatService.allUser($scope, token);
    }
    $scope.allUser();
    $scope.person = function (userData) {//select person from list
        $scope.allUserArr = '';

        localStorage.setItem('rusername', userData.firstname);//getting data from localstorage
        localStorage.setItem('ruserId', userData._id);
        $scope.receiverUserName = localStorage.getItem('rusername');
        $scope.getUserMessage();
    }
    //get all message
    $scope.getUserMessage = function () {
        console.log(" user msg called");
        chatService.getUserMessage($scope);
    }             
    //$scope.getUserMsg();
    try {
        $scope.sendmessage = function () {//send message function
            var msg = {
                'senderId': localStorage.getItem('userid'),
           
                'receiverId': localStorage.getItem('ruserId'),
                
                'message': $scope.message
            };
            $scope.message = '';
            SocketService.emit('createMessage', msg);//emitting the message to the browser
        }
    }
    catch (err) {
        //handle the exception 
        console.log("error in sending message to the reciever")
    }

    try {
        $scope.logout = function () {
            localStorage.clear();
            $state.go('login')//return back to login page//change  /login
        }
    }
    catch (err) {
        //handle the exception
        console.log("error in logging out")
    }
});