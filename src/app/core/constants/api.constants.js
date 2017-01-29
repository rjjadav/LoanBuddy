'use strict';

angular.module('app.core')
.constant('api',(apiConstant)());

function apiConstant(){
	var env = 'dev';

	var url = {
		dev : {
			backend : 'https://45.56.97.181:8443/LoanBuddy', ///cosphere/getHomePageData'
		},
		uat: {

		},
		prod: {

		}
	}

	var config = {
		saveAccount 	: url[env].backend + '/saveAccount',
		verifyOtp 		: url[env].backend + '/verifyOtp',
		login 			: url[env].backend + '/oauth/token',
		addPanCard 		: url[env].backend + '/addPanCard',
		addAadharCard 	: url[env].backend + '/addAadharCard',
		addSelfie 		: url[env].backend + '/addSelfie',
		addCibil 		: url[env].backend + '/addCibil',
		addBankStatement: url[env].backend + '/addBankStatement',
	}

	return config;
}