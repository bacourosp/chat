app.controller('EstablecimientosBolichesCtrl', function ($scope, $rootScope, $ionicPopup,
    $stateParams, ionicMaterialMotion, 
    $http, $state, $ionicLoading, 
    $localStorage,
    $sessionStorage,
    $compile, $sce, ratingConfig) {
     
    $scope.boliches = {};
    $scope.boliches.destacados = {};
    $scope.boliches.todos = {}; 
    $scope.title = {}; 
    $scope.logo ={};
    $scope.fondo ={};
    $scope.etiquetas ={};

    var lati = $scope.lati;
    var long = $scope.long;
    var ubicar = $scope.ubicacion;      
     
    $scope.rating = {};
    $scope.rating.rate = 3;
    $scope.rating.max = 5;
    //INTERCAMBIO DE CONTENIDO
            $scope.ngShowhide = false;
            $scope.ngShowhide2 = true;
            $scope.ngShowhideFun = function(flag) {
                if (flag) {
                    $scope.ngShowhide = false;
                    $scope.ngShowhide2 = true;
                    console.log("if 1 $scope.ngShowhide:"+$scope.ngShowhide+"if 1 $scope.ngShowhide2:"+$scope.ngShowhide2);
                } else {
                    $scope.ngShowhide = false;
                    $scope.ngShowhide2 = true;
                    console.log("else 1 $scope.ngShowhide:"+$scope.ngShowhide+"else 1 $scope.ngShowhide2:"+$scope.ngShowhide2);

                }
            };
             $scope.ngShowhideFun2 = function(flag) {
                if (flag) {
                    $scope.ngShowhide2 = false;
                    $scope.ngShowhide = true;
                    console.log("if 2 $scope.ngShowhide:"+$scope.ngShowhide+"if 2 $scope.ngShowhide2:"+$scope.ngShowhide2);
                   
                } else {
                    $scope.ngShowhide2 = false;
                    $scope.ngShowhide = true;
                    console.log("else 2 $scope.ngShowhide:"+$scope.ngShowhide+"else 2 $scope.ngShowhide2:"+$scope.ngShowhide2);

                }
            };
 //Llamadas EstablecimientosbolichesCtrl
     console.log("EstablecimientosBolichesCtrl -> $localStorage.idUser = " +$localStorage.idUser);
    //realizo la llamada y guarda en localStorage boliches
    //***********LLamada metodo para boliches Todos
    $rootScope.getBolichesTodos = function(){
    $http.get("http://www.altavistaweb.com.ve/banight-api/public/api/v1/getestablecimientos/"+$localStorage.idUser+"/BOLICHES/TODOS").
                            success(function(response){
                            $scope.boliches.todos = response;                         
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
        return  $scope.boliches.todos;                   
    };

    //***********LLamada metodo para Hoteles Destacados
    $rootScope.getBolichesDestacados = function(){
    $http.get("http://www.altavistaweb.com.ve/banight-api/public/api/v1/getestablecimientos/"+$localStorage.idUser+"/BOLICHES/DESTACADOS").
                            success(function(response){
                            $scope.boliches.destacados = response;                         
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
        return  $scope.boliches.destacados;                     
    };

    //iniciar
$rootScope.getBolichesTodos();
$rootScope.getBolichesDestacados();
});