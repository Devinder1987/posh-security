(function () {
	'use strict';

	angular
		.module('app')
		.controller('Admin.Controller', Controller);

	function Controller($location, $scope, AdminService, $localStorage, Configuration) {
		var baseUrl = Configuration.getBaseUrl();
		$scope.reportCourceCode = 0;
		var empDetails = [];
		// $scope.onCourceSelect = function () {
		// 	$scope.empDetails = empDetails.filter(function (emp) {
		// 		if ($scope.selectedCource === 'All Cources') {
		// 			return 1 === 1;
		// 		} else {
		// 			return emp.courseName === $scope.selectedCource;
		// 		}
		// 	})
		// }
		$scope.onCourceSelect = function (type) {
			if ($scope.reportCource === 'All Cources') {
				$scope.reportCourceCode = 0;
			} else if ($scope.reportCource === 'POSH') {
				$scope.reportCourceCode = 1;
			} else if ($scope.reportCource === 'Security') {
				$scope.reportCourceCode = 2;
			}
			switch (type) {
				case 'enable':
					var url = 'report/course/' + $scope.reportCourceCode;
					break;
				case 'filter':
					$scope.empDetails = empDetails.filter(function (emp) {
						if ($scope.selectedCource === 'All Cources') {
							return 1 === 1;
						} else {
							return emp.courseName === $scope.selectedCource;
						}
					});
					break;
				default:
					$scope.reportUrl = baseUrl + 'report/course/' + $scope.reportCourceCode;
			}

		}
		$scope.reportUrl = baseUrl + 'report/course/' + $scope.reportCourceCode;
		$scope.selectAllFn = function () {
			$scope.selectAll = !$scope.selectAll;
		}
		$scope.enableTest = function (emp_id, cource_id) {
			function successFn(data) {
				console.log(data.message);
			}
			function failedFn(err) {
				console.log(err.message);
			}
			AdminService.enableTest(emp_id, cource_id, successFn, failedFn)
		}
		$scope.downloadReport = function () {
			function successFn(data) {
				console.log(data.message);
			}
			function failedFn(err) {
				console.log(err.message);
			}
			AdminService.getReport(successFn, failedFn)
		}
		function getFailedEmpSuccess(data) {
			$scope.empDetails = data.data;
			empDetails = data.data;
		}
		function getFailedEmpFailed(err) {
			alert('Service failed.');
		}
		initController();
		function initController() {
			$scope.allCourses = ['All Cources', 'POSH', 'Security'];
			$scope.selectedCource = $scope.allCourses[0];
			$scope.reportCource = $scope.allCourses[0];
			$scope.enableCource = $scope.allCourses[0];
			AdminService.getFailedEmp(getFailedEmpSuccess, getFailedEmpFailed)

			if ($localStorage.currentUser.role != 'admin') {
				$location.path('/');
			} else {
				// AdminService.getAllCourses(function (response) {			
				// 	$scope.allCourses = response.data;
				// });
			};
		};
	};
})();