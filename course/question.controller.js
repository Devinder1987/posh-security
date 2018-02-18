(function () {
	'use strict';

	angular
		.module('app')
		.controller('Questions.IndexController', Controller);

	function Controller($location, $scope, QuestionsService, $localStorage, $interval) {

		initController();

		function initController() {
			$location.path('/questions');
			var data = $localStorage.selectedCource;
			$scope.course = data.course;
			$scope.courseName = data.course.name;
			$scope.videoLink = "./static/videos/" + data.course.name + ".mp4";
			$scope.pdfLink = "./static/pdf/" + data.course.name + ".pdf";
			$scope.showTnC = false;
		}


		$scope.start = function () {
			var data = $localStorage.selectedCource;
			QuestionsService.getQuestions(data, function (result) {
				$scope.allQuestions = result.data.questions;
				$scope.attemptId = result.data.attemptId;
				$scope.timerInSecs = result.data.timerInSecs;

				$scope.id = 0;
				$scope.quizOver = false;
				$scope.quizstarted = true;
				$scope.showScore = false;
				$scope.inProgress = true;
				$scope.showTnC = false;
				$scope.getQuestion();
				$scope.selectedQuestions = [];
				$scope.timer();
			});
		};
		$scope.showTnCFn = function () {
			$scope.showTnC = true;
			$scope.inProgress = true;
			$scope.quizOver = false;
			$scope.quizstarted = false;
			$scope.showScore = false;
		}

		$scope.reset = function () {
			$scope.inProgress = false;
			$scope.score = 0;
		}

		$scope.getQuestion = function () {
			var q = $scope.allQuestions[$scope.id];
			if (q) {
				$scope.question = q;
				$scope.options = q.choices;
				$scope.answer = q.correctChoiceId;
				if ($scope.id == $scope.allQuestions.length - 1) {
					$scope.quizOver = true;
				}
			} else {
				$scope.quizOver = true;
				$scope.quizstarted = false;
			}
		};

		$scope.nextQuestion = function () {
			var ans = $('input[name=answer]:checked').val();
			$scope.selectedQuestions.push({ "id": $scope.question.id, "selectedChoiceId": ans });
			if ($scope.id == $scope.allQuestions.length - 1) {
				$scope.stop(mytimeout);
				$scope.finalSubmit();
				//return;
			} else {
				$scope.id++;
				$scope.getQuestion();
				$scope.timer();
			}
		};

		$scope.showHome = function () {
			$location.path('/');
		}

		$scope.finalSubmit = function () {
			QuestionsService.submitQuiz($scope.attemptId, $scope.selectedQuestions);
		}

		var mytimeout;
		var counter;
		$scope.counter = '20 : 00';
		$scope.timer = function () {
			// stops any running interval to avoid two intervals running at the same time
			$scope.stop(mytimeout);
			counter = $scope.timerInSecs;
			mytimeout = $interval($scope.onTimeout, 1000);
		}

		$scope.onTimeout = function () {
			if (counter == 1) {
				$scope.stop(mytimeout);
				$scope.finalSubmit();
			} else {
				counter--;
			}
			$scope.counter = Math.floor(counter / 60) + ' : ' + counter % 60;
		}

		$scope.stop = function () {
			$interval.cancel(mytimeout);
		}

		// stops the interval when the scope is destroyed,
		// this usually happens when a route is changed and 
		// the ItemsController $scope gets destroyed. The
		// destruction of the ItemsController scope does not
		// guarantee the stopping of any intervals, you must
		// be responsible of stopping it when the scope is
		// is destroyed.
		$scope.$on('$destroy', function () {
			$scope.stop();
		});

	}

})();