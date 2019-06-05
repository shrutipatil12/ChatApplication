
/******************************************************************************
 *  Execution       :cmd> node server.js                      
 *  @description    :chat application
 *  @file           :controlRegister.js
 *  @author         :Shruti
 *  @version        :1.0
 
 ******************************************************************************/
app.controller('controlRegister',function($scope,serviceRegister){
    console.log("rtfrey",serviceRegister)
    console.log("register calling")
    $scope.register=function(){
        var user={
            'firstname':$scope.firstname,
            'email':$scope.email,
            'password':$scope.password
        }
        console.log("register calling",user);
   
    serviceRegister.registerUser(user,$scope);
    }
});