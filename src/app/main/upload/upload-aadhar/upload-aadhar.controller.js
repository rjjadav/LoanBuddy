'use strict';

angular.module('app.upload')
.controller('UploadAadharController', UploadAadharController);

UploadAadharController.$inject = ['$http','$state','toastr','Upload','data','api'];

function UploadAadharController($http, $state, toastr, Upload, data, api){
	var aadhar = this;
	aadhar.selectImage = selectImage;
	aadhar.uploadImage = uploadImage;

	aadhar.imageObj = undefined;
	aadhar.selectedImage = undefined;
	aadhar.uploadingImage = false;
	aadhar.aadharimageSaved = false;
	aadhar.aadharDetails = undefined;



	function selectImage(imageObj){
		aadhar.imageObj = imageObj;
		Upload.base64DataUrl(imageObj).then(function(urls){
			// console.log(urls);
			aadhar.selectedImage = urls;
		});
	}

	function uploadImage(croppedImage){
		aadhar.uploadingImage = true;
		var imageFile = dataURLtoFile(croppedImage, 'a.png');
		var myFormData = new FormData();

		myFormData.append('uploadAadhar',imageFile);

		$http.post(api.addAadharCard, myFormData, {
			transformRequest: function(){
				var formData = myFormData;
				return formData;
			},
			headers: {'Content-Type': undefined}
		})
		.then(function(response){
			console.log(response);
			if(response.data.aadharimageSaved){
				// $state.go('app.upload.upload-cibil');
				aadhar.aadharimageSaved = true;
				aadhar.aadharDetails = response.data.aadharDetails;
			}else{
				toastr.error('Error Uploading Aadhar Card. Please Try Again Later.', 'Error');
			}
			aadhar.uploadingImage = false;
		})
		.catch(function(error){
			aadhar.uploadingImage = false;
			toastr.error('Error Uploading Aadhar Card. Please Try Again Later.', 'Error');
		});
	}

	function dataURLtoFile(dataurl, filename) {
		var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
			bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
		while(n--){
			u8arr[n] = bstr.charCodeAt(n);
		}
		return new File([u8arr], filename, {type:mime});
	}
}