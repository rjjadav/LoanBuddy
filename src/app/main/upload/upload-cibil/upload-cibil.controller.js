'use strict';

angular.module('app.upload')
.controller('UploadCibilController', UploadCibilController);

UploadCibilController.$inject = ['$http','$state','toastr','Upload','data','api'];


function UploadCibilController($http, $state, toastr, Upload, data, api){
	var cibil = this;
	cibil.uploadCibilReport = uploadCibilReport;

	cibil.cibilProfile = undefined;
	cibil.fetchingCibilDetails = false;

	function uploadCibilReport(cibilReport){
		cibil.fetchingCibilDetails = true;
		var myFormData = new FormData();
		myFormData.append('uploadCibil', cibilReport);

		$http.post(api.addCibil, myFormData, {
			transformRequest: function(){
				var formData = myFormData;
				return formData;
			},
			headers: {'Content-Type': undefined}
		})
		.then(function(response){
			// console.log(response);
			cibil.cibilProfile = response.data.cibilProfile;
			cibil.fetchingCibilDetails = false;
		})
		.catch(function(error){
			cibil.fetchingCibilDetails = false;
		})
	}
}