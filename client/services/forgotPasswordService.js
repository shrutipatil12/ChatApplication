
/******************************************************************************
 *  Execution       :cmd> node server.js                      
 *  @description    :chat application
 *  @file           :forgotPasswordService.js
 *  @author         :Shruti
 *  @version        :1.0
 
 ******************************************************************************/
app.service('serviceForgotPassword',function($http,$location){
    this.forgotPassword=function(data,$scope){
        $http({
            method:'POST',
            url:'http://localhost:3000/forget',
            data:data,
        }).then(
            function successCallback(response){
                console.log("Forgot password successful");
                var userid=response.data.message[0]._id ;
                var name=response.datamessage[0].firstName;
                var token=response.data.token;
                localStorage.setItem("userid",userid);
                localStorage.setItem("name",name);
                localStorage.setItem("token",token);   
                $scope.loginMessage="login Successful"  ;     
            
            },
            function errorCallback(response){
                console.log("register unsuccessful");
                console.log(response);
                $scope.loginMessage="EmailId Incorrect";
            }
        );
    }
});

