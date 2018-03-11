app.controller('GaleriaCtrl', function ($scope, $stateParams, ionicMaterialMotion, $http,$state,$ionicSlideBoxDelegate) {


    $scope.fotos_galerias = {};

    $http.get('galerias.json').success(function(response) {
        console.log(response);
      $scope.fotos_galerias = response.galeria;   
      $ionicSlideBoxDelegate.update();

    });

   //  $scope.nextSlide = function() {
   // console.log("Next Button clicked", $ionicSlideBoxDelegate);
    //$ionicSlideBoxDelegate.next();
    //$ionicSlideBoxDelegate.$getByHandle('burgers').next();
 // };

  $scope.sliderOptions = {
      effect: 'slide',
      pagination: false,
      initialSlide: 0
    };


});