/******************************************************************************
 *  Execution       :cmd> node server.js                      
 *  @description    :chat application
 *  @file           :controlForotPassword.js
 *  @author         :Shruti
 *  @version        :1.0
 
 ******************************************************************************/

app.controller('controlForgotPassword', function ($scope, serviceForgotPassword) {
    console.log("ctrl forget pswd")
    $scope.forgotPassword = function () {
        var user = {
            'email': $scope.email
        }
        console.log("forget password ", user);
        serviceForgotPassword.forgotPassword(user, $scope);

    }
});