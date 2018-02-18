(function () {
	'use strict';

	angular
	.module('induction.admin',[
        'induction.configuration'
        ])
	.factory('AdminService', Service);

	function Service($location, $http, Configuration) {
		var service = {};
		var baseUrl = Configuration.getBaseUrl();
		service.getReport = getReport;
		service.getAllCourses = getAllCourses;
		service.enableTest = enableTest;
		service.getFailedEmp = getFailedEmp;

		return service;
		function getFailedEmp(successFn, failedFn){
			$http({
				method: 'GET',
				url: baseUrl+'report/getFailedEmployeeList',
			}).then(function(data) {
				successFn(data);
		    }, function(err) {
		    	failedFn(err);
		    });
		}
		function getReport(successFn, failedFn){
			$http({
				method: 'GET',
				url: baseUrl+'report/course/1',
			}).then(function(data) {
				successFn(data);
		    }, function(err) {
		    	failedFn(err);
		    });
		}

		function getAllCourses(callback) {
			$http({
				method: 'GET',
				url: baseUrl+'course'
			}).then(function(response) {
				callback(response);
		    }, function(response) {
		    	if(response.status == 401){
					$location.path('/login');
				}
				console.log(response);
		    });
		}
		function enableTest(empId, courseId, successFn, failedFn){
			$http({
				method: 'GET',
				url: baseUrl+'course/'+empId+'/enableCourse/'+courseId,
			}).then(function(data) {
				successFn(data);
		    }, function(err) {
		    	failedFn(err);
		    });
		}

	}
})();