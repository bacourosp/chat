app.controller('BaresTodosCtrl', function ($scope, $stateParams, ionicMaterialMotion, $http,$state) {

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

    
      //*********************************************
$scope.ratingsObject = {
        iconOn : 'ion-ios-star',
        iconOff : 'ion-ios-star-outline',
        iconOnColor: 'rgb(200, 200, 100)',
        iconOffColor:  'rgb(200, 100, 100)',
        rating:  2,
        minRating:1,
        index:$scope.index ,
        callback: function(rating, index) {
          $scope.ratingsCallback(rating, index);
        }
      };

      $scope.ratingsCallback = function(rating, index) {
        console.log('Selected rating is : ', rating, index);
      };

      //***********************************

  $scope.feeds_categories = [];

    $http.get('feeds-categories-bares-todos.json').success(function(response) {
        $scope.feeds_categories = response;

    });
    
    console.log();
    console.log($scope.feeds_categories);
    //{id: $scope.categoryId}
     $scope.ide = $stateParams.categoryId; 
     console.log($stateParams.categoryId);
            // get the location
    $scope.title = $stateParams.categoryTitle; 
    $scope.logo = $stateParams.categoryLogo;  
    $scope.etiquetas = $stateParams.categoryEtiquetas;
    $scope.fondo = $stateParams.categoryFondo;
    var ubicar = $scope.ubicacion = $stateParams.categoryUbicacion; 
    var lati = $scope.lati =  $stateParams.categoryLatitud;
    var long = $scope.long =  $stateParams.categoryLongitud;
    console.log($stateParams.categoryTitle);
    $scope.blinds();    
});