app.controller('answerCreateUpdateCtrl', ['AnswerService', 'QuizService', '$scope', '$rootScope', '$timeout', '$log', '$uibModalInstance', 'title', 'action', 'answer',
    function (AnswerService, QuizService, $scope, $rootScope, $timeout, $log, $uibModalInstance, title, action, answer) {

        $scope.answer = answer;

        $scope.title = title;

        $scope.action = action;

        $scope.submit = function () {
            switch ($scope.action) {
                case 'create' :
                    AnswerService.create($scope.answer).then(function (data) {
                        $uibModalInstance.close(data);
                    });
                    break;
                case 'update' :
                    AnswerService.update($scope.answer).then(function (data) {
                        $uibModalInstance.close(data);
                    });
                    break;
            }
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $timeout(function () {
            window.componentHandler.upgradeAllRegistered();
        }, 800);

    }]);