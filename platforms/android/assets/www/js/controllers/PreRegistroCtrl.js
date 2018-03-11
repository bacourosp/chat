app.controller('PreRegistroCtrl', 
	function ($scope, $state,
		$cordovaCamera, 
		$cordovaFile, 
		$cordovaFileTransfer, 
		$cordovaDevice, 
		$ionicPopup, 
		$cordovaActionSheet,
		$cordovaDatePicker, 
		$ionicPlatform,
        $timeout,
        $http) 
    {

        $scope.image = null;
        $scope.users = [];
        $scope.tempUserData = {};
        $scope.usuario = {};
        $scope.email = {};
        $scope.password = {};
        $scope.parseJson = [];
    
       
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
         //Verificar Email Paso1 Registro
        // $scope.checkUserJson = [];
        $scope.checkUser = function($event){  
            
        };

//Verificar Email Paso1 Registro
         $scope.checkUserJson = [];

        $scope.checkUser = function($event){  
    
              
                    if(true){
                       
                        $http.get("http://www.altavistaweb.com.ve/banight-api/public/api/v1/checkuser/"+$scope.usuario.value+"/"+$scope.email.value).
                        success(function(response){
                            $scope.parseJson = response;
                             console.log("RESPUESTA DEL API: " +  $scope.parseJson[0].SUCCESS);
                           /* switch (response) {
                              case ($scope.parseJson[0].ERROR-2):
                                alert("usuario 0");
                                break;
                              case ($scope.parseJson[0].EMAIL):
                                alert("email 1");
                                break;
                              default:
                                $state.go('registro');
                                break;
                            };*/
                               if($scope.parseJson[0].SUCCESS == "ok"){
                                  console.log("user data -> $scope.usuario " + $scope.usuario.value);
                                  console.log("mail data -> $scope.email " + $scope.email);
                                  console.log("password data -> $scope.password " +$scope.password); 

                                //$rootScope.usuario = $scope.usuario.value;
                                //$rootScoperootScope.email = $scope.email.value;
                                //$scope.password = $scope.password.value;
                                $state.go('registro', { 'usuario':$scope.usuario.value, 'email':$scope.email.value, 'password':$scope.password.value });

                            }else{
                                console.log("RESPUESTA DEL API: " + response );
                                $ionicPopup.alert({
                                  title: 'ERROR',
                                  template: 'EL email o Usuario ingresado ya se encuentra registrado en nuestra base de datos.',
                                  scope: $scope,
                                  buttons: [
                                      {
                                        text: 'OK',
                                        type: 'button-positive',
                                        onTap: function(e) {
                                           $state.go('login');
                                        }
                                      },
                                    ]
                                });
                            }
                        });
                    }

        };


    // function to get records from the database
    $scope.getRecords = function(){
        $http.put('http://138.197.30.57/api/action.php', {
          headers : {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods' : 'GET,POST,PUT,DELETE,OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
            'Content-Type': 'application/x-www-form-urlencoded;'
            },
            params:{
               'type':'view'
            }
        }).success(function(response){
            if(response.status == 'OK'){
                $scope.users = response.records;
            }
        });
    };
    
    // function to insert or update user data to the database
    $scope.saveUser = function(type){
        var data = $.param({
            'data':$scope.tempUserData,
            'type':type
        });
        var config = {
            headers : {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods' : 'GET,POST,PUT,DELETE,OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
            'Content-Type': 'application/x-www-form-urlencoded;'
            }
        };
        $http.post("http://138.197.30.57/api/action.php", data, config).success(function(response){
            if(response.status == 'OK'){
                if(type == 'edit'){
                    $scope.users[$scope.index].id = $scope.tempUserData.id;
                    $scope.users[$scope.index].name = $scope.tempUserData.name;
                    $scope.users[$scope.index].email = $scope.tempUserData.email;
                    $scope.users[$scope.index].phone = $scope.tempUserData.phone;
                    $scope.users[$scope.index].created = $scope.tempUserData.created;
                }else{
                    $scope.users.push({
                        id:response.data.id,
                        name:response.data.name,
                        email:response.data.email,
                        phone:response.data.phone,
                        created:response.data.created
                    });
                    
                }
                $scope.userForm.$setPristine();
                $scope.tempUserData = {};
                $('.formData').slideUp();
                $scope.messageSuccess(response.msg);
            }else{
                $scope.messageError(response.msg);
            }
        });
    };
    
    // function to add user data
    $scope.addUser = function(){
        $scope.saveUser('add');
    };
    
    // function to edit user data
    $scope.editUser = function(user){
        $scope.tempUserData = {
            id:user.id,
            name:user.name,
            email:user.email,
            phone:user.phone,
            created:user.created
        };
        $scope.index = $scope.users.indexOf(user);
        $('.formData').slideDown();
    };
    
    // function to update user data
    $scope.updateUser = function(){
        $scope.saveUser('edit');
    };
    
    // function to delete user data from the database
    $scope.deleteUser = function(user){
        var conf = confirm('Are you sure to delete the user?');
        if(conf === true){
            var data = $.param({
                'id': user.id,
                'type':'delete'    
            });
            var config = {
                headers : {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods' : 'GET,POST,PUT,DELETE,OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
                'Content-Type': 'application/x-www-form-urlencoded;'
                }    
            };
            $http.post("http://138.197.30.57/api/action.php",data,config).success(function(response){
                if(response.status == 'OK'){
                    var index = $scope.users.indexOf(user);
                    $scope.users.splice(index,1);
                    $scope.messageSuccess(response.msg);
                }else{
                    $scope.messageError(response.msg);
                }
            });
        }
    };
    
    // function to display success message
    $scope.messageSuccess = function(msg){
        $('.alert-success > p').html(msg);
        $('.alert-success').show();
        $('.alert-success').delay(5000).slideUp(function(){
            $('.alert-success > p').html('');
        });
    };
    
    // function to display error message
    $scope.messageError = function(msg){
        $('.alert-danger > p').html(msg);
        $('.alert-danger').show();
        $('.alert-danger').delay(5000).slideUp(function(){
            $('.alert-danger > p').html('');
        });
    };
  //**********************Seccion de formulario fin

  //********************seccion de carga de imagen
 
  $scope.showAlert = function(title, msg) {
    var alertPopup = $ionicPopup.alert({
      title: title,
      template: msg
    });
  };
  


// The rest of the app comes in here (FIN)
});