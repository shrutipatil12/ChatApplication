
/******************************************************************************
 *  Execution       :cmd> node server.js                      
 *  @description    :chat application
 *  @file           :controlLogin.js
 *  @author         :Shruti
 *  @version        :1.0
 
 ******************************************************************************/
app.controller('controlLogin',function($scope,serviceLogin){
    $scope.login=function(){
        var data={
            'email':$scope.email,
            'password':$scope.password
        }
        console.log("data",data)
       
        serviceLogin.login(data,$scope);
       
    }
    
   
});