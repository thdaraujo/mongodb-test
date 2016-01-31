angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $http) {
  //adicionar as funcoes do form aqui!
  $scope.enviarForm = function(usuario) {
   if(!usuario.nome || !usuario.email || !usuario.senha){
     alert("Preencha os campos");
   }
   else{
   postarAPI(usuario);
   };
  };
  
  var postarAPI = function(usuario){
        // Simple GET request example:
        var url = "http://deletar-thdaraujo.c9users.io/inserejson";
        var dados = {
          "dados": {
            "nome": usuario.nome,
            "email": usuario.email,
            "senha": usuario.senha,
            "nascimento": usuario.nascimento,
            "sexo": usuario.sexo
          },
          "colecao": "Usuarios"
        };
        
        var urlTeste = JSON.stringify(dados);
        console.log(urlTeste);
        $http({
          url: url,
          method: 'POST',
          data: dados,
          headers: { 'content-type' : 'application/json' } 
        });
    };
    $scope.buscaAPI = function(){
        // Simple GET request example:
      $http.get('http://deletar-thdaraujo.c9users.io/getDocumentsFromMongo')
      .then(function successCallback(response){
        $scope.data = response.data;
        console.log(response);
      },function errorCallBack(response){
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

