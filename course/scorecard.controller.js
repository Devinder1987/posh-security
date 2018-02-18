(function () {
    'use strict';

    angular
        .module('app')
        .controller('Course.ScorecardController', Controller);

    function Controller($location, $scope, ScorecardService, $localStorage) {
		
    	initController();

        function initController() {
        	$scope.attemptId = $localStorage.attemptId;
			ScorecardService.getScorecard($scope.attemptId, function (response) {	
				$scope.scorecardResult = response.data;
			});
            var data = $localStorage.selectedCource;
            $scope.pdfLink = "./static/pdf/" + data.course.name + ".pdf";
        }
        
        $scope.showHome = function() {
			$location.path('/');
		}
    }

})();