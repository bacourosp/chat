app.controller('AppCtrl', function ($scope, $rootScope, $localStorage,
    $sessionStorage, $state, $ionicHistory,
    $ionicModal, $ionicPopover, $timeout) {
    // Form data for the login modal
    $scope.loginData = {};
    //$localStorage.idUser = 0;

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function () {
            this.classList.toggle('active');
        });
    }

     var fab = document.getElementById('fab');
    fab.addEventListener('click', function () {
        //location.href = 'https://twitter.com/satish_vr2011';
        window.open('#', '_blank');
    });

    // .fromTemplate() method
    var template = '<ion-popover-view>' +
                    '   <ion-header-bar>' +
                    '       <h1 class="title">Busqueda</h1>' +
                    '   </ion-header-bar>' +
                    '   <ion-content class="padding">' +
                    '     Panel Para Busqueda' +
                    '   </ion-content>' +
                    '</ion-popover-view>';

    $scope.popover = $ionicPopover.fromTemplate(template, {
        scope: $scope
    });
    $scope.closePopover = function () {
        $scope.popover.hide();
    };
    //Cleanup the popover when we're done with it!
    $scope.$on('$destroy', function () {
        $scope.popover.remove();
    });
//Control ApplocalStorage.getItem('tip')
$rootScope.comprobarUser = function(){
console.log("Entrando a la funcion comprobarUser, el usuaruio es : "+ $localStorage.idUser);
    if($localStorage.idUser == null || $localStorage.idUser == 0 ){
console.log("Entrando al if comprobarUser");
    $state.go('login');
        }
}

$rootScope.comprobarUser();


//** cerrar sesion y ELIMINAR HISTORIAL
$scope.cerrarSesion = function(idUser){
    //$localStorage.$reset();
    //$localStorage.idUser.$reset();
    console.log("cerrarSesion ACTUAL DEL Usuario : " + $localStorage.idUser);
    //delete $localStorage.idUser;
    
    $ionicHistory.removeBackView();
    $ionicHistory.clearHistory();
    $ionicHistory.clearCache();
    
    $localStorage.idUser = idUser;
    if ($localStorage.idUser > 0) {
            $localStorage.idUser = 0;
                $state.go('login');
console.log("Retornando Login con el Usuario : " + $localStorage.idUser);

            return $localStorage.idUser;
    } else {
            console.log("No Pudo cerrarSesion ACTUAL el Usuario : " + $localStorage.idUser);

    }
    return $localStorage.idUser;

};
//$scope.cerrarSesion();

    //**********FINAL ARCHIVO
});