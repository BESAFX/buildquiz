app.controller('quizResultCtrl', [
    'QuestionService',
    'TraineeQuizService',
    '$uibModalInstance',
    '$scope',
    'filterFilter',
    'traineeQuiz',
    function (QuestionService,
              TraineeQuizService,
              $uibModalInstance,
              $scope,
              filterFilter,
              traineeQuiz) {

        $scope.traineeQuiz = traineeQuiz;
        $scope.rightAnswersCount = 0;
        $scope.wrongAnswersCount = 0;
        $scope.noAnswersCount = 0;
        $scope.finalGrade = '0 %';

        angular.forEach($scope.traineeQuiz.quiz.questions, function (question) {
            var questionToSave = JSON.parse(JSON.stringify(question));
            questionToSave.answers = [];
            angular.forEach(question.answers, function (answer) {
                if (answer.userInput) {
                    questionToSave.answers.push(answer);
                }
            });
            QuestionService.submitResult(questionToSave, $scope.traineeQuiz).then(function (data) {
                QuestionService.getQuestionResult(data, $scope.traineeQuiz).then(function (questionResult) {
                    switch (questionResult) {
                        case 'Right_Answer':
                            $scope.rightAnswersCount++;
                            break;
                        case 'Wrong_Answer':
                            $scope.wrongAnswersCount++;
                            break;
                        case 'NO_Answer':
                            $scope.noAnswersCount++;
                            break;
                    }
                })
            });
        });

        TraineeQuizService.getTraineeQuizPercentage($scope.traineeQuiz).then(function (grade) {
            $scope.finalGrade = grade;
        });

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        setTimeout(function () {
            window.componentHandler.upgradeAllRegistered();
        }, 600);

    }]);