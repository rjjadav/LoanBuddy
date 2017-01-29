(function(){
'use strict';

angular.module('app.auth',[])
	.config(config);

function config($stateProvider){
	$stateProvider.state('app.auth',{
		url: '/auth/login',
		views:{
			'content@app' : {
				templateUrl: 'app/main/auth/auth.html',
				controller: 'AuthController',
				controllerAs: 'auth'
			}
		}
	});
}
})();