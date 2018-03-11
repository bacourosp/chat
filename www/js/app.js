// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic', 'ionic-material','starter.directives','starter.tabsDirectives',
  'ngMap',
  'ngCordova', 
  'uiGmapgoogle-maps',
  'services-face-data',
  'services-login', 'ionic.rating',
  'ionMdInput', 'ngStorage',
  'ionic-ratings','ionic-datepicker','ionic-timepicker']);

app.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)

        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            //cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})
//*************************
app.config(function (ionicDatePickerProvider) {
    var datePickerObj = {
      inputDate: new Date(),
      titleLabel: 'Fecha',
      setLabel: 'Siguiente',
      closeLabel: 'Cancelar',
      mondayFirst: false,
      weeksList: ["D", "L", "M", "M", "J", "V", "S"],
      monthsList: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Sept", "Octubre", "Nov", "Diciembre"],
      templateType: 'popup',
      from: new Date(2017, 1, 1),
      to: new Date(2018, 1, 1),
      showTodayButton: false,
      dateFormat: 'yyyy MMMM dd',
      closeOnSelect: false,
      disableWeekdays: []
    };
    ionicDatePickerProvider.configDatePicker(datePickerObj);
  })
//**************************
.config(function (ionicTimePickerProvider) {
    var timePickerObj = {
      inputTime: (((new Date()).getHours() * 60 * 60) + ((new Date()).getMinutes() * 60)),
      format: 24,
      step: 15,
      setLabel: 'Set',
      closeLabel: 'Cancelar'
    };
    ionicTimePickerProvider.configTimePicker(timePickerObj);
  })
