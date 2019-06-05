
/******************************************************************************
 *  Execution       :cmd> node server.js                      
 *  @description    :chat application
 *  @file           :registerService.js
 *  @author         :Shruti
 *  @version        :1.0
 
 ******************************************************************************/
app.service('serviceRegister',function($http,$location){
    this.registerUser=function(data,$scope){
        console.log("data on service register---",data);
        $http({
            method:'POST',
            url:'http://localhost:3000/register',
            data:data

        }).then(
            function successCallback(response){
                console.log("register successful");
                console.log("21 rs",response);
                $scope.message="register successful";
                $location.path('/login');
            },
            function errorCallback(response){
                console.log("register unsuccessful");
                $scope.message=response.data.message.message;
            }
        );
        }
});