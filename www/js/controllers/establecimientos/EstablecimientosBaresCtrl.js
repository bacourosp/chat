app.controller('EstablecimientosBaresCtrl', function ($scope, $rootScope,
    $stateParams, ionicMaterialMotion, $ionicPopup,
    $http, $state, $ionicLoading, 
    $localStorage,
    $sessionStorage,
    $compile, $sce, ratingConfig) {
     
    $scope.bares = {};
    $scope.bares.destacados = {};
    $scope.bares.todos = {}; 
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
     //Llamadas EstablecimientosBaresCtrl
     console.log("EstablecimientosBaresCtrl -> $localStorage.idUser = " +$localStorage.idUser);
     //***********LLamada metodo para Bares Todos
    $rootScope.getBaresTodos = function(){
    $http.get("http://www.altavistaweb.com.ve/banight-api/public/api/v1/getestablecimientos/"+$localStorage.idUser+"/BARES/TODOS").
                        success(function(response){
                            $scope.bares.todos = response;  
                            console.log("LLamada getBaresTodos Response:"+ JSON.stringify($scope.bares.todos));                   
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
        return  $scope.bares.destacados;
};

    //***********LLamada metodo para Hoteles Destacados
    $rootScope.getBaresDestacados = function(){
    $http.get("http://www.altavistaweb.com.ve/banight-api/public/api/v1/getestablecimientos/"+$localStorage.idUser+"/BARES/DESTACADOS").
                        success(function(response){
                            $scope.bares.destacados = response;  
                            console.log("LLamada getBaresDestacados Response:"+ JSON.stringify($scope.bares.destacados));                   
                       
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
        return  $scope.bares.destacados;
    

    };
    
$rootScope.getBaresTodos();
  $rootScope.getBaresDestacados();


if ($scope.bares.todos == null) {
    //iniciar
  $rootScope.getBaresTodos();
  $rootScope.getBaresDestacados();

} else {
  return $scope.bares;

}

});