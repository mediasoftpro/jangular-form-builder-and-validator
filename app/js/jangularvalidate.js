(function(window, angular, undefined) {'use strict';
angular.module('jugnoon-validate', [])
.factory('jangularvalidate', [
	  function(){
		var _output = {
			css: "has-success",
			message: "",
			isvalid: false
		};
		
		var _validateionLog = [];
		
		function _validate(obj, value, values) {
			if(typeof obj != "undefined") {
				  if(obj.required != "undefined") {
					  // required check -> highest priority
					  if(obj.required) {
						  if(typeof value != "undefined") {
							if (value.trim() == "") {
								_output.css = "has-error";
								if(typeof obj.requiredMessage != "")
								   _output.message = obj.requiredMessage;
								return _output;
							}
						  } else if(typeof values != "undefined") {
							  if(values.length == 0) {
								  _output.css = "has-error";
								  if(typeof obj.requiredMessage != "")
									_output.message = obj.requiredMessage;
								  return _output;
							  }
						  }
					  } 
				  }
				  if (typeof obj.type != 'undefined') {
					  if(typeof value != "undefined") {
						  switch(obj.type) {
							  // numeric case works on text areas
							  case "numeric":
								 var _pattern = /[\d]+/;
								 if(!_pattern.test(value)) {
									 _output.css = "has-error";
									  if(typeof obj.numericMessage != "")
										 _output.message = obj.numericMessage;
									  return _output;
								 } else {
									 // number validated
									 // check for min
									 if(typeof obj.min != "undefined") {
										 if(parseInt(value) < parseInt(obj.min)) {
											 _output.css = "has-error";
											  if(typeof obj.minMessage != "")
												 _output.message = obj.minMessage;
											  return _output;
										 }
									 }
									 // max validation
									 if(typeof obj.max != "undefined") {
										 if(parseInt(value) > parseInt(obj.max)) {
											 _output.css = "has-error";
											  if(typeof obj.maxMessage != "")
												_output.message = obj.maxMessage;
											  return _output;
										 }
									 }
								 } // close numeric else
							  break;
							  case "string":
								 // min string validation
								 if(typeof obj.min != "undefined") {
									 if(value.length < obj.min) {
										 _output.css = "has-error";
										  if(typeof obj.minMessage != "")
											 _output.message = obj.minMessage;
										  return _output;
									 }
								 }
								 // max string validation
								 if(typeof obj.max != "undefined") {
									 if(value.length > obj.max) {
										  _output.css = "has-error";
										  if(typeof obj.maxMessage != "")
											 _output.message = obj.maxMessage;
										  return _output;
									 }
								 }
								 
								 // regular expression
								 if(typeof obj.pattern != "undefined") {
									 var _pattern = obj.pattern;
									 if(!_pattern.test(value)) {
										  _output.css = "has-error";
										  if(typeof obj.patternMessage != "")
											 _output.message = obj.patternMessage;
										  return _output;
									 }
								 }
								 
							  break;
						  } // close switch
					  } // close if
				  } // close obj.type
			  }
			// validated
			return  {
				css: "has-success",
				message: "",
				isvalid: true
			};
		}
				
		return {
			formvalidate: function(obj) {
				_validateionLog = []; // reset
				for(var i=0;i<= obj.length - 1; i++) {
					  var _val = obj[i];
					  var _log = _validate(_val.validate, _val.value, _val.values);
					  if(!_log.isvalid) {
						 _validateionLog.push({
							 message: _log.message
						 });
					  }
				 }
				 return _validateionLog;
			},
			validate: function(obj, value, values) {
				return _validate(obj,value,values);
				// close output
			}
		};
}]);
})(window, window.angular);
