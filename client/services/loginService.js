
/******************************************************************************
 *  Execution       :cmd> node server.js                      
 *  @description    :chat application
 *  @file           :loginService.js
 *  @author         :Shruti
 *  @version        :1.0
 
 ******************************************************************************/
app.service('serviceLogin',function($http,$location){
    this.login=function(data,$scope){
        console.log("data on service register---",data);
        $http({
            method:'POST',
            url:'http://localhost:3000/login',
            data:data,
        }).then(
            function successCallback(response){
                console.log("login successful at servicelogin in client side");
                console.log('response',response)
                console.log('response1',response.data.message._id)
                var userid=response.data.message._id ;
                var name=response.data.message.firstname;
               var token=response.data.token;
               console.log("15 ls",userid);
                localStorage.setItem("userid",userid);
                localStorage.setItem("name",name);
                localStorage.setItem("token",token);    
              $location.path("/chatDashboard");
            },
            function errorCallback(response){
                console.log("Login unsuccessful please check your username and password");
                console.log(response);
                $scope.loginMessage="EmailId or Password Incorrect";
            }
        );
    }
});
