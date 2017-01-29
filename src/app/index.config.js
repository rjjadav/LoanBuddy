(function() {
	'use strict';

	angular
		.module('demoBanking')
		.config(config);

	/** @ngInject */
	function config($logProvider, toastrConfig, $facebookProvider) {
		// Enable log
		$logProvider.debugEnabled(true);

		// Set options third-party lib
		// toastrConfig.allowHtml = true;
		// toastrConfig.timeOut = 3000;
		// toastrConfig.positionClass = 'toast-top-right';
		// toastrConfig.preventDuplicates = true;
		// toastrConfig.progressBar = true;

		$facebookProvider.setAppId('1640268549548264');
		$facebookProvider.setVersion("v2.4");
		$facebookProvider.setCustomInit({
			status: true, 
			cookie: true,
		});
	}

})();
