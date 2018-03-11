app.controller('restablecerClaveCtrl', function($scope, 
  $state, 
  $templateCache, $q, 
  $rootScope, 
  UserService, 
  $ionicLoading,
  LoginService,
  $localStorage, $http,
  $sessionStorage, $filter) {
	      $scope.usuario = {};
        $scope.password = {};
        $scope.parseJson = {};
        $scope.userForm = {}; 
  // function to submit the form after all validation has occurred      
  $scope.submitForm = function(isValid) {

    // check to make sure the form is completely valid
    if (isValid) { 
     $scope.restablecerClave();
    }

  };
  //******************Crear Usuario

 $scope.restablecerClave = function(){ 
   
 console.log("Recibiendo **data User -> : " +$scope.usuario.value);
 console.log("Recibiendo **data password-> : " +$scope.password.value);
  //Llamada loginManual
$http({
  method: 'POST',
  url: 'http://www.altavistaweb.com.ve/banight-api/public/api/v1/logusuario',
  headers: 
   { 'content-type': 'multipart/form-data' },
  params: 
   { usuario: $scope.usuario.value,
     password: $scope.password.value
    }
  }).success(function(response) {

        console.log("Recibiendo **data -> : " +response);
        $scope.parseJson = response; 
        console.log("RESPUESTA DEL API: " +  $scope.parseJson[0].SUCCESS);                           
         if($scope.parseJson[0].SUCCESS == "ok"){
            console.log("user data -> $scope.usuario " + $scope.usuario.value);
            $state.go('app.bares-destacados');
          }else{
              console.log("RESPUESTA DEL API: " + response );
              $ionicPopup.alert({
                title: 'ERROR',
                template: 'EL email o Usuario ingresado ya se encuentra registrado en nuestra base de datos.',
                scope: $scope,
                buttons: [
                    {
                      text: 'OK',
                      type: 'button-positive',
                      onTap: function(e) {
                         $state.go('login');
                      }
                    },
                  ]
              });
          }
              
    }).error(function(response) {
        $scope.codeStatus = response || "Request failed";

        console.log("Recibiendo error -> : " +response);
    });

 };
  //********************fin

});