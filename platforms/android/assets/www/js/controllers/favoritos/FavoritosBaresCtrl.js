app.controller('FavoritosBaresCtrl', 
    function ($scope, $stateParams, $rootScope, $http, $state,
        ionicMaterialMotion, $ionicPopup,
        $localStorage, $sessionStorage) {
        $scope.favoritos_bares = [];
        $scope.rating = {};
        $scope.rating.rate = 3;
        $scope.rating.max = 5;
      //***********************************
    $rootScope.getFavoritosBares = function(){
        // Llamada Favoritos...
        $http.get("http://www.altavistaweb.com.ve/banight-api/public/api/v1/getfavoritos/"+$localStorage.idUser+"/BARES").
                        success(function(response){
                           $scope.favoritos_bares = response;
                            $scope.blinds();
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
        return  $scope.favoritos_bares ;                   
    };

      //************************************    
    
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

    $scope.blinds = function() {
        reset();
        document.getElementsByTagName('ion-list')[0].className += ' animate-blinds';
        setTimeout(function() {
            ionicMaterialMotion.blinds(); 
            
        }, 500);
    };


    //$scope.blinds();   
    $rootScope.getFavoritosBares(); 
});