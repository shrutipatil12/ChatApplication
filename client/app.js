var app=angular.module('chatApp',['ui.router','btford.socket-io']);
app.config(function($stateProvider,$urlRouterProvider){
    $stateProvider.state('Register',{
        url:'/register',
        templateUrl:'templates/registration.html',
        controller:'controlRegister'
    })
    $stateProvider.state('login',{
        url:'/login',
        templateUrl:'templates/login.html',
        controller:'controlLogin'
    })
    $stateProvider.state('forget',{
        url:'/forget',
        templateUrl:'templates/forgotPassword.html',
        controller:'controlForgotPassword'
    })

    $stateProvider.state('reset',{
        url:'/reset/:token',
        templateUrl:'templates/resetPassword.html',
        controller:'controlReset'
    })

    $stateProvider.state('chatDashboard',{
        url:'/chatDashboard',
        templateUrl:'templates/chatDashboard.html',
        controller:'chatController'
    })

    

$urlRouterProvider.otherwise('/login');

});

app.service('SocketService', ['socketFactory', function SocketService(socketFactory) {
    return socketFactory({
        ioSocket: io.connect('http://localhost:3000') 
    });
}]);
app.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);