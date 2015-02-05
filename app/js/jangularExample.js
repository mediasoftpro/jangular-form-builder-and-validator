"use strict";
// Configuration Options
var formConfig = {
	header: "Create Validator Form",
	formAttributes: [
	    {
			id: "caption",
			display: "Title (*)",
			value: "",
			placeHolder: "Enter title (required field)",
			type: "textbox",
			validate: {
				required: true,
				requiredMessage: "Please enter proper album title",
			}
		},
		{
			id: "description",
			display: "Description (*)",
			placeHolder: "Enter description",
			type: "textarea",
			rows: 8,
			value: "",
			validate: {
				required: true,
				requiredMessage: "Please enter product description",
			}
		},
		{
			id: "amount",
			display: "Amount (*)",
			placeHolder: "Enter amount (min: 10, max: 100)",
			type: "textbox",
			value: "",
			validate: {
				required: true,
				requiredMessage: "Please enter amount",
				type: 'numeric',
				numericMessage: "Please enter numbers",
				min: 10,
				minMessage: "Chars should not be less than 10",
				max: 100,
				maxMessage: "Chars should not be greater than 100"
			}
		},
		{
			id: "email",
			display: "Email (*)",
			placeHolder: "Enter email address",
			type: "textbox",
			value: "",
			validate: {
				required: true,
				requiredMessage: "Please proper email address",
				type: 'string',
				pattern: /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/,
				patternMessage: "Invalid email address"
			}
		},
		{
			id: "phone",
			display: "Phone (*)",
			placeHolder: "Enter phone",
			type: "textbox",
			value: "",
			validate: {
				required: true,
				requiredMessage: "Please enter phone number",
				type: 'string',
				pattern: /^(\([0-9]{3}\)(\s|)|[0-9]{3}-)[0-9]{3}-[0-9]{4}$/,
				patternMessage: "Invalid phone number, should follow (212) 123-1234 format"
			}
		},{
			id: "category",
			display: "Select Category",
			type: "dropdown",
			isMultiple: false,
			text: "Select",
			value: "",
			validate: {
				required: true,
				requiredMessage: "Please select category",
			},
			options: [{
				id: "34",
				value: "Animals"
			},{
				id: "45",
				value: "Banana"
			},{
				id: "55",
				value: "Apple"
			}], // list of options to display, id / value pair
		},{
			id: "category",
			display: "Select Multiple",
			type: "dropdown",
			isMultiple: true,
			validate: {
				required: true,
				requiredMessage: "Please select one or more categories",
			},
			text: "Select",
			values: [34,45],
			options: [{
				id: 34,
				value: "Animals"
			},{
				id: 45,
				value: "Banana"
			},{
				id: 55,
				value: "Apple"
			}], // list of options to display, id / value pair
		},{
			id: "privacy",
			display: "Privacy Option",
			type: "radio",
			validate: {
				required: true,
				requiredMessage: "Please select privacy option",
			},
			value: '',
			options: [{
				id: 1,
				value: "Public"
			},{
				id: 2,
				value: "Unlisted"
			},{
				id: 3,
				value: "Private"
			}], // list of options to display, id / value pair
		},{
			id: "pcheck",
			display: "Check Boxes",
			type: "check",
			validate: {
				required: true,
				requiredMessage: "Please select checkbox option",
			},
			values:[], // store selected checkbox objects
			options: [{
				id: 1,
				value: "Check 01",
				isselected: true
			},{
				id: 2,
				value: "Check 02",
				isselected: false
			},{
				id: 3,
				value: "Check 03",
				isselected: false
			},{
				id: 4,
				value: "Check 04",
				isselected: true
			},{
				id: 5,
				value: "Check 05",
				isselected: true
			}]
		}]
};
var templatePath = "app/templates/"; // angular template path
var gamifyapp = angular.module('mediasoftApp', ['ngRoute', 'jugnoon-validate'])

.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
        when('/', {
            templateUrl: templatePath + "validate/form.html",
            controller: 'mainController'
        }).
        otherwise({
            redirectTo: '/'
        });
  }])

.controller('mainController', ['$scope', 'jangularvalidate', function ($scope, jangularvalidate) {
	$scope.message = "";
    $scope.messagecss="alert-danger";
	$scope.validationLog = [];
	$scope.headerTitle = "Create Validator Form";
	if(typeof formConfig.header != 'undefined') {
		$scope.headerTitle =  formConfig.header;
	}
	
	$scope.formConfig = {};
	if(typeof formConfig.formAttributes != 'undefined') {
		$scope.formConfig =  formConfig.formAttributes;
	}

    $scope.isCheckBoxChecked = function (option, obj) {
		if(typeof obj != "undefined") {
			var _match = false;
			for (var i = 0 ; i < obj.length; i++) {
				if (obj[i].id == option) {
					_match = true;
				}
			}
			return _match;
		}
    };

    $scope.syncCheckBox = function (bool, item, obj) {
		if(typeof obj != "undefined") {
			if (bool) {
				// add item
				obj.push(item);
			} else {
				// remove item
				for (var i = 0 ; i < obj.length; i++) {
					if (obj[i].id == item.id) {
						obj.splice(i, 1);
					}
				}
			}
		}
    };
	
	
  $scope.create = function() {
	  // reset
	  $scope.validationLog = jangularvalidate.formvalidate($scope.formConfig);
      console.log($scope.validationLog);
	  if($scope.validationLog.length == 0) {
		  // validation ok
		  $scope.message = "Form processed successfully";
		  $scope.messagecss="alert-success";
	  }
	  else
	  {
		  $scope.message = "Validation Errors, Please fix it";
	  }
	 
  };
  
  $scope.validate = function(obj) {
	 if(typeof obj.validate != "undefined") {
		 var output = jangularvalidate.validate(obj.validate, obj.value, obj.values);
		 console.log(output);
		 obj.css = output.css;
		 obj.errorMsg = output.message;
		 obj.isvalidated = output.isvalid;
		 console.log(obj);
	 }
  };
  

}]);