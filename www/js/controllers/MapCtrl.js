app.controller('MapCtrl', function ( $filter, $http, $scope,  $ionicLoading, $compile, $window, $cordovaGeolocation, $ionicSideMenuDelegate, $sce ) {
   //$ionicSideMenuDelegate.canDragContent(false)
  /*$scope.map = {center: {latitude: 40.1451, longitude: -99.6680 }, zoom: 8 };
  $scope.options = {scrollwheel: false, mapTypeId: "roadmap" };
  $scope.markericon = "img/moose.png";
  $scope.markers = []*/
  // get position of user and then set the center of the map to that position
  console.log("***********************************************************inicio : " + $cordovaGeolocation);

  $cordovaGeolocation
    .getCurrentPosition()
    .then(function (position) {
      var lat  = position.coords.latitude
      var long = position.coords.longitude
      //$scope.map = {center: {latitude: lat, longitude: long}, zoom: 16 };
      //just want to create this loop to make more markers
      console.log("***********************************************************latitude : " +lat);
      console.log("***********************************************************longitude : " +long);
      //https://www.google.com/maps/embed/v1/directions?key=AIzaSyBSpp-YdpDB2oZEprhGQo7bCaOs4aZjE6U&origin=Oslo+Norway&destination=Telemark+Norway&avoid=tolls|highways
      //"https://www.google.com/maps/embed/v1/place?key=AIzaSyBSpp-YdpDB2oZEprhGQo7bCaOs4aZjE6U&q="+ lat + "," + long;
      $scope.distancia_tiempo = [];
//***********************************************************
     $scope.method = 'GET';
    $http({
        method: $scope.method,
        url: "https://maps.googleapis.com/maps/api/distancematrix/json?origins='+ address+'&destinations=San+Francisco|Victoria+BC&mode=bicycling&language=fr-FR&key=AIzaSyBh57Ohp80jSpiNFmPkYCypnaLZDckaHTM"
    }).
    success(function(data, status) {
        $scope.status = status;
        $scope.data = data;
        console.log("************************data origins: " +data.destination_addresses);   
        console.log("************************status : " +data.status); 
        console.log("************************data destinations: " +data.origin_addresses); 
        console.log("************************data destinations: " +data.rows); 

        var filas = $scope.filas = data.rows;
 //console.log("filas: " +findBySpecField(filas,'rows','502100','elements'));

      // We filter the array by id, the result is an array
    // so we select the element 0

    var single_object = $filter('filter')(data.rows, function (d) {return d.elements != null;})[1];

    // If you want to see the result, just check the log
    console.log(single_object)
   

        

    
    }).
    error(function(data, status) {
        $scope.data = data || "Request failed";
        $scope.status = status;
         console.log("************************error $scope.method = 'GET';: " +status);   
    });

 /*  $scope.getLocationFromAddress = function(address) {
    if($scope.address!="Vancouver+BC|Seattle"){
        $scope.position = "";
        delete $http.defaults.headers.common['X-Requested-With'];
        $http(
                {
                    method : 'GET',
                    url : 'https://maps.googleapis.com/maps/api/distancematrix/json?origins='+ address+'&destinations=San+Francisco|Victoria+BC&mode=bicycling&language=fr-FR&key=AIzaSyBh57Ohp80jSpiNFmPkYCypnaLZDckaHTM',

                }).success(function(data, status, headers, config) {

            $scope.position = data.results[0].geometry.location.lat+","+data.results[0].geometry.location.lng;     
            console.log("*******************************$scope.position : " +$scope.position);
                                  
        }).error(function(data, status, headers, config) {
            debugger;
            console.log(data);
        });
    }
} 
$scope.getLocationFromAddress("Vancouver+BC|Seattle");*/
//***********************************************************
    /*$http.get('https://maps.googleapis.com/maps/api/distancematrix/json?origins=Vancouver+BC|Seattle&destinations=San+Francisco|Victoria+BC&mode=bicycling&language=fr-FR&key=AIzaSyBh57Ohp80jSpiNFmPkYCypnaLZDckaHTM').success(function(response) {
        $scope.distancia_tiempo = response;
        var consulta = find(response, {id: $scope.categoryId});
    console.log(consulta);
    $scope.consultaDistance = consulta.distance;
    $scope.consultaTiempo = consulta.duration;
    console.log($scope.consultaDistance );
    console.log($scope.consultaTiempo);
    });*/
//***********************************************************

//***********************************************************$scope.getLocationFromAddress("Vancouver+BC|Seattle");

      var mapaUrl = "https://www.google.com/maps/embed/v1/directions?key=AIzaSyBSpp-YdpDB2oZEprhGQo7bCaOs4aZjE6U&origin="+lat+","+long+"&destination=Juan Sebastian Bar, Avenida Venezuela, Caracas, Miranda&avoid=tolls|highways";
    $scope.mapaUrl = $sce.trustAsResourceUrl(mapaUrl);
     /* for(var i=0; i<3; i++) {
        $scope.markers.push({
            id: $scope.markers.length,
            latitude: lat + (i * 0.002),
            longitude: long + (i * 0.002),
            icon: $scope.markericon,
            content: "I am located at " + lat + " ," + long
        });
      }
      $scope.onMarkerClick = function(marker, eventName, model) {
          model.show = !model.show;
      }*/

    }, function(err) {
      // error
      debugger;
       console.log("***********************************************************Error : " +err);
    });

console.log("Saliendo");
});