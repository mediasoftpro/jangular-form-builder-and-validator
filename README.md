<h2>Angular JS Dynamic Form Creator and Validator</h2>
It can help you create dynamic form and attach validation for each field using simple configuration.

Sample configuration will create two required fields title and description.

<pre>var formConfig = {
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
		     }]
};</pre>

The following elements supported by form builder<br />

i: Textbox<br />
ii: Text Area<br />
iii: Select<br />
iv: Radio Button<br />
v: Check Boxes<br />

<p>You can add unlimited form elements in your form.</p>

<h3>Adding category attribute in your form</h3>
<pre>
{
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
				value: "Dealer"
			},{
				id: "45",
				value: "Musician"
			},{
				id: "55",
				value: "Artist"
			}], 
}
</pre>

<h3>Validator Attributes</h3>
<pre>
validate: {
				required: true,
				requiredMessage: "Please enter amount", 
				type: 'numeric', 
				numericMessage: "Please enter numbers",
				min: 10, 
				minMessage: "Chars should not be less than 10", 
				max: 100, // max range validation
				maxMessage: "Chars should not be greater than 100", 
				pattern: /^(\([0-9]{3}\)(\s|)|[0-9]{3}-)[0-9]{3}-[0-9]{4}$/, 
				patternMessage: "Invalid phone number, should follow (212) 123-1234 format" 
			}
</pre>

<ul>
  <li><strong>required:</strong>  set required attribute true or false</li>
  <li><strong>requiredMessage</strong>  required message to display if validation failed</li>
  <li><strong>type:</strong>  set attribute type numeric or string.</li>
  <li><strong>numericMessage</strong> numeric message to display if validation failed</li>
  <li><strong>min:</strong>  min range validation</li>
  <li><strong>minMessage</strong>  min range display message</li>
  <li><strong>max:</strong>  max range validation</li>
  <li><strong>maxMessage</strong>  max range display message</li>
  <li><strong>pattern:</strong>  regular expression</li>
  <li><strong>patternMessage</strong> regular expression validation message</li>
</ul>

<h3>Using jAngular in your existing module</h3>
<pre>
var jangularApp = angular.module('mediasoftApp', ['ngRoute', 'jugnoon-validate'])
   .controller('mainController', ['$scope', 'jangularvalidate', function ($scope, jangularvalidate) {
   }]);
</pre>

<a href="http://bootstrapkits.com/jangular-form-builder-and-validator/#/">Live Demo</a>
