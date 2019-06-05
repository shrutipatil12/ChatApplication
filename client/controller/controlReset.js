
/******************************************************************************
 *  Execution       :cmd> node server.js                      
 *  @description    :chat application
 *  @file           :controlReset.js
 *  @author         :Shruti
 *  @version        :1.0
 
 ******************************************************************************/
app.controller('controlReset',function($scope,serviceResetPassword){
    console.log("ctrl reset pswd")
    $scope.resetPassword=function(){
        var user ={
            'password':$scope.password
        }
        console.log("register calling",user);
        serviceResetPassword.resetPassword(user,$scope);
    }
    
});


