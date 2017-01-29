'use strict';

angular.module('app.upload')
.controller('UploadPanController', UploadPanController);

UploadPanController.$inject = ['$http','$state','toastr','Upload','data','api'];

function UploadPanController($http, $state, toastr, Upload, data, api){
	var pan = this;
	pan.selectImage = selectImage;
	pan.uploadImage = uploadImage;

	pan.imageObj = undefined;
	pan.selectedImage = undefined;
	pan.uploadingImage = false;
	pan.pancardImageSaved = false;
	pan.pancardDetails = undefined;


	function selectImage(imageObj){
		pan.imageObj = imageObj;

		Upload.base64DataUrl(imageObj).then(function(urls){
			pan.selectedImage = urls;
		});
	}

	function uploadImage(croppedImage){
		pan.uploadingImage = true;
		var imageFile = dataURLtoFile(croppedImage, 'a.png');
		var myFormData = new FormData();
		myFormData.append('uploadPan', imageFile);

		// var pancardDetails = {
		// 	name: 'vishwajeet Singh',
		// 	pancardNo : 'DQLPS8000J',
		// 	refName : 'Santosh Kumar',
		// 	dateOfBirth : '10/06/1985'
		// }; 
		// myFormData.append('pancardDetails',JSON.stringify(pancardDetails));
		$http.post(api.addPanCard, myFormData, {
			transformRequest: function(){
				var formData = myFormData;
				return formData;
			},
			headers: {'Content-Type': undefined}
		})
		.then(function(response){
			console.log(response);
			if(response.data.pancardImageSaved){
				pan.pancardImageSaved = true;
				pan.pancardDetails = response.data.pancardDetails;
				// $state.go('app.upload.upload-aadhar');
			}else{
				toastr.error('Error Uploading File to Server. Please Try Again Later', 'Error');	
			}
			pan.uploadingImage = false;
		})
		.catch(function(error){
			toastr.error('Error Uploading File to Server. Please Try Again Later', 'Error');
			pan.uploadingImage = false;
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