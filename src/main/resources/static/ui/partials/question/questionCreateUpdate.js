app.controller('questionCreateUpdateCtrl', ['QuestionService', 'QuizService', '$scope', '$rootScope', '$timeout', '$log', '$uibModalInstance', 'title', 'action', 'question',
        function (QuestionService, QuizService, $scope, $rootScope, $timeout, $log, $uibModalInstance, title, action, question) {

            $scope.question = question;

            $scope.title = title;

            $scope.action = action;

            $timeout(function () {
                QuizService.findAllCombo().then(function (data) {
                    $scope.quizzes = data;
                });
            }, 1000);

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
                        });
                        break;
                }
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };

        }]);