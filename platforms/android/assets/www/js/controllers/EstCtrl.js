app.controller('EstCtrl', function ($scope, $stateParams, ionicMaterialMotion, $http, $state) {


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

    $scope.blinds();

	$scope.category_sources = [];

	$scope.categoryId = $stateParams.categoryId;
	//console.log(categoryId);

	$http.get('feeds-categories-bares.json').success(function(response) {
		var category = find(response, {id: $scope.categoryId});
		console.log(category);
		$scope.categoryTitle = category.title;
		$scope.category_sources = category.feed_sources;
	});

	
	//console.log($scope.categoryId);
	/*$http.get('feeds-categories.json').success(function(response) {
		var nombre = find(response, {id: $scope.categoryId});

		//var category = {id: $scope.categoryId}
		$scope.categoryNombre = nombre.title;
		 
	});*/

});