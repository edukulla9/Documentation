var app=angular.module("myApp", []);


app.controller("RegisterCtrl", function($scope, $http, $httpParamSerializerJQLike, $window) {
    prompt("in here1");
    // https://api.mongolab.com/api/1/databases/studentcorner/collections/users?apiKey=NP3nZD4FE3MR_8D5i1mgwxvnTac7BLr7

    
    $scope.changeEmail = function(uname, pword, newemail) {
        
        $http({
            method: 'GET',
            url: 'https://api.mongolab.com/api/1/databases/studentcorner/collections/users?q={"name":"'+uname+'"}&f={"_id":1}&fo=true&apiKey=NP3nZD4FE3MR_8D5i1mgwxvnTac7BLr7'
        })
        .success(function(dat) {
            
                $http({
                    method: 'PUT',
                    url: 'https://api.mongolab.com/api/1/databases/studentcorner/collections/users?q={"name":"'+uname+'"}&apiKey=NP3nZD4FE3MR_8D5i1mgwxvnTac7BLr7',
                    data: JSON.stringify({ "$set" : { "email": newemail } }),
                    contentType: 'Application/json'
                })
                .success(function() {
                    $scope.displayEMsg = "Email changed";
                })
                .error(function() {
                    alert('Failed to update email');
                });
        })
        .error(function() {
            alert('Failed to find existing info for ' + uname);
        });
        
    };
    
    
});

app.controller("loginCtrl", function ($scope, $http, $httpParamSerializerJQLike, $window){

    $scope.loginUser = function(uname, pword) {
        console.log("RegisterCtrl: loginUser: Entered with: " + uname + ", " + pword);
        $http({
            method: 'GET',
            url : 'https://api.mongolab.com/api/1/databases/studentcorner/collections/users?q={"name":"'+uname+'"}&f={"password":1}&fo=true&apiKey=NP3nZD4FE3MR_8D5i1mgwxvnTac7BLr7'
        })
        .success(function(data) {
            if (data.password == pword) {
                $window.location.href = "/index.html";
            } else {
                alert("Invalid password");
            }
        })
        .error(function() {
            alert('Failed to authenticate user '+uname);
        });
        console.log("RegisterCtrl: loginUser: Finished");
    };
});

app.controller("chgPasswordCtrl", function ($scope, $http, $httpParamSerializerJQLike){

    $scope.changePword = function(uname, oldpass, newpass, newpass2) {
        
        if (newpass != newpass2) {
            
            alert('New passwords do not match');
            return;
        }
        $http({
            method: 'GET',
            url: 'https://api.mongolab.com/api/1/databases/studentcorner/collections/users?q={"name":"'+uname+'"}&f={"password":1}&fo=true&apiKey=NP3nZD4FE3MR_8D5i1mgwxvnTac7BLr7'
        })
        .success(function(dat) {
            if (dat.password == oldpass) {
                $http({
                    method: 'PUT',
                    url: 'https://api.mongolab.com/api/1/databases/studentcorner/collections/users?q={"name":"'+uname+'"}&apiKey=NP3nZD4FE3MR_8D5i1mgwxvnTac7BLr7',
                    data: JSON.stringify({ "$set" : { "password": newpass } }),
                    contentType: 'Application/json'
                })
                .success(function() {
                    $scope.displayMsg = "Password changed";
                    alert($scope.displayMsg);
                })
                .error(function() {
                    alert('Failed to update password');
                });
                        
            } else {
                
                alert('Old password is invalid');
            }
        })
        .error(function() {
            alert('Failed to authenticate existing info for ' + uname);
        });
        
    };

});
app.controller("rmUserController", function ($scope, $http, $httpParamSerializerJQLike){
    
    $scope.removeAcc = function(uname, pword) {
        
        $http({
            method: 'GET',
            url : 'https://api.mongolab.com/api/1/databases/studentcorner/collections/users?q={"name":"'+uname+'"}&f={"password":1,"_id":1}&fo=true&apiKey=NP3nZD4FE3MR_8D5i1mgwxvnTac7BLr7'
        })
        .success(function(data) {
            
            if (data.password == pword) {
                
                $http({
                    method: 'DELETE',
                    url: 'https://api.mongolab.com/api/1/databases/studentcorner/collections/users/'+data._id.$oid+'?apiKey=NP3nZD4FE3MR_8D5i1mgwxvnTac7BLr7',
                    async: true
                })
                .success(function() {
                    $scope.displayRMsg = "User "+uname+" has been removed";
                    alert("User "+uname+" has been removed");
                    $scope.uname="";
                    $scope.pword="";
                })
                .error(function() {
                    alert("Failed to remove user");
                });
            } else {
                alert("Invalid password");
            }
        })
        .error(function() {
            alert('Failed to find user '+uname);
        });
    };
});

app.controller("RegisterController", function ($scope, $http, $httpParamSerializerJQLike) {
    
    $scope.pageClass = 'register';
    $scope.register = function(userName, password, email) {
    console.log("inside register function");
    $http({
        method: 'POST',
        url : 'https://api.mongolab.com/api/1/databases/studentcorner/collections/users?apiKey=NP3nZD4FE3MR_8D5i1mgwxvnTac7BLr7',
        data: JSON.stringify({
                    name: userName,
                    password: password,
                    email: email
                }),
        contentType: "application/json"
    }).success(function() {    
        alert("User Registered Successfully");
        $scope.userName ="";
        $scope.password ="";
        $scope.email ="";
        
        
            })
    }; 
});

