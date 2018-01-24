(function () {
    'use strict';

    angular
        .module('app')
        .controller('Course.IndexController', Controller);

    function Controller($location, $scope, CourcesService, $localStorage) {

        initController();

        function initController() {
			var username = $localStorage.currentUser.username;
			$scope.username = username;
			CourcesService.getCourses(username, function (result) {
			   if (result.length > 0) {
                       $scope.courses = result;
                    } else {
                       
                    }
            });
            // $scope.courses = [
            //     {"id":1,"name":"POSH","description":"Prevention of Sexual Harassment","score":8,"scoreInPercent":80.0,"maxScore":10,"result":"FAILED","attemptCount":3,"maxAttempt":3},
            //     {"id":2,"name":"Security","description":"This is the security test","score":9,"scoreInPercent":0.0,"maxScore":10,"result":"NOT STARTED","attemptCount":0,"maxAttempt":4}
            //     ]
        }
		
		$scope.questions = function questions(course,empId) {
			var data = {"course":course,"empId":empId};
			$localStorage.selectedCource = data;
           $location.path('/questions'); 
        };
		
    }

})();