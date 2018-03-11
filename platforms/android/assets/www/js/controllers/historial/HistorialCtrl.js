app.controller('HistorialCtrl', function ($scope, 
    $stateParams, ionicMaterialMotion, 
    $http, $state, $ionicLoading, $rootScope, 
    $localStorage,
    $sessionStorage,
    $compile, $sce, ratingConfig) {
     
    $scope.historial = {}; 
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
     //Llamada
    //storageLocal
     $scope.get_bares = [];
     //$scope.get_bares = $localStorage.getBares;
     //URL
     var url = "http://www.altavistaweb.com.ve/banight-api/public/api/v1/gethistorial/"+$localStorage.idUser;
     console.log("URL; : " +url);     
     console.log("$scope.idUser = $localStorage.idUser; :" +$localStorage.idUser);
    //realizo la llamada y guarda en localStorage.getBaresgetestablecimiento/16/BARES
   
   //FUNCION rootScope PARA SER LLAMADA DESDE EL MENU
   $rootScope.getHistorial = function() {
       // body...
       $http.get(url).success(function(response){
                            $scope.historial = response;                         
                        });       
   }
    
$rootScope.getHistorial();
//**** FINAL DEL ARCHIVO    
});