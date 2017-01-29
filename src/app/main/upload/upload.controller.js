'use strict';

angular.module('app.upload')
.controller('UploadController', UploadController);

UploadController.$inject = ['$rootScope','$state','$stateParams','Upload'];

function UploadController($rootScope, $state, $stateParams, Upload){
	var upload = this;
	upload.currentTab = $state.current.tabIndex || 1;
	upload.maxTab = upload.currentTab;
	$rootScope.$on('tabChanged',function(){
		if($state.current.tabIndex){
			upload.currentTab = $state.current.tabIndex;
			if(upload.maxTab <= upload.currentTab){
				upload.maxTab = upload.currentTab;
			}
		}
	});
}