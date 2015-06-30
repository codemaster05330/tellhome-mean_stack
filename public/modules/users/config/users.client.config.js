'use strict';

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider',
	function($httpProvider) {
    $httpProvider.interceptors.push(function($q, $location) {
      return {
        responseError: function(response) {
          console.log('intercepted rejection of ', response.config.url, response.status);
          if (response.status === 401 || response.status === 403) {
            // save the current location so that login can redirect back
            $location.nextAfterLogin = $location.path();
            $location.path('/login');
          }
          return $q.reject(response);
        }
      };
    });
}]);


// Config HTTP Error Handling
// angular.module('users').config(['$httpProvider',
// 	function($httpProvider) {
// 		// Set the httpProvider "not authorized" interceptor
// 		$httpProvider.interceptors.push(['$q', '$location', 'Principal',
// 			function($q, $state, Principal) {
// 				return {
// 					responseSuccess: function(response) {
// 						Principal.identity().then(function(user){
// 							console.log(user);
// 							// $rootScope.user = user;
// 						}, function(error){
// 							console.log("Coudn't get current user. \n ERROR: "+error);
// 						});
						
// 					},
// 					responseError: function(rejection) {
// 						switch (rejection.status) {
// 							case 401:
// 								// Deauthenticate the global user
// 								Principal.authenticate(null);

// 								// Redirect to signin page
// 								$location.path('/signin');
// 								break;
// 							case 403:
// 								// Add unauthorized behaviour 
// 								break;
// 						}

// 						return $q.reject(rejection);
// 					}
// 				};
// 			}
// 		]);
// 	}
// ]);