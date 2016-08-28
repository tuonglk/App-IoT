angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope, $http, $rootScope, $firebaseArray, $firebaseObject) {
  $rootScope.current = {};

  var roomsRef = firebase.database().ref("rooms");
  $rootScope.datas = $firebaseArray(roomsRef);
  console.log($rootScope.datas);

  $scope.changeRoom = function(){
    angular.forEach($rootScope.datas, function(data){
      if($rootScope.current.room == data.room)
      {
        $rootScope.current.ip = data.ip;
      }
    });
  };
})

.controller('LightsCtrl', function($scope, $rootScope, $http, $firebaseArray, $firebaseObject) {

  $scope.$on("$ionicView.beforeEnter", function(event, data){
    $scope.led = {};

      var ref = firebase.database().ref("rooms/"+$rootScope.current.room).child("led");

      var syncObject = $firebaseObject(ref);
      syncObject.$bindTo($scope, $rootScope.current.room);
  });

})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
