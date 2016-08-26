angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope, $http, $rootScope) {
  $rootScope.current = {};

  $scope.chooseServer = function(server){
    $rootScope.current.server = server;
    $http.get('http://'+server+':3000/api/rooms').success(function(data, status, headers, config) {
        $rootScope.datas = data;
    })
    .error(function(data, status,headers,config) {
    });
  };

  $scope.changeRoom = function(){
    angular.forEach($rootScope.datas, function(data){
      if($rootScope.current.room == data.room)
      {
        $rootScope.current.ip = data.ip;
        console.log($rootScope.current);
      }
    });
  };
})

.controller('LightsCtrl', function($scope, $rootScope, $http) {
  $scope.led = {};

  $scope.haveChange = function(){
    console.log($scope.led.led1);
    $http.get('http://'+$rootScope.current.server+':3000/api/'+$rootScope.current.room+'/led1')
    .success(function(data, status, headers, config) {
        console.log(data);
    })
    .error(function(data, status,headers,config) {
    });
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
