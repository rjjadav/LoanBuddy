(function(){
'use strict';

angular.module('app.toolbar')
.controller('ToolbarController',ToolbarController)

ToolbarController.$inject = ['$mdSidenav']

function ToolbarController($mdSidenav){
	var toolbar = this;
	toolbar.toggleSidenav = toggleSidenav;

	function toggleSidenav(sidenavId){
		console.log(sidenavId);
		$mdSidenav(sidenavId).toggle();
	}
}

})();