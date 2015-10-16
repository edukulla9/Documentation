
			var angularApp = angular.module('apiApp', []);
			angularApp.controller('apiController', function ($scope, $http, $httpParamSerializerJQLike) {
				$scope.imageURL = "";
				$scope.pageClass='register';
				$scope.showCharts=false;
				$scope.showSpeakingMessage=false;
				
$scope.register = function(username, password, email) {
   console.log("inside login function");
$http({
    method: 'POST',
    url : 'https://api.mongolab.com/api/1/databases/studentcorner/collections/users?apiKey=NP3nZD4FE3MR_8D5i1mgwxvnTac7BLr7',
    data: JSON.stringify({
                name: username,
                password: password,
                email: email
            }),
    contentType: "application/json"
}).success(function() {
    $scope.userName ="";
    $scope.password ="";
    $scope.email ="";
    
    $scope.msg ="User created successfully";
        })
}
				
				$scope.RenderChart=function(){
					$scope.showCharts=true;
					$scope.showSpeakingMessage=false;
					$scope.imageURL="https://chart.googleapis.com/chart?chs="+$scope.chartWidth+"x"+$scope.chartHeight+"&chd=t:"+$scope.chartData+"&cht=p3&chl="+$scope.chartSliceLabels;	
				};
				$scope.TextToSpeaK=function(){
					$scope.showCharts=false;
					$scope.showSpeakingMessage=true;
					var textToSpeak = $scope.textToSpeak;
					textToSpeak = textToSpeak.indexOf(' ') >=0 ? textToSpeak.replace(/\s+/g, 
			
			'+') : textToSpeak;
					var audio = new Audio();
					audio.src ='http://translate.google.com/translate_tts?ie=utf-8&tl=en&q='+textToSpeak;;
					audio.play();
				};
				}
			);