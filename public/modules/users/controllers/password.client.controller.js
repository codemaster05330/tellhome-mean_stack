'use strict';

angular.module('users').controller('PasswordController', ['$scope', '$stateParams', '$state', 'User',
	function($scope, $stateParams, $state, User) {
		// $scope.authentication = Principal;

		//If user is signed in then redirect back home
		if ($scope.authentication.isAuthenticated()) $state.go('home');

		// Principal.identity().then(function(response){
			// $scope.authentication.user = response;

			// Submit forgotten password account id
			$scope.askForPasswordReset = function() {
				User.askForPasswordReset($scope.credentials).then(
					function(response){
						$scope.success = response.message;
						$scope.credentials = null;
					},
					function(error){
						$scope.error = error;
						$scope.credentials = null;
					}
				);
			};

			// Change user password
			$scope.resetUserPassword = function() {
				$scope.success = $scope.error = null;
				User.resetPassword($scope.passwordDetails, $stateParams.token).then(
					function(response){
						// If successful show success message and clear form
						$scope.success = response.message;
						$scope.passwordDetails = null;

						// And redirect to the index page
						$state.go('reset-success');
					},
					function(error){
						$scope.error = error.message || error;
						$scope.passwordDetails = null;
					}
				);
				// $scope.success = $scope.error = null;

				// $http.post('/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function(response) {
				// 	// If successful show success message and clear form
				// 	$scope.passwordDetails = null;

				// 	// Attach user profile
				// 	// Principal.user() = response;

				// 	// And redirect to the index page
				// 	$state.go('reset-success');
				// }).error(function(response) {
				// 	$scope.error = response.message;
				// });
			};
		// });
	}
]);