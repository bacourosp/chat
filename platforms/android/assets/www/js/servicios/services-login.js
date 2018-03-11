angular.module('services-login', [])
.service('LoginService', function ($q, $http) {
    return {
        loginUser: function (loginData) {
            var deferred = $q.defer(),
                promise = deferred.promise;

            $http({
                url: 'http://someurl/login.php',
                method: "POST",
                data: loginData,
                headers: {'Content-Type': 'application/json'}
            })
                .then(function (response) {
                    if (response.data.error.code === "000") {
                        console.log("User login successful: " + JSON.stringify(response.data));
                        deferred.resolve(response.data);
                    } else {
                        console.log("User login failed: " + JSON.stringify(response.data.error));
                        deferred.reject(response.data);
                    }
                }, function (error) {
                    console.log("Server Error on login: " + JSON.stringify(error));
                    deferred.reject(error);
                });

            promise.success = function (fn) {
                promise.then(fn);
                return promise;
            };
            promise.error = function (fn) {
                promise.then(null, fn);
                return promise;
            };
            return promise;
        },
        
        registerUser: function (regData) {
            var deferred = $q.defer(),
                promise = deferred.promise;
            
            $http({
                url: 'http://someurl/register.php',
                method: "POST",
                data: regData,
                headers: {'Content-Type': 'application/json'}
            }).then(function (response) {
                if (response.data.error.code === "000") {
                    console.log("User login successful: " + JSON.stringify(response.data));
                    deferred.resolve(response.data);
                } else {
                    console.log("User login failed: " + JSON.stringify(response.data.error));
                    deferred.reject(response.data);
                }
            }, function (error) {
                console.log("Server Error on login: " + JSON.stringify(error));
                deferred.reject(error);
            });
            
            promise.success = function (fn) {
                promise.then(fn);
                return promise;
            };
            promise.error = function (fn) {
                promise.then(null, fn);
                return promise;
            };
            return promise;
        }
    };
});