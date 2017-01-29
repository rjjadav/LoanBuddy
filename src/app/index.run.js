(function() {
'use strict';

angular
.module('demoBanking')
.run(runBlock);

runBlock.$inject = ['$rootScope','$state'];
function runBlock($rootScope, $state) {
	initFB();
	$rootScope.$on('$stateChangeSuccess', stateChangeSuccess);
	function stateChangeSuccess(event, toState, toParams, fromState, fromParams){
		console.log(toState)
		$rootScope.$state = $state;
		if(toState.redirectTo){
			$state.go(toState.redirectTo);
		}
		if(toState.tabIndex){
			console.log(toState.tabIndex);
			$rootScope.$broadcast('tabChanged');
		}
	}



	function initFB(){
		if (document.getElementById('facebook-jssdk')) {return;}
		var firstScriptElement = document.getElementsByTagName('script')[0];
		var facebookJS = document.createElement('script'); 
		facebookJS.id = 'facebook-jssdk';
		facebookJS.src = '//connect.facebook.net/en_US/sdk.js';
		firstScriptElement.parentNode.insertBefore(facebookJS, firstScriptElement);
		console.log("FB INIT");
	}
}

})();
