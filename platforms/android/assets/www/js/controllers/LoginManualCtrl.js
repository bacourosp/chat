app.controller('LoginManualCtrl', function($scope, 
  $state, 
  $templateCache, $q, 
  $rootScope, 
  UserService, 
  $ionicLoading,
  LoginService, $ionicPopup,
  $localStorage, $http,
  $sessionStorage, $filter,$ionicHistory) {
	      $scope.usuario = {};
        $scope.password = {};
        $scope.userForm = {};
        $scope.parseJson = {};

  
  // function to submit the form after all validation has occurred      
  $scope.submitForm = function(isValid) {

    // check to make sure the form is completely valid
    if (isValid) { 
     $scope.loginManual();
    }

  };

  //******************Crear Usuario
 //Retorna: IdUsr
 //Parametros: /addUser/{User}/{Mail}/{password}/{URL-foto-perfil}/{Genero}/{Fecha-Nacimoento}
 $scope.loginManual = function(){ 

      if ($scope.usuario.value === null || $scope.password.value == null) {
                console.log("if **data User -> : " +$scope.usuario.value);
                $ionicPopup.alert({
                                title: 'ERROR',
                                template: 'Introduzca Usuario y/o Contraseña' ,
                                scope: $scope,
                                buttons: [
                                    {
                                      text: 'OK',
                                      type: 'button-positive',
                                      
                                    },
                                  ]
                              });

                                    } else {
                                      
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
                                      //$scope.parseJsonId = [];
                                          $localStorage.idUser = response; 
                                          //$scope.parseJsonId = $scope.parseJson;
                                           if($localStorage.idUser > 0){

                                             $ionicHistory.removeBackView();
                                              $ionicHistory.clearHistory();
                                              $ionicHistory.clearCache();
                                              //$rootScope.getBaresTodos();
                                              //$rootScope.getBaresDestacados();
                                              $state.go('app.bares');
                                            return $localStorage.idUser;
                                            }else{
                                                console.log("ELSE---RESPUESTA DEL API: response" + response );
                                                $ionicPopup.alert({
                                                  title: '',
                                                  template: '<center> <img ng-src="../img/icon/icon-exclamacion.png" style="width: 25%;"></img> </br> </br> <p style="font-family:"Karla"; color: rgb(46, 46, 46); line-height: 1.279;">¡Ups! </br> No se pudo iniciar sesion. Compruebe los datos y vuelva a intentarlo. </br> </br> Por favor intenta nuevamenete. </p></center>',
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
                                            return $localStorage.idUser;

                                                
                                      }).error(function(response) {
                                          $scope.codeStatus = response;

                                          console.log("Recibiendo error -> : " +response);
                                          $ionicPopup.alert({
                                                  title: 'ERROR',
                                                  template: 'Respuesta del Servidor =' + JSON.stringify($scope.codeStatus) ,
                                                  scope: $scope,
                                                  buttons: [
                                                      {
                                                        text: 'OK',
                                                        type: 'button-positive',
                                                        
                                                      },
                                                    ]
                                                });
                                      });
                                      }
                                      //*******************FIN LLAMADA

                                   };



  //********************seccion de carga de imagen
  /*$scope.login = function (userLogin) {
        LoginService.loginUser(userLogin)
        .then(function (data) {
            //log in successfull
            //Recibe el json objeto data y se empieza a manejar
        }, function (data) {
            //log in failed
        });
    };*/

  /*$scope.doLogIn = function(){
		$state.go('app.inicio');
	};

 $ionicLoading.show({
          template: 'Cargando...'
        });

	$scope.user = {};

	$scope.user.email = "Usuario@gmail.com";
	$scope.user.pin = "12345";

	$scope.selected_tab = "";

	$scope.$on('my-tabs-changed', function (event, data) {
		$scope.selected_tab = data.title;
	});*/

  //**************FIN_ARCHIVO
});