angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $http) {

  $scope.enviarForm = function(usuarioForm, usuario) {
    if (usuarioForm.$valid) {
      postarAPI(usuario);
    }
  };

  var postarAPI = function(usuario) {
    // Simple GET request example:
    var url = getAPIBaseUrl() + "/inserejson";
    var dados = {
      "dados": usuario,
      "colecao": "Usuarios"
    };
    console.log(dados);

    $http({
      url: url,
      method: 'POST',
      data: dados,
      headers: {
        'content-type': 'application/json'
      }
    });
    
    $scope.buscaAPI();
  };

  $scope.buscaAPI = function() {
    $http.get(getAPIBaseUrl() + '/getDocumentsFromMongo')
      .then(function successCallback(response) {
        $scope.usuarios = response.data;
        console.log(response.data);
      }, function errorCallBack(response) {
        alert(JSON.stringify(response));
      });
  };
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
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

function getAPIBaseUrl() {
  //retorna a url atual do cloud 9. Modificar caso utilize porta ou host diferente.
  return 'http://' + location.hostname; // +  (location.port ? ':'+location.port: '');
}