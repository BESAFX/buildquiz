app.controller('traineeQuizAddCtrl', ['TraineeQuizService', 'QuizService', '$scope', '$rootScope', '$timeout', '$log', '$uibModalInstance', 'title', 'trainee',
    function (TraineeQuizService, QuizService, $scope, $rootScope, $timeout, $log, $uibModalInstance, title, trainee) {

        $scope.traineeQuiz = {};

        $scope.traineeQuiz.trainee = trainee;

        $scope.title = title;

        $scope.submit = function (quiz) {
            $scope.traineeQuiz.quiz = quiz;
            TraineeQuizService.create($scope.traineeQuiz).then(function (data) {
                $uibModalInstance.close(data);
            });
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $timeout(function () {
            QuizService.findAllCombo().then(function (data) {
                $scope.quizzes = data;
            });
            window.componentHandler.upgradeAllRegistered();
        }, 500);

    }]);