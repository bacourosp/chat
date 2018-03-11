app.controller('BaresCtrl', function ($scope, 
    $stateParams, ionicMaterialMotion, 
    $http, $state, $ionicLoading, 
    $localStorage,
    $sessionStorage,
    $compile, $sce, ratingConfig) {
      console.log($scope.feeds_categories);
    //{id: $scope.categoryId}
     $scope.ide = $stateParams.categoryId; 
     console.log($stateParams.categoryId);
            // get the location
    $scope.title = $stateParams.categoryTitle; 
    $scope.logo = $stateParams.categoryLogo;
    $scope.fondo = $stateParams.categoryFondo;
    $scope.etiquetas = $stateParams.categoryEtiquetas;
    var lati = $scope.lati =  $stateParams.categoryLatitud;
    var long = $scope.long =  $stateParams.categoryLongitud;
    var ubicar = $scope.ubicacion = $stateParams.categoryUbicacion;  
  console.log($stateParams.categoryUbicacion);
    console.log($stateParams.categoryTitle);
    $scope.reviews = 4.0000;
 $scope.rating = {};
  $scope.rating.rate = 3;
  $scope.rating.max = 5;
   /* var reset = function() {
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
    };*/



   //Llamada
//storageLocal
 $scope.get_bares = [];
    console.log("EL ID DE idUser : " +$localStorage.idUser);
    //realizo la llamada y guarda en localStorage.getBaresgetestablecimiento/16/BARES
    $http.get("http://www.altavistaweb.com.ve/banight-api/public/api/v1/getestablecimientos/"+$localStorage.idUser+"/BARES/DESTACADOS").
                        success(function(response){
                            $localStorage.getBares = response; 
                            $scope.get_bares = response;
                            console.log("reviews123 " + JSON.stringify($scope.get_bares));
                            $scope.reviews = $scope.get_bares[0].reviews;
                            console.log("reviews " +$scope.reviews);
                        });
                        
});