(function(){
'use strict';

angular.module('app.upload',[])
	.config(config);

function config($stateProvider){
	$stateProvider.state('app.upload',{
		url: '/upload',
		// abstract: true,
			redirectTo : 'app.upload.upload-pan',
		views:{
			'content@app' : {
				templateUrl: 'app/main/upload/upload.html',
				controller: 'UploadController',
				controllerAs: 'upload',
			}
		},
	})
	.state('app.upload.upload-pan',{
		url: '/pan',
		views:{
			'uploadContent@app.upload' : {
				templateUrl: 'app/main/upload/upload-pan/upload-pan.html',
				controller: 'UploadPanController',
				controllerAs: 'pan'
			}
		},
		tabIndex : 1,
	})
	.state('app.upload.upload-aadhar',{
		url: '/aadhar',
		views:{
			'uploadContent@app.upload' : {
				templateUrl: 'app/main/upload/upload-aadhar/upload-aadhar.html',
				controller: 'UploadAadharController',
				controllerAs: 'aadhar'
			}
		},
		tabIndex : 2,
	})
	.state('app.upload.upload-cibil',{
		url: '/cibil',
		views:{
			'uploadContent@app.upload' : {
				templateUrl: 'app/main/upload/upload-cibil/upload-cibil.html',
				controller: 'UploadCibilController',
				controllerAs: 'cibil'
			}
		},
		tabIndex : 3,
	})
	.state('app.upload.upload-bank-statement',{
		url: '/bankstatement',
		views:{
			'uploadContent@app.upload' : {
				templateUrl: 'app/main/upload/upload-bank-statement/upload-bank-statement.html',
				controller: 'UploadBankStatementController',
				controllerAs: 'bankStatement'
			}
		},
		tabIndex : 4,
	})
	.state('app.upload.upload-social',{
		url: '/social',
		views:{
			'uploadContent@app.upload' : {
				templateUrl: 'app/main/upload/upload-social/upload-social.html',
				controller: 'UploadSocialController',
				controllerAs: 'social'
			}
		},
		tabIndex : 5,
	})
}
})();