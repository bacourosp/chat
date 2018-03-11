app.controller('FavoritosHotelesCtrl', function ($scope, 
    $stateParams, ionicMaterialMotion, $rootScope,
    $http, $state, $ionicLoading, $ionicPopup,
    $localStorage, $sessionStorage,
    $compile, $sce, ratingConfig) {
     
    $scope.favoritos_holetes = {}; 
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
    //storageLocal  $scope.get_bares = [];     
    //realizo la llamada y guarda en localStorage.getBaresgetestablecimiento/16/BARES
    $rootScope.getFavoritosHoteles = function(){
        $http.get("http://www.altavistaweb.com.ve/banight-api/public/api/v1/getfavoritos/"+$localStorage.idUser+"/HOTELES").
                                success(function(response){
                                    $scope.favoritos_holetes = response;
                                    $scope.fadeSlideIn();                         
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
        return $scope.favoritos_holetes;
    };


 var reset = function() {
        var inClass = document.querySelectorAll('.in');
        for (var i = 0; i < inClass.length; i++) {
            inClass[i].classList.remove('in');
            inClass[i].removeAttribute('style');
        }
        var done = document.querySelectorAll('.done');
        for (var i = 0; i < done.length; i++) {
            done[i].classList.remove('done');
            done[i].removeAttribute('style');
        }
        var ionList = document.getElementsByTagName('ion-list');
        for (var i = 0; i < ionList.length; i++) {
            var toRemove = ionList[i].className;
            if (/animate-/.test(toRemove)) {
                ionList[i].className = ionList[i].className.replace(/(?:^|\s)animate-\S*(?:$|\s)/, '');
            }
        }
    };

    $scope.ripple = function() {
        reset();
        document.getElementsByTagName('ion-list')[0].className += ' animate-ripple';
        setTimeout(function() {
            ionicMaterialMotion.ripple();
        }, 500);
    };

    $scope.fadeSlideInRight = function() {
        reset();
        document.getElementsByTagName('ion-list')[0].className += ' animate-fade-slide-in-right';
        setTimeout(function() {
            ionicMaterialMotion.fadeSlideInRight();
        }, 500);
    };

    $scope.fadeSlideIn = function() {
        reset();
        document.getElementsByTagName('ion-list')[0].className += ' animate-fade-slide-in';
        setTimeout(function() {
            ionicMaterialMotion.fadeSlideIn();
        }, 500);
    };


$rootScope.getFavoritosHoteles();

});