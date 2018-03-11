app.controller('GeoCtrl', function($scope, $ionicLoading, $ionicPopup)     {
  $scope.locations = {};

  $scope.navTitle = "List of Locations";

  $scope.rightButtons =  [{
    type: 'button-icon button-clear ion-more',
    tap: function(e) {
      $scope.openSortModal();
    }
  }];

  // Method called on infinite scroll
  // Receives a "done" callback to inform the infinite scroll that we are done
  $scope.loadMore = function() {
    $timeout(function() {
      // Placeholder for later
      $scope.$broadcast('scroll.infiniteScrollComplete');
    }, 1000);
  }

  $scope.loading = $ionicLoading.show({
    content: 'Getting current location...',
    showBackdrop: false
  });

  navigator.geolocation.getCurrentPosition(function(pos) {
    var coords = $scope.currentLocation = [pos.coords.longitude, pos.coords.latitude];
    $scope.locations = LocationsService.allSync();
    $scope.sortLoc = SettingsService.get('sortLocBy');
    $ionicLoading.hide();
  }, function(error) {
    $ionicPopup.alert({
      title: 'Unable to get location: ' + error.message
    }).then(function(res) {
      $ionicLoading.hide();
      // not working
    });
  });

  $scope.distanceFromHere = function (_item, _startPoint) {
    var start = null;

    var radiansTo = function (start, end) {
      var d2r = Math.PI / 180.0;
      var lat1rad = start.latitude * d2r;
      var long1rad = start.longitude * d2r;
      var lat2rad = end.latitude * d2r;
      var long2rad = end.longitude * d2r;
      var deltaLat = lat1rad - lat2rad;
      var deltaLong = long1rad - long2rad;
      var sinDeltaLatDiv2 = Math.sin(deltaLat / 2);
      var sinDeltaLongDiv2 = Math.sin(deltaLong / 2);
      // Square of half the straight line chord distance between both points.
      var a = ((sinDeltaLatDiv2 * sinDeltaLatDiv2) +
              (Math.cos(lat1rad) * Math.cos(lat2rad) *
                      sinDeltaLongDiv2 * sinDeltaLongDiv2));
      a = Math.min(1.0, a);
      return 2 * Math.asin(Math.sqrt(a));
    };

    if ($scope.currentLocation) {
      start = {
        longitude: $scope.currentLocation[0],
        latitude: $scope.currentLocation[1]
      };
    }
    start = _startPoint || start;

    var end = {
      longitude: _item.location.lng,
      latitude: _item.location.lat
    };

    var num = radiansTo(start, end) * 3958.8;
    return Math.round(num * 100) / 100;
  }
});
   