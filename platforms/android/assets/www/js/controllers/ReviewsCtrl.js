app.controller('ReviewsCtrl', function ($scope, 
  $stateParams, 
  ionicMaterialMotion, 
  $http, 
  $state, 
  $ionicLoading, 
  $compile, 
  $sce, 
  $window, 
  $cordovaGeolocation,
  $ionicSlideBoxDelegate,
  $ionicPopup, 
  $localStorage,
  $sessionStorage,
  ionicDatePicker,ionicTimePicker) {

var error;
var text;
//storageLocal
         $scope.nombre = $stateParams.nombre;
         $scope.reviews = $stateParams.reviews;
         $scope.comentario =[];
         $scope.puntaje2 =[];


 console.log(" Nombre Establecimiento= ;" +$scope.nombre);
    //Establecimientos de parametros y variables
     $scope.ide = $stateParams.categoryId;
     console.log($stateParams.categoryId);
    $scope.title = $stateParams.categoryTitle;
    $scope.logo = $stateParams.categoryLogo;
    $scope.etiquetas = $stateParams.categoryEtiquetas;
    $scope.descripcion = $stateParams.categoryDescripcion;  
    $scope.rating = {};
    $scope.rating.rate = 3;
     $scope.rating.max = 5;
     $scope.calificaciones = [];
 
  

//********************LLAMADA DETALLES********************//
//http://www.altavistaweb.com.ve/banight-api/public/api/v1/getestablecimiento/1/1
    $http.get("http://www.altavistaweb.com.ve/banight-api/public/api/v1/getreview/1/1")
          .success(function(response) {
                  console.log("Nro Ide es:  " + response.id);
                  //*******DETALLES
                  $scope.calificaciones = response;
                  
                  console.log("response es:  " + JSON.stringify($scope.calificaciones) );
                   
      });
 

//************************************
$scope.goSetReviews= function(puntaje) {
// showpopup method code
   $scope.data = {}
   $scope.puntaje2.value  = puntaje;

   var myPopup = $ionicPopup.show({

      template: ' <rating id="ratingReviews" class="ratingCalificaciones aumentoRating" name="puntaje2" ng-model="puntaje2.value" ng-change="puntaje2.value"></rating>    </br>  </br>  <textarea id="reviews_textarea" class="item_input" name="comentario" placeholder="Contales a los demás que te pareció el lugar!" hightlight-color="energized" type="text" ng-model="comentario.value" ng-change="comentario.value"  ng-required="comentario.value" ng-minlength="3"></textarea>',

      title: 'PUNTUACION',

      cssClass: 'reviews-popup',

      scope: $scope,

      buttons: [ {

         text: 'Enviar',

         type: 'button-positive',

         onTap: function(e) {

            if ($scope.comentario != null) {
               
                console.log('else matched :' +
                 $scope.comentario.value +
                 "puntaje :"+ $scope.puntaje2.value); 
                  //**********************Seccion de formulario fin

  
$http({
  method: 'POST',
  url: 'http://www.altavistaweb.com.ve/banight-api/public/api/v1/setreview',
  headers: 
   { 'content-type': 'multipart/form-data' },
  params: 
   { idestablecimiento: '1',
     iduser: '1',
     calificacion: $scope.puntaje2.value,
     comentario: $scope.comentario.value
    }
  }).success(function(response) {

         console.log("Recibiendo **data ->  " + JSON.stringify(response));
               
    }).error(function(response) {
 
        console.log("Recibiendo error ->  " +JSON.stringify(response));
    });


  //********************seccion de carga de imagen


            } else {
              console.log('else matched :' + $scope.comentario);


            }

         }

      },{

         text: 'Cancelar',
         type: 'button-positive'

      }, ]

   });

   myPopup.then(function(res) {

      if (res) {

         if (res.userPassword == res.confirmPassword) {

            console.log('Password Is Ok');

         } else {

            console.log('Password not matched');

         }

      } else {

         console.log('Enter password');

      }

   });


};
//******************************* FINAL ARCHIVO
});