//*****************************
app.config(function ($stateProvider, $urlRouterProvider,
    uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
    key: 'AIzaSyD_7wqNdo9RVnJPrPfJioUU1CW8Q7QBdF0',
    libraries: 'weather,geometry,visualization'
  })
    $stateProvider

    .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
    })
    .state('loginManual', {
        url: '/loginManual',
        templateUrl: 'views/auth/loginManual.html',
        controller: 'LoginManualCtrl'
    })
    .state('restablecerClave', {
        url: '/restablecerClave',
        templateUrl: 'views/auth/restablecerClave.html',
        controller: 'restablecerClaveCtrl'
    })
     .state('registro', {
        url: '/registro',
        templateUrl: 'views/auth/registro.html',
        controller: 'RegistroCtrl',
        params: {
                'usuario': {}, 
                'email': {}, 
                'password': {}
            }
    })
     .state('preregistro', {
        url: '/preregistro',
        templateUrl: 'views/auth/preregistro.html',
        controller: 'PreRegistroCtrl'
    })


    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

    .state('app.lists', {
        url: '/lists',
        views: {
            'menuContent': {
                templateUrl: 'templates/lists.html',
                controller: 'ListsCtrl'
            }
        }
    })

    .state('app.ink', {
        url: '/ink',
        views: {
            'menuContent': {
                templateUrl: 'templates/ink.html',
                controller: 'InkCtrl'
            }
        }
    })

    .state('app.motion', {
        url: '/motion',
        views: {
            'menuContent': {
                templateUrl: 'templates/motion.html',
                controller: 'MotionCtrl'
            }
        }
    })

    .state('app.components', {
        url: '/components',
        views: {
            'menuContent': {
                templateUrl: 'templates/components.html',
                controller: 'ComponentsCtrl'
            }
        }
    })

    .state('app.extensions', {
        url: '/extensions',
        views: {
            'menuContent': {
                templateUrl: 'templates/extensions.html',
                controller: 'ExtensionsCtrl'
            }
        }
    })

    .state('app.bares-destacados', {
        url: '/bares-destacados',
        views: {
            'menuContent': {
                templateUrl: 'templates/bares-destacados.html',
                controller: 'BaresCtrl'
            }
        }
    })

    .state('app.bares-todos', {
        url: '/bares-todos',
        views: {
            'menuContent': {
                templateUrl: 'templates/bares-todos.html',
                controller: 'BaresTodosCtrl'
            }
            
        }
    })

    .state('app.favoritos-hoteles', {
        url: '/favoritos-hoteles',
        views: {
            'menuContent': {
                templateUrl: 'templates/favoritos/favoritos-hoteles.html',
                controller: 'FavoritosHotelesCtrl'
            }
        }
    })

    .state('app.favoritos-bares', {
        url: '/favoritos-bares',
        views: {
            'menuContent': {
                templateUrl: 'templates/favoritos/favoritos-bares.html',
                controller: 'FavoritosBaresCtrl'
            }
            
        }
    })
    .state('app.favoritos-boliches', {
        url: '/favoritos-boliches',
        views: {
            'menuContent': {
                templateUrl: 'templates/favoritos/favoritos-boliches.html',
                controller: 'FavoritosBolichesCtrl'

            }
        }
    })
    .state('app.historial', {
        url: '/historial',
        views: {
            'menuContent': {
                templateUrl: 'templates/historial/historial.html',
                controller: 'HistorialCtrl'

            }
        }
    })
     .state('app.opciones', {
        url: '/opciones',
        views: {
            'menuContent': {
                templateUrl: 'templates/opciones.html',
                controller: 'OpcionesCtrl'

            }
        }
    })
          .state('app.actualizar_clave', {
        url: '/actualizar_clave',
        views: {
            'menuContent': {
                templateUrl: 'templates/opciones/actualizar-clave.html',
                controller: 'ActualizarCalveOpcionesCtrl'

            }
        }
    })
      .state('app.establecimientos', {
        url: '/establecimientos/{categoryId}/{categoryTitle}/{categoryLogo}/{categoryFondo}/{categoryEtiquetas}/{categoryDescripcion}/{categoryUbicacion}/{categoryLatitud}/{categoryLongitud}/',
        views: {
            'menuContent': {
                templateUrl: 'templates/establecimientos.html',
                controller: 'GeoPerfilCtrl'
            }
            
        }

    })

      .state('app.galerias', {
        url: '/galerias',
        views: {
            'menuContent': {
                templateUrl: 'templates/galerias.html',
                controller: 'GaleriaCtrl'
            }
            
        }

    })
        .state('app.bares', {
                url: '/bares',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/establecimientos/bares.html',
                                        controller: 'EstablecimientosBaresCtrl'

                    }
                }
            })
        .state('app.hoteles', {
                url: '/hoteles',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/establecimientos/hoteles.html',
                                        controller: 'EstablecimientosHotelesCtrl'

                    }
                }
            })

        .state('app.hoteles-destacados', {
        url: '/hoteles-destacados',
        views: {
            'menuContent': {
                templateUrl: 'templates/hoteles-destacados.html',
                                controller: 'BaresCtrl'

            }
        }
    })
        .state('app.hoteles-todos', {
        url: '/hoteles-todos',
        views: {
            'menuContent': {
                templateUrl: 'templates/hoteles-todos.html',
                                controller: 'BaresCtrl'

            }
        }
    })
        .state('app.boliches', {
        url: '/boliches',
        views: {
            'menuContent': {
                templateUrl: 'templates/establecimientos/boliches.html',
                controller: 'EstablecimientosBolichesCtrl'

            }
        }
    })

        .state('app.map', {
        url: '/map',
        views: {
            'menuContent': {
                templateUrl: 'templates/map.html',
                controller: 'MapCtrl'

            }
        }
    })

    .state('app.geodistance', {
        url: '/geodistance',
        views: {
            'menuContent': {
                templateUrl: 'templates/geodistance.html',
                controller: 'GeoCtrl'

            }
        }
    })

    .state('app.tabs', {
        url: '/tabs',
        views: {
            'menuContent': {
                templateUrl: 'templates/tabs.html',
                controller: 'TabsCtrl'

            }
        }
    })

  .state('app.perfil', {
        url: '/perfil',
        views: {
            'menuContent': {
                templateUrl: 'templates/perfil.html',
                controller: 'GeoPerfilCtrl'

            }
        }
    })

  .state('app.reviews', {
        url: '/reviews',
        views: {
            'menuContent': {
                templateUrl: 'templates/reviews.html',
                controller: 'ReviewsCtrl'

            }
        },
        params: {
                'nombre': {}, 
                'reviews': {}, 
                'idUser': {}
            }
    })

 .state('app.como-llegar', {
        url: '/como-llegar/{categoryId}/{categoryTitle}/{categoryLogo}/{categoryEtiquetas}/{categoryUbicacion}/{categoryLatitud}/{categoryLongitud}/',
        views: {
            'menuContent': {
                templateUrl: 'templates/como-llegar.html',
                controller: 'GeoPerfilCtrl'

            }
        }
    })

 

    ;


    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('app/bares');
//IF CONDICIONAL QUE PREGUNTE POR SI ES NULO EN ID DE USER 

    // console.log("antes al if valo idUser :"+$localStorage.idUser );
    // if($localStorage.idUser == null || $localStorage.idUser == 0 ){
    // console.log("Entrando al if valo idUser :"+$localStorage.idUser );
    //         $state.go('login');
    //     }else {
    //         console.log("Entrando al else valo idUser :"+$localStorage.idUser );
    //         $state.go('app.bares');
    //     }



});

