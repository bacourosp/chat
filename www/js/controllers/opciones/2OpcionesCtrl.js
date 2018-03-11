app.controller('OpcionesCtrl', 
	function ($scope, $state, $stateParams, $filter,
		$cordovaCamera, 
		$cordovaFile, 
		$cordovaFileTransfer, 
		$cordovaDevice, 
		$ionicPopup, 
		$cordovaActionSheet,
		$cordovaDatePicker, 
		$ionicPlatform,
    $timeout, 
    $localStorage,
    $sessionStorage,
    $http) {

        $scope.image = null;
        //$scope.users = [];
        $scope.tempUserData = {};
        //$scope.usuario = {};
        //$scope.email = {};
        //$scope.password = {};
        $scope.genero = {};
        $scope.fecha = {};
        $scope.parseJson = [];
      
        var usuario1 = $stateParams.usuario;
        var email1 = $stateParams.email;
        var password1 = $stateParams.password;

      console.log("user data -> $scope.usuario: " + usuario1);
      console.log("mail data -> $scope.email: " + email1);
      console.log("password data -> $scope.password " +password1);
       
        //*****************GET INFOR OBJECT*************// 
        //siguiente foco
        $scope.focusNext = function($event){

             var keyCode = $event.which || $event.keyCode;
                if (keyCode === 13) {
                    // focus next
                   
                }

        };
        //aceptar - boton enter
        $scope.botonEnter = function($event){

             var keyCode = $event.which || $event.keyCode;
                if (keyCode === 13) {
                    $scope.checkUser($event);
                }

        };

  //**********************Seccion de formulario fin
//******************Crear Usuario
 //Retorna: IdUsr
 //Parametros: /addUser/{User}/{Mail}/{password}/{URL-foto-perfil}/{Genero}/{Fecha-Nacimoento}
 $scope.CrearUser = function(){ 
  var fecha1 = null;
  if ($scope.image===null) {
    $scope.image = "url_avatar1";
  } 
  if($scope.fecha!=null){
    fecha1 = $filter('date')($scope.fecha.value, "yyyy/MM/dd");
    console.log("fecha format: "+ fecha1);
  }
  
$http({
  method: 'POST',
  url: 'http://138.197.30.57:8888/api/v1/adduser',
  headers: 
   { 'content-type': 'multipart/form-data' },
  params: 
   { user: usuario1,
     mail: email1,
     contrasena: password1,
     avatar: $scope.image.value,
     genero: $scope.genero.value,
     fecha_nacimiento: fecha1 
    }
  }).success(function(response) {
        $localStorage.idUser = response; 
        console.log("Recibiendo **data ->  " +response);
        $state.go('app.bares-destacados');
              
    }).error(function(response) {
        $scope.codeStatus = response || "Request failed";

        console.log("Recibiendo error ->  " +response);
    });

 };
  //********************seccion de carga de imagen
 
  $scope.showAlert = function(title, msg) {
    var alertPopup = $ionicPopup.alert({
      title: title,
      template: msg
    });
  };



   $ionicPlatform.ready(function(){
  
    $scope.showDatePicker = function(){
      


       var options = {
          date: new Date("YYYY-MM-DD"),
          mode: 'date', // or 'time'
          minDate: new Date() - 10000,
          allowOldDates: true,
          allowFutureDates: false,
          doneButtonLabel: 'Salir',
          doneButtonColor: '#F2F3F4',
          cancelButtonLabel: 'Cancelar',
          cancelButtonColor: '#000000'

       };
       //$cordovaDatePicker.prototype.ANDROID_THEMES = {THEME_DEVICE_DEFAULT_DARK:4};
       $cordovaDatePicker.show(options).then(function(date){
         // alert(date);
       });
   };
 });

   $scope.ocultarTeclado = function() {
     // ocultarTeclado...
    // $event.preventDefault();
     //window.cordova.plugins.Keyboard.close();
    //cordova.Keyboard.close();
    // $scope.cordova.plugins.Keyboard.close();
    // $event.stopImmediatePropagation();
   //  cordova.plugins.Keyboard.close();
   // Keyboard.close();
   //cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);

   }
  


  $scope.loadSexo = function() {
   

    var myPopup = $ionicPopup.show({
    scope:$scope,
    cssClass: 'genero-popup',
    buttons:[
        {
            text: "HOMBRE",
            type: 'genero-stilo icon-left icon-hombre',
            onTap: function(){
              $scope.genero.value = 'Masculino';
             return $scope.genero.get;
                //myPopup.close();
            }
        },
        {
            text: "MUJER",
            type: 'genero-stilo icon-top icon-mujer',
            onTap: function(){
              $scope.genero.value = 'Femenino';
             return $scope.genero.get;
                //myPopup.close();
            }
        },
    ]
});

      return $scope.genero.get;     
   
  };
  
 // Returns the local path inside the app for an image
 // img/logos/logo_login.png
$scope.pathForImage = function(image) {
  if (image === null) {
    return 'img/icon/cargar_una_foto.png';
  } else {
    return cordova.file.dataDirectory + image;
  }
};
 
 // Present Actionsheet for switch beteen Camera / Library
$scope.loadImage = function() {
  var options = {
    title: 'BAnight: Seleciona Tu Foto!',
    buttonLabels: ['Desde la Galeria', 'Desdes la Camara'],
    addCancelButtonWithLabel: 'Cancelar',
    androidEnableCancelButton : true,
  };
  $cordovaActionSheet.show(options).then(function(btnIndex) {
    var type = null;
    if (btnIndex === 1) {
      type = Camera.PictureSourceType.PHOTOLIBRARY;
    } else if (btnIndex === 2) {
      type = Camera.PictureSourceType.CAMERA;
    }
    if (type !== null) {
      $scope.selectPicture(type);
    }
    console.log("Scope en la funcion loadImage" + type);
  });
  
};
// Take image with the camera or from library and store it inside the app folder
// Image will not be saved to users Library.
$scope.selectPicture = function(sourceType) {
  var options = {
    quality: 100,
    destinationType: Camera.DestinationType.FILE_URI,
    sourceType: sourceType,
    saveToPhotoAlbum: false
  };
 
  $cordovaCamera.getPicture(options).then(function(imagePath) {
    // Grab the file name of the photo in the temporary directory
    var currentName = imagePath.replace(/^.*[\\\/]/, '');
 
    //Create a new name for the photo
    var d = new Date(),
    n = d.getTime(),
    newFileName =  n + ".jpg";
 
    // If you are trying to load image from the gallery on Android we need special treatment!
    if ($cordovaDevice.getPlatform() == 'Android' && sourceType === Camera.PictureSourceType.PHOTOLIBRARY) {
      window.FilePath.resolveNativePath(imagePath, function(entry) {
        window.resolveLocalFileSystemURL(entry, success, fail);
        function fail(e) {
          console.error('Error: ', e);
        }
 
        function success(fileEntry) {
          var namePath = fileEntry.nativeURL.substr(0, fileEntry.nativeURL.lastIndexOf('/') + 1);
          // Only copy because of access rights
          $cordovaFile.copyFile(namePath, fileEntry.name, cordova.file.dataDirectory, newFileName).then(function(success){
            $scope.image = newFileName;
            $scope.url_avatar1 = "http://138.197.30.57/BAnight-movil/img/avatar/"+$scope.image;
            console.log("El nombre de la imagen es : " + $scope.image);
            console.log("La URL-avatar de la imagen es : " +"http://138.197.30.57/BAnight-movil/img/avatar/"+ $scope.image);
            console.log("url-avatar1 complet es " + url_avatar1);
            $scope.uploadImage();
          }, function(error){
            $scope.showAlert('Error', error.exception);
          });
        };
      }
    );
    } else {
      var namePath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
      // Move the file to permanent storage
      $cordovaFile.moveFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(function(success){
        $scope.image = newFileName;
      }, function(error){
        $scope.showAlert('Error', error.exception);
      });
    }
  },
  function(err){
    // Not always an error, maybe cancel was pressed...
  })
};
//subir imagen
$scope.uploadImage = function() {

  // Destination URL
  var url = "http://138.197.30.57/BAnight-movil/subir_img_desde_app.php";
 
  // File for Upload
  var targetPath = $scope.pathForImage($scope.image);
 
  // File name only
  var filename = $scope.image;;
  var trustHosts = true;
  //var options = {};
  var options = {
    fileKey: "file",
    fileName: filename,
    chunkedMode: false,
    mimeType: "multipart/form-data",
    params : {'fileName': filename}
  };


    
    

  $cordovaFileTransfer.upload(url, targetPath, options)
      .then(function(result) {
        // Success!
        $scope.showAlert('Mensaje Exito', 'La Imagen se Cargo Correctamente en el Servidor: ' + result);
      }, function(err) {
        // Error
        $scope.showAlert('Mensaje Error', 'Ha ocurrido en ERROR cargando La Imagen en el Servidor: ' + err);
      }, function (progress) {
        // constant progress updates
       // $scope.showAlert('Mensaje progress', 'constant progress updates: ' + progress);
      });

  
  /*$cordovaFileTransfer
  .upload(url, targetPath, options)
  .then(function(result) {
    $scope.showAlert('Mensaje', 'La Imagen se Cargo Correctamente en el Servidor.');
  });
  */
};
 
// The rest of the app comes in here (FIN)
});