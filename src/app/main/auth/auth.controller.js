'use strict';

angular.module('app.auth')
.controller('AuthController', AuthController);

AuthController.$inject = ['$http','$rootScope','$scope','$state','$cookies','toastr','api','data'];

function AuthController($http, $rootScope, $scope, $state, $cookies, toastr, api, data){
	var auth = this;
	auth.generateOtp = generateOtp;
	auth.verifyOtp = verifyOtp;
	auth.fnLogin = fnLogin;
	auth.onCaptureComplete = onCaptureComplete;
	auth.capture = capture;
	auth.addSelfie = addSelfie;

	auth.showOtp = true;
	auth.sendingOtp = false;
	auth.verifyingOtp = false;
	auth.capturingImage = false;
	auth.capturedImage = undefined;


	function generateOtp(mobile){
		auth.sendingOtp = true;
		data.post(api.saveAccount,{mobile : mobile}, {cache : false})
		.then(function(response){
			if(response.data.successfullyCreated == true){
				auth.showOtp = true;
			}
			else{
				toastr.error(response.data.message)
			}
			auth.sendingOtp = false;
		})
		.catch(function(error){
			console.log('error ::: ',error);
			auth.sendingOtp = false;
		})
	}

	function verifyOtp(login){
		auth.verifyingOtp = true;
		console.log(login);
		data.post(api.verifyOtp,login, {cache : false})
		.then(function(response){
			console.log(response);
			if(response.data.isOtpVerified){
				auth.fnLogin(login)
			}else{
				auth.verifyingOtp = false;
				toastr.error(response.data.message, 'Failure');
			}
		})
		.catch(function(error){
			auth.verifyingOtp = false;
			console.log('error ::: ',error);
		});
	}

	function fnLogin(login){
		auth.verifyingOtp = true;
		var loginDetails = {};
		loginDetails.grant_type = 'password';
		loginDetails.client_id = 'restapp';
		loginDetails.client_secret = "restapp";
		loginDetails.username = login.mobile;
		loginDetails.password = login.otp;
		data.get(api.login, loginDetails, false)
		.then(function(response){
			console.log(response);
			$cookies.put('accessToken',response.data.value);
			$cookies.putObject('refreshToken',response.data.refreshToken);


			// $state.go('app.upload'); //remove this when capture selfie
			auth.addSelfie(auth.capturedImage); // Uncomment this when capturing selfie
		})
		.catch(function(error){
			auth.verifyingOtp = false;
			console.log("error :: ",error);
		})
	}

	function capture(){
		auth.capturingImage = true;
		$scope.$broadcast('ngWebcam_capture');
	}

	function onCaptureComplete(src){
		auth.capturedImage = src[0];
		auth.capturingImage = false;
	}

	function addSelfie(capturedImage){
		var imageFile = dataURLtoFile(capturedImage, 'a.jpg');
		var myFormData = new FormData();
		myFormData.append('uploadSelfie', imageFile);

		$http.post(api.addSelfie, myFormData, {
			transformRequest: function(){
				var formData = myFormData;
				return formData;
			},
			headers: {'Content-Type': undefined}
		})
		.then(function(response){
			auth.verifyingOtp = true;
			if(response.data.successfullyCreated){
				$state.go('app.upload');
			}else{
				toastr.error('Failure capturing selfie', 'Failure');
			}
			auth.verifyingOtp = false;
		})
		.catch(function(error){error})
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
