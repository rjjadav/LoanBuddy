'use strict';

angular.module('app.upload')
.controller('UploadBankStatementController', UploadBankStatementController);

UploadBankStatementController.$inject = ['$scope','$http','Upload','api','data'];

function UploadBankStatementController($scope,$http, Upload, api, data){
	var bankStatement = this;

	bankStatement.uploadBankStatement = uploadBankStatement;
	bankStatement.removeFromList = removeFromList;
	bankStatement.clearFilteredData = clearFilteredData;

	bankStatement.bankStatementLoading = false;
	bankStatement.bsData = undefined;
	bankStatement.filteredData = undefined;
	bankStatement.options = {
		chart: {
			type: 'pieChart',
			height: 400,
			x: function(d){return d.componentName;},
			y: function(d){return d.totalAmount;},
			showLabels: true,
			duration: 500,
			labelThreshold: 0.01,
			labelSunbeamLayout: true,
			legend: {
				margin: {
					top: 5,
					right: 35,
					bottom: 5,
					left: 0
				}
			},
			pie:{
				dispatch:{
					elementClick : function(e){
						console.log('elementClick in callback', e.data);
						bankStatement.filteredData = undefined;
						bankStatement.filteredData = e.data;
						$scope.$apply();
					}
				}
			}
		}
	};

	function uploadBankStatement(uploadedBankStatement,selectedBank){
		console.log(uploadedBankStatement);
		console.log(typeof(uploadedBankStatement))   
		var bs = uploadedBankStatement;
		// if(Array.isArray(uploadedBankStatement)){
		//   bs = uploadedBankStatement[0]
		// }else{
		//   bs = uploadBankStatement;
		// }
		console.log(bs);
		var myFormData = new FormData();
		myFormData.append('uploadBank', bs);
		myFormData.append('bank',selectedBank);
		bankStatement.bankStatementLoading = true;
		$http.post(api.addBankStatement, myFormData, {
			transformRequest: function(){
				var formData = myFormData;
				return formData;
			},
			headers: {'Content-Type': undefined}
		})
		.then(function(response){

			// console.log(response);
			var tempObj = {};
			angular.forEach(response.data.bankComponents,function(value, key){
				console.log(key);
				tempObj[key] = [];

				angular.forEach(value, function(obj,index){
					// console.log(obj);
					var component = obj;
					var total = 0;
					angular.forEach(component.candidateNarrations, function(iValue, iKey){
						// console.log(iKey);
						// console.log(iValue);
						angular.forEach(iValue, function(iObj,iIndex){
							total += iObj.amount;
						})	
					});

					angular.forEach(component.subComponent,function(sObj,sIndex){
						angular.forEach(sObj.narrationsByMonth,function(sValue, sKey){
							console.log(sKey);
							console.log(sValue);
							angular.forEach(sValue, function(nValue, nIndex){
								total += nValue.amount;
							})
						});
					});

					component.totalAmount = total;
					tempObj[key].push(component);
				});
				console.log(tempObj[key]);
			});
			console.log(tempObj);
			bankStatement.bsData = tempObj;
			bankStatement.bankStatementLoading = false;
		})
		.catch(function(error){
			bankStatement.bankStatementLoading = false;
		})
	}

	function removeFromList(bankStatements, index){
		bankStatements.splice(index,1);
		console.log(bankStatements);
	}

	function clearFilteredData(){
		bankStatement.filteredData = undefined;
	}
}