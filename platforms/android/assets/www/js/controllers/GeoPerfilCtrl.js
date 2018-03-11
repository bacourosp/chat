app.controller('GeoPerfilCtrl', function ($scope, $rootScope,
  $stateParams, 
  ionicMaterialMotion, 
  $http, 
  $state, 
  $ionicLoading, 
  $compile, 
  $sce, $filter,
  $window, 
  $cordovaGeolocation,
  $ionicSlideBoxDelegate,
  $ionicPopup, 
  $localStorage,
  $sessionStorage,
  ionicDatePicker,ionicTimePicker) {

 
 var distancia = $scope.distancia;
var error;
var text;
//myClaasDianamyc
$scope.corazon = {};
//storageLocal
$scope.detallesEstablecimiento = {};
 //$scope.idUser = $localStorage.idUser;
 console.log("$localStorage.idUser = " + $localStorage.idUser);
    //Establecimientos de parametros y variables
     $scope.ide = $stateParams.categoryId;
     console.log($stateParams.categoryId);
    $scope.nombre = $stateParams.categoryTitle;
    $scope.logo = $stateParams.categoryLogo;
    $scope.etiquetas = $stateParams.categoryEtiquetas;
    $scope.descripcion = $stateParams.categoryDescripcion;
    $scope.fondo = $stateParams.categoryFondo;
    var ubicar = $scope.ubicacion = $stateParams.categoryUbicacion;
    var lati = $scope.lati =  $stateParams.categoryLatitud;
    var long = $scope.long =  $stateParams.categoryLongitud;
    console.log("Ubicar : " + ubicar);

     $scope.distancia;
     $scope.data = [];
     $scope.data.fecha2 = {};
     $scope.data.horas = {};
     $scope.data.minutos = {};
     $scope.data.vip = false;
     $scope.data.idVip = "No";
     $scope.fotos_galerias = [];
     $scope.productos = [];
     $scope.columnas = {
      col1: 1,
      col2: 2,
      col3: 3 
     };

      //*********************************************

      //********************
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

//************************************************************************

var options = { timeout: 3000, enableHighAccuracy: true, maximumAge: 10000 };
navigator.geolocation.getCurrentPosition(function (position)
    {
      var lat  = position.coords.latitude
      var long = position.coords.longitude
      //$scope.map = {center: {latitude: lat, longitude: long}, zoom: 16 };
      //just want to create this loop to make more markers
      console.log("latitude es: " +lat);
      console.log("longitude es: " +long);

      //********************CONSULTA API MATRIX MAPS DISTANCE AND TIME{begin}*********************//
    $scope.method = 'GET';
    $http({
        method: $scope.method,
        url: "https://maps.googleapis.com/maps/api/distancematrix/json?origins="+lat+","+long+"&destinations="+ubicar+"&mode=driving&language=es-ES&key=AIzaSyBh57Ohp80jSpiNFmPkYCypnaLZDckaHTM",
        headers: {
            'Access-Control-Allow-Origin': '*',
            "Access-Control-Allow-Methods" : "GET,POST,PUT,DELETE,OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
        },
        params: { origins:'*', destinations:'*'}
    }).
    success(function(data, status) {
        $scope.status = status;
        $scope.data = data;
        console.log("Recibiendo data -> origins: " +data.destination_addresses);
        console.log("Recibiendo data -> status : " +data.status);
        console.log("Recibiendo data -> data destinations: " +data.origin_addresses);
     //  console.log("************data.rows[0].elements[0]************CAPTURA DE DATOS: " +data.toString(););
        //*****************GET INFOR OBJECT*************//

   if (data.rows[0].elements[0].distance.text) {
        
        $scope.distancia = data.rows[0].elements[0].distance.text;
        console.log("Recibiendo data -> DISTANCE: " + $scope.distancia);
      }else{
        console.log("******ERROR************ -> DISTANCE: " + data['distance']);
      }

    }).
    error(function(data, status) {
        $scope.data = data || "Request failed";
        $scope.status = status;
         console.log("method = 'GET' error en colsulta API gmaps: " +status + data + error);
    });
      //********************CONSULTA API MATRIX MAPS DISTANCE AND TIME{end}*********************//
      var mapaUrlComoLlegar = "https://www.google.com/maps/embed/v1/directions?key=AIzaSyBSpp-YdpDB2oZEprhGQo7bCaOs4aZjE6U&origin="+lat+","+long+"&destination="+ubicar;
    $scope.mapaUrlComoLlegar = $sce.trustAsResourceUrl(mapaUrlComoLlegar);


console.log("Saliendo GeoPerfilCtrl");
},error,options);

 //********************Api embed gmaps********************//
   //var mapaUrl = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyBSpp-YdpDB2oZEprhGQo7bCaOs4aZjE6U&q='+ubicar+'&attribution_source=Google+Maps+Embed+API&attribution_web_url=http://www.butchartgardens.com/&attribution_ios_deep_link_id=comgooglemaps://?daddr=Butchart+Gardens+Victoria+BC';
   //La Quinta Live Music Bar, #46 Calle Mucuchies, Caracas 1060, Distrito Capital
   var mapaUrl = "https://www.google.com/maps/embed/v1/place?key=AIzaSyBSpp-YdpDB2oZEprhGQo7bCaOs4aZjE6U&q="+ ubicar;
    $scope.mapaUrl = $sce.trustAsResourceUrl(mapaUrl);
//********************Api embed gmaps FIN********************//

//********************LLAMADA DETALLES********************//
//http://www.altavistaweb.com.ve/banight-api/public/api/v1/getestablecimiento/1/1
    $http.get("http://www.altavistaweb.com.ve/banight-api/public/api/v1/getestablecimiento/"+$localStorage.idUser+"/"+$scope.ide)
          .success(function(response) {
                  console.log("Nro Ide es:  " + response.id);
                  //*******DETALLES
                  $scope.detallesEstablecimiento = response;
                  //Productos
                  $scope.productos = response.promociones;
                  console.log("productos es:  " + JSON.stringify($scope.productos) );
                  //******FOTOS
                  var fotos = $scope.fotos_galerias = response.fotos.galeria;
                  console.log("response es:  " + JSON.stringify(fotos) );
                  //******Reviews
                  $scope.nombre = $scope.detallesEstablecimiento.nombre;
                  $scope.reviews = $scope.detallesEstablecimiento.reviews;
                  console.log("Parametro nombre es:  " + $scope.nombre );
                  console.log("Parametro reviews es:  " + $scope.reviews );

                  $ionicSlideBoxDelegate.update();

                  //********************ASIGNAR FAVORITO
                  if ($scope.detallesEstablecimiento.esFavorito == 1) {
                   $scope.corazon = "ion-ios-heart";
                    console.log("es favorito es: 1 "  + $scope.corazon);

                   return $scope.corazon;
                  } 
                  if ($scope.detallesEstablecimiento.esFavorito == 0) {
                    $scope.corazon = "ion-ios-heart-outline";
                    return $scope.corazon;
                  }

//$ionicSlideBoxDelegate.update();
                 // setTimeout(function() {
                 //        $ionicSlideBoxDelegate.slide(0);
                 //        $ionicSlideBoxDelegate.update();
                 //        $scope.$apply();
                 //                    });


//********************GALERIA********************//

  //     $scope.nextSlide = function() {
  //   console.log("Next Button clicked", $ionicSlideBoxDelegate);
  //   $ionicSlideBoxDelegate.next();
  // };

  // $scope.sliderOptions = {
  //     effect: 'slide',
  //     pagination: false,
  //     initialSlide: 0
  //   };

 });
          
  //************************************hora
    var ipObj2 = {
    callback: function (val) {      //Mandatory
      if (typeof (val) === 'undefined') {
        console.log('Time not selected');
        //call resumen text
      } else {
        var selectedTime = new Date(val * 1000);
        $scope.data.horas = selectedTime.getUTCHours();
        $scope.data.minutos =  selectedTime.getUTCMinutes();
        console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
         
        nroPersonas();
      }
    },
    inputTime: 80400,   //Optional
    format: 24,         //Optional
    step: 15,           //Optional
    setLabel: 'Siguiente'    //Optional
  };

 // ionicTimePicker.openTimePicker(ipObj2);
  //***********************************************fecha de reserva
   var ipObj1 = {
      callback: function (val) {  //Mandatory
        //call paso3
        ionicTimePicker.openTimePicker(ipObj2);
        var fecha1 = new Date(val);
         $scope.data.fecha2 = $filter('date')(fecha1, "yyyy/MM/dd");
        console.log("fecha format: "+ $scope.data.fecha2);
        console.log('Return value from the datepicker popup is : ' + fecha1);
      },
      /*disabledDates: [            //Optional
        new Date(2016, 2, 16),
        new Date(2015, 3, 16),
        new Date(2015, 4, 16),
        new Date(2015, 5, 16),
        new Date('Wednesday, August 12, 2015'),
        new Date("08-16-2018"),
        new Date(1439676000000)
      ],*/      
      titleLabel: 'Fecha',
      from: new Date(2017, 1, 1), //Optional
      to: new Date(2019, 1, 1), //Optional
      inputDate: new Date(),      //Optional
      mondayFirst: true,          //Optional
      disableWeekdays: [0],       //Optional
      closeOnSelect: false,       //Optional
      templateType: 'popup'       //Optional
    };
 

    $scope.openDatePicker = function(){
      ionicDatePicker.openDatePicker(ipObj1);
    };
  
 //**********************************
 function nroPersonas() {
  $scope.personas = {};
  $scope.personas.min = 1;
  $scope.personas.max = 9;
  $scope.personas.nro = 1;

   var myPopup1 = $ionicPopup.show({

      template: ' <div class="item range range-positive"><i class="icon ion-ios-people" style="color: #2e7dc6;"></i><input type="range" name="personas.nro" min="<code>{personas.min}</code>" max="<code>{personas.max}</code>" ng-model="personas.nro"><code>{{personas.nro}}</code></div>  ',

      title: 'CANTIDAD DE PERSONAS',

      cssClass: 'reservas-popup',

      scope: $scope,

      buttons: [ {

         text: 'Siguiente',

         type: 'button-positive',

         onTap: function(e) {

            if ($scope.personas.nro != 0) {

               //don't allow the user to close unless he enters wifi password

              // e.preventDefault();
             //return $scope.personas;
             getResumen();

            } else {
              
               //return $scope.personas;

            }

         }

      },{

         text: 'Cancelar',
         type: 'button-positive'

      }, ]

   });

  /* myPopup1.then(function(res) {

      if (res) {

         if (res.userPassword == res.confirmPassword) {

            console.log('Password Is Ok');

         } else {

            console.log('Password not matched');

         }

      } else {

         console.log('Enter password');

      }

   });*/

  //<div class="item range range-positive"><i class="icon ion-ios-sunny-outline"></i><input type="range" name="volume" min="0" max="100" value="33"><i class="icon ion-ios-sunny"></i></div> 
    // body...
 } 
//*********************************
//**********************************
 function getResumen() {
 

   var myPopup1 = $ionicPopup.show({
                  //<code>{{personas.nro}}</code>
      template: ' <spam name="titulo" style="color:rgb(47,126,199);">A nombre de</spam> </br> <label class="colorLabel" name="data.nombre" ng-model="$scope.data.nombre">{{data.nombre}}</label> </br> </br> <spam style="color:rgb(47,126,199);">VIP</spam> </br> <label class="colorLabel" nombre="vip" ng-model="data.idVip">{{data.idVip}}</label> </br></br> <spam style="color:rgb(47,126,199);">Fecha y hora</spam> </br> <label class="colorLabel" name="fechaYhora" ng-model="data.fecha2">{{data.fecha2}} - </label><label class="colorLabel" name="hora" ng-model="hora">{{data.horas}}:{{data.minutos}}hs</label> </br></br> <spam name="titulo" style="color:rgb(47,126,199);">Cantidad de personas</spam> </br> <label class="colorLabel" name="nro" ng-model="personas.nro">{{personas.nro}}</label> </br></br></br><label class="colorLabel" name="nota">Toda reserva tiene un tiempo maximo de espera de 20 minutos</label>',

      title: 'INFORMACION DE RESERVA',

      cssClass: 'reservas-popup',

      scope: $scope,

      buttons: [ {

         text: 'Siguiente',

         type: 'button-positive',

         onTap: function(e) {

            if ($scope.personas.nro != 0) {
              console.log(" $scope.ide ->  " +$scope.ide);
              console.log("$scope.data.nombre ->  " +$scope.data.nombre);
              console.log("$scope.data.fecha2  " +$scope.data.fecha2);
              console.log("$scope.personas.nro ->  " +$scope.personas.nro);


               //LLAMADA para SETReservacion
             $http({
                    method: 'POST',
                    url: 'http://www.altavistaweb.com.ve/banight-api/public/api/v1/setreserva',
                    headers: 
                     { 'content-type': 'multipart/form-data' },
                    params: 
                     { idestablecimiento: $scope.ide,
                       iduser: $localStorage.idUser,
                       nombre: $scope.data.nombre,
                       fechareserva: $scope.data.fecha2,
                       cantidad: $scope.personas.nro 
                      }
                    }).success(function(response) {
                           
                          console.log("Recibiendo **data ->  " + JSON.stringify(response));
                          confirmacionReservacion();
                                
                      }).error(function(response) {
                          $scope.codeStatus = response || "Request failed";

                          console.log("Recibiendo error ->  " +JSON.stringify(response));
                      });


             

            } else {
              
               //return $scope.personas;

            }

         }

      },{

         text: 'Cancelar',
         type: 'button-positive'

      }, ]

   });

  /* myPopup1.then(function(res) {

      if (res) {

         if (res.userPassword == res.confirmPassword) {

            console.log('Password Is Ok');

         } else {

            console.log('Password not matched');

         }

      } else {

         console.log('Enter password');

      }

   });*/

  //<div class="item range range-positive"><i class="icon ion-ios-sunny-outline"></i><input type="range" name="volume" min="0" max="100" value="33"><i class="icon ion-ios-sunny"></i></div> 
    // body...
 } 
//*********************************
//**********************************
 function confirmacionReservacion() {
 

   var myPopup1 = $ionicPopup.show({
                  //<code>{{personas.nro}}</code>
      template: ' <spam name="titulo" style="color:rgb(47,126,199);">Tu reserva ha sido enviada de manera exitosa!!!</spam> </br> </br> <img > <spam name="titulo" style="color:rgb(47,126,199);">En breve te llegara un mensaje confirmando o no la misma.</spam>  </br></br></br><label class="colorLabel" name="nota">Toda reserva tiene un tiempo maximo de espera de 20 minutos</label>',

      title: 'INFORMACION DE RESERVA',

      cssClass: 'reservas-popup',

      scope: $scope,

      buttons: [ {

         text: 'Salir',
         type: 'button-positive',
         onTap: function(e) {
                        // $rootScope.getHistorial();
                      }

      } ]

   });

  /* myPopup1.then(function(res) {

      if (res) {

         if (res.userPassword == res.confirmPassword) {

            console.log('Password Is Ok');

         } else {

            console.log('Password not matched');

         }

      } else {

         console.log('Enter password');

      }

   });*/

  //<div class="item range range-positive"><i class="icon ion-ios-sunny-outline"></i><input type="range" name="volume" min="0" max="100" value="33"><i class="icon ion-ios-sunny"></i></div> 
    // body...
 } 
//*********************************
$scope.goReviewsView = function($event){

 /* $scope.feeds_categories = [];

    $http.get('feeds-categories-bares-todos.json').success(function(response) {
        $scope.feeds_categories = response;

    });*/
    
     // $state.go('app.reviews');
      $state.go('app.reviews', { 'nombre':$scope.nombre, 'reviews':$scope.reviews, 'idUser':$scope.idUser });

};

//************************************
$scope.goReserva= function() {
// showpopup method code
   

   var myPopup = $ionicPopup.show({

      template: ' <ion-md-input class="item_input" label="Nombre" placeholder="Nombre" hightlight-color="energized" type="text" ng-model="data.nombre" ng-required="data.nombre" ng-minlength="3" ng-maxlength="12" required></ion-md-input> <span style="color:red;" ng-show="data.nombre.$dirty&&data.nombre.$error.minlength">Please provide a valid mobileNo</span><br> <ion-toggle ng-model="data.vip" toggle-class="toggle-calm">Modo VIP</ion-toggle> ',

      title: 'DATOS DE RESERVA',

      cssClass: 'reservas-popup',

      scope: $scope,

      buttons: [ {

         text: 'Siguiente',

         type: 'button-positive',

         onTap: function(e) {

            if ($scope.data.nombre) {

               //don't allow the user to close unless he enters wifi password
               console.log("primer IF: " +$scope.data.nombre);
               console.log("primer VIP: " +$scope.data.vip);
              // e.preventDefault();
              if($scope.data.vip===true){
                $scope.data.idVip = "Si";
              }else{
                $scope.data.idVip = "No";
              }
              $scope.openDatePicker();


            } else {
             // $scope.openDatePicker();
               //return $scope.data.nombre;
               $ionicPopup.alert({
                title: 'ERROR',
                template: 'Introduzca un Nombre, Por Favor.',
                scope: $scope,
                buttons: [
                    {
                      text: 'OK',
                      type: 'button-positive',
                      onTap: function(e) {
                         $scope.goReserva();
                      }
                    },
                  ]
              });

              console.log("primer ELSE: " +$scope.data.nombre);
            }

         }

      },{

         text: 'Cancelar',
         type: 'button-positive'

      }, ]

   });

   /*myPopup.then(function(res) {

      if (res) {

         if (res.userPassword == res.confirmPassword) {

            console.log('Password Is Ok');

         } else {

            console.log('Password not matched');

         }

      } else {

         console.log('Enter password');

      }

   });*/


};

//******************************* corazon-favoritos
  $scope.toggleIcon = function($event, iconName) {
    var buttonClasses = $event.currentTarget.className;
    if (buttonClasses.indexOf(iconName + '-outline') > 0) {
      buttonClasses = buttonClasses.replace('-outline', '');
      //LLAMADA SETFAVORITOS
           $http({
        method: 'POST',
        url: 'http://www.altavistaweb.com.ve/banight-api/public/api/v1/setfavorito',
        headers: 
         { 'content-type': 'multipart/form-data' },
        params: 
         {  
             idestablecimiento: $scope.ide,
             iduser: $localStorage.idUser
          }
        }).success(function(response) {

              console.log("Recibiendo **data ->  " +JSON.stringify(response));

              $scope.mensaje = response;
              
              if ($scope.mensaje.SUCCESS != null) {
                console.log("Recibiendo **data ->  " +JSON.stringify($scope.mensaje.SUCCESS));
                 $ionicPopup.alert({
                      title: '',
                      template: '<center> <img ng-src="../img/icon/icon-aprobacion.png" style="width: 25%;"></img> </br> <p style="font-family:"Karla"; color: rgb(46, 46, 46); line-height: 1.279;">¡Listo! </br> Agregado a Favoritos.</p></center>',
                      scope: $scope,
                      buttons: [
                          {
                            text: 'OK',
                            type: 'button-positive',
                            onTap: function(e) {
                                 
                            }
                          },
                        ]
                    });         
              } 
              if ($scope.mensaje.ERROR != null) {
                console.log("Recibiendo **data ->  " +JSON.stringify($scope.mensaje.ERROR));
                 $ionicPopup.alert({
                      title: '',
                      template: '<center> <img ng-src="../img/icon/icon-aprobacion.png" style="width: 25%;"></img> </br> <p style="font-family:"Karla"; color: rgb(46, 46, 46); line-height: 1.279;">¡Ups! </br> Algo Salio Mal. </p></center>',
                      scope: $scope,
                      buttons: [
                          {
                            text: 'OK',
                            type: 'button-positive',
                            onTap: function(e) {
                                 
                            }
                          },
                        ]
                    });         
              } 
                  
                    
          }).error(function(response) {
              $scope.codeStatus = response || "Error de Comunicacion!";

              $ionicPopup.alert({
                      title: '',
                      template: '<center> <img ng-src="../img/icon/icon-exclamacion.png" style="width: 25%;"></img> </br> <p style="font-family:"Karla"; color: rgb(46, 46, 46); line-height: 1.279;">¡Ups! </br> Error de Comunicacion!</p></center>',
                      scope: $scope,
                      buttons: [
                          {
                            text: 'OK',
                            type: 'button-positive',
                            onTap: function(e) {
                                 
                            }
                          },
                        ]
                    });
          });
    } else {
      buttonClasses = buttonClasses.replace(iconName, iconName + '-outline');
    //LLAMADA ELIMINAR_FAVORITOS

    }
    $event.currentTarget.className = buttonClasses;
  }

//******************************* boton toogle-off-on
$scope.settingsList = [
    { text: "Wireless", checked: true },
    { text: "GPS", checked: false },
    { text: "Bluetooth", checked: false }
  ];

  $scope.pushNotificationChange = function() {
    console.log('Push Notification Change', $scope.pushNotification.checked);
  };
  
  $scope.pushNotification = { checked: true };
  $scope.emailNotification = 'Subscribed';
//*****************************
});
