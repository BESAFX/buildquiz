app.controller('quizCreateUpdateCtrl', ['QuizService', 'CategoryService', '$scope', '$rootScope', '$timeout', '$log', '$uibModalInstance', 'title', 'action', 'quiz',
        function (QuizService, CategoryService, $scope, $rootScope, $timeout, $log, $uibModalInstance, title, action, quiz) {

            $scope.quiz = quiz;

            $scope.title = title;

            $scope.action = action;

            $timeout(function () {
                CategoryService.findAllCombo().then(function (data) {
                    $scope.categories = data;
                });
            }, 1000);

            $scope.submit = function () {
                switch ($scope.action) {
                    case 'create' :
                        QuizService.create($scope.quiz).then(function (data) {
                            $uibModalInstance.close(data);
                        });
                        break;
                    case 'update' :
                        QuizService.update($scope.quiz).then(function (data) {
                            $scope.quiz = data;
                        });
                        break;
                }
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };

        }]);