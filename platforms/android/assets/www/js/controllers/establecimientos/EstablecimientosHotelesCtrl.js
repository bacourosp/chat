app.controller('EstablecimientosHotelesCtrl', function ($scope, $rootScope,
    $stateParams, ionicMaterialMotion, 
    $http, $state, $ionicLoading, 
    $localStorage,
    $sessionStorage, $ionicPopup,
    $compile, $sce, ratingConfig) {
     
    $scope.hoteles = {};
    $scope.hoteles.destacados = {};
    $scope.hoteles.todos = {}; 
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
     //Llamadas EstablecimientosHotelesCtrl
     console.log("EstablecimientosHotelesCtrl -> $localStorage.idUser = " +$localStorage.idUser);
    //realizo la llamada y guarda en localStorage.getBaresgetestablecimiento/16/BARES
    //***********LLamada metodo para Hoteles Todos
    $rootScope.getHotelesTodos = function(){
        $http.get("http://www.altavistaweb.com.ve/banight-api/public/api/v1/getestablecimientos/"+$localStorage.idUser+"/HOTELES/TODOS").
                            success(function(response){
                                $scope.hoteles.todos = response;                         
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
        return  $scope.hoteles.todos;                   
    };

    //***********LLamada metodo para Hoteles Destacados
    $rootScope.getHotelesDestacados = function(){
        $http.get("http://www.altavistaweb.com.ve/banight-api/public/api/v1/getestablecimientos/"+$localStorage.idUser+"/HOTELES/DESTACADOS").
                            success(function(response){
                                $scope.hoteles.destacados = response;                         
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
        return  $scope.hoteles.destacados;                     
    };

    //iniciar
$rootScope.getHotelesTodos();
$rootScope.getHotelesDestacados();
});