app.controller('ActualizarCalveOpcionesCtrl', 
	function($scope, $state, $http,  $ionicPopup) {
	
 $scope.actual = {};
 $scope.nueva = {};
 $scope.confirmar = {};
 $scope.mensaje = {};

 $scope.actualizarCalve = function(){
 console.log("actual :" +$scope.actual.value+ "   nueva :" +$scope.nueva.value+  "   confirmar : " +$scope.confirmar.value );
 	if (($scope.nueva.value === $scope.confirmar.value) && $scope.actual.value != null) {
 		 console.log("Validado");
 		 $http({
			  method: 'POST',
			  url: 'http://www.altavistaweb.com.ve/banight-api/public/api/v1/changepass',
			  headers: 
			   { 'content-type': 'multipart/form-data' },
			  params: 
			   { 	iduser: '19',
				     contrasenaactual: $scope.actual.value,
				     contrasenanueva: $scope.nueva.value,
				     contrasenaconfirmarnueva: $scope.confirmar.value
			    }
			  }).success(function(response) {

			        console.log("Recibiendo **data ->  " +JSON.stringify(response));

			        $scope.mensaje = response;
			        
			        if ($scope.mensaje.SUCCESS != null) {
			        	console.log("Recibiendo **data ->  " +JSON.stringify($scope.mensaje.SUCCESS));
			        	 $ionicPopup.alert({
			                title: '',
			                template: '<center> <img ng-src="../img/icon/icon-aprobacion.png" style="width: 25%;"></img> </br> <p style="font-family:"Karla"; color: rgb(46, 46, 46); line-height: 1.279;">¡Listo! </br> Tu contraseña fue cambiada.</p></center>',
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
			        if ($scope.mensaje.ERRORPASSACTUAL != null) {
			        	console.log("Recibiendo **data ->  " +JSON.stringify($scope.mensaje.ERRORPASSACTUAL));
			        	 $ionicPopup.alert({
			                title: '',
			                template: '<center> <img ng-src="../img/icon/icon-exclamacion.png" style="width: 25%;"></img> </br> <p style="font-family:"Karla"; color: rgb(46, 46, 46); line-height: 1.279;">¡Ups! </br> Tu contraseña nueva no coincide con la confirmación. Por favor intenta nuevamenete. </p></center>',
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
			         if ($scope.mensaje.ERRORDB != null) {
			        	console.log("Recibiendo **data ->  " +JSON.stringify($scope.mensaje.ERRORDB));
			        	 $ionicPopup.alert({
			                title: '',
			                template: '<center> <img ng-src="../img/icon/icon-exclamacion.png" style="width: 25%;"></img> </br> <p style="font-family:"Karla"; color: rgb(46, 46, 46); line-height: 1.279;">¡Ups! </br> Error al actualizar los datos. </p></center>',
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
			         if ($scope.mensaje.ERRORPASSNUEVA != null) {
			        	console.log("Recibiendo **data ->  " +JSON.stringify($scope.mensaje.ERRORPASSNUEVA));
			        	 $ionicPopup.alert({
			                title: '',
			                template: '<center> <img ng-src="../img/icon/icon-exclamacion.png" style="width: 25%;"></img> </br> <p style="font-family:"Karla"; color: rgb(46, 46, 46); line-height: 1.279;">¡Ups! </br> Tu contraseña nueva no coincide con la confirmación. Por favor intenta nuevamenete.s</p></center>',
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
 		console.log("eslse Validado");
 		$ionicPopup.alert({
			                title: '',
			                template: '<center> <img ng-src="../img/icon/icon-exclamacion.png" style="width: 25%;"></img> </br> <p style="font-family:"Karla"; color: rgb(46, 46, 46); line-height: 1.279;">¡Ups! </br> Los Campos no son validos</p></center>',
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
 }


});