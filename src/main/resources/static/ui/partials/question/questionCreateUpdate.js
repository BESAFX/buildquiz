app.controller('questionCreateUpdateCtrl', ['QuestionService', 'QuizService', '$scope', '$rootScope', '$timeout', '$log', '$uibModalInstance', 'title', 'action', 'question',
        function (QuestionService, QuizService, $scope, $rootScope, $timeout, $log, $uibModalInstance, title, action, question) {

            $scope.question = question;

            $scope.title = title;

            $scope.action = action;

            $timeout(function () {
                QuizService.findAllCombo().then(function (data) {
                    $scope.quizzes = data;
                    $scope.refreshQuiz();
                });
            }, 600);

            $scope.refreshQuiz = function () {
                if(question.quiz.id){
                    angular.forEach($scope.quizzes, function (q) {
                        if(question.quiz.id === q.id){
                            return $scope.question.quiz = q;
                        }
                    });
                }
            };

            $scope.submit = function () {
                switch ($scope.action) {
                    case 'create' :
                        QuestionService.create($scope.question).then(function (data) {
                            $uibModalInstance.close(data);
                        });
                        break;
                    case 'update' :
                        QuestionService.update($scope.question).then(function (data) {
                            $scope.question = data;
                            $scope.refreshQuiz();
                        });
                        break;
                }
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };

        }]);