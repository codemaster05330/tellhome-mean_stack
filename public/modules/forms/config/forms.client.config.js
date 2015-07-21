'use strict';

// Configuring the Forms drop-down menus
angular.module('forms').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'My Forms', 'forms', '', '/forms', false);
	}
]).filter('formValidity',
    function(){

        return function(formObj){
			//get keys
			var formKeys = Object.keys(formObj);

			//we only care about things that don't start with $
			var fieldKeys = formKeys.filter(function(key){
			return key[0] !== '$';
			});

			var fields = formObj.form_fields;
			// fieldKeys.map(function(key){
			//   return formObj[key];
			// });

			var valid_count = fields.filter(function(field){
				if(typeof field === 'object'){
				    return !!(field.fieldValue);
				}
			}).length;
			return valid_count;
        };
}).config(['$provide', function ($provide){
    $provide.decorator('accordionDirective', function($delegate) { 
        var directive = $delegate[0];
        directive.replace = true;
        return $delegate;
    });
}]);