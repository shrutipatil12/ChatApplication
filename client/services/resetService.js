
/******************************************************************************
 *  Execution       :cmd> node server.js                      
 *  @description    :chat application
 *  @file           :resetService.js
 *  @author         :Shruti
 *  @version        :1.0
 
 ******************************************************************************/
app.service('serviceResetPassword',function($http,$location){

    this.resetPassword=function(data,$scope){
    console.log(" service register reset",data);
    $http({
    method:'POST',
    url:'http://localhost:3000/reset/:token',
    data:data
    }).then(

    function successCallback(response){
    console.log("reset password successful");
    console.log(response);
    $scope.message="reset password successful";
    $location.path('/login');
    },

    function errorCallback(response){
    consolde.log("reset password unsuccessful");
    $scope.message=response.data.message.message;
    }
    )
    }
    });