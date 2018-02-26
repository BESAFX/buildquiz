app.controller('traineeDetailsCtrl', [
    'TraineeService',
    'TraineeQuizService',
    'ModalProvider',
    '$scope',
    '$rootScope',
    '$timeout',
    '$log',
    '$uibModalInstance',
    '$uibModal',
    'trainee',
    function (
        TraineeService,
        TraineeQuizService,
        ModalProvider,
        $scope,
        $rootScope,
        $timeout,
        $log,
        $uibModalInstance,
        $uibModal,
        trainee
    ) {

        $scope.trainee = trainee;
        $scope.refreshTrainee = function () {
            TraineeService.findOne($scope.trainee.id).then(function (data) {
                $scope.trainee = data;
            })
        };
        $scope.refreshQuizzes = function () {
            TraineeQuizService.findByTrainee($scope.trainee).then(function (data) {
                $scope.trainee.traineeQuizzes = data;
                angular.forEach(data, function (tq) {
                    TraineeQuizService.getTraineeQuizPercentage(tq).then(function (percentage) {
                        return tq.percentage = percentage;
                    });
                });
            });
        };
        $scope.newTraineeQuiz = function () {
            ModalProvider.openTraineeQuizAddModel($scope.trainee).result.then(function (data) {
                return $scope.trainee.traineeQuizzes.splice(0, 0, data);
            });
        };
        $scope.deleteTraineeQuiz = function (traineeQuizzes) {
            ModalProvider.openConfirmModel("حذف نماذج الاختبارات", "error", "هل تود حذف النموذج فعلاً؟")
                .result.then(function (action) {
                if(action){
                    TraineeQuizService.remove(traineeQuizzes.id).then(function () {
                        var index = $scope.trainee.traineeQuizzes.indexOf(traineeQuizzes);
                        return $scope.trainee.traineeQuizzes.splice(index, 1);
                    });
                }
            })
        };
        $scope.rowMenuTraineeQuiz = [
            {
                html: '<div class="drop-menu">اضافة نموذج<span class="fa fa-pencil fa-lg"></span></div>',
                enabled: function () {
                    return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_TRAINEE_QUIZ_CREATE']);
                },
                click: function ($itemScope, $event, value) {
                    $scope.newTraineeQuiz();
                }
            },
            {
                html: '<div class="drop-menu">حذف النموذج<span class="fa fa-trash fa-lg"></span></div>',
                enabled: function () {
                    return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_TRAINEE_QUIZ_DELETE']);
                },
                click: function ($itemScope, $event, value) {
                    $scope.deleteTraineeQuiz($itemScope.traineeQuiz);
                }
            }
        ];
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
        $timeout(function () {
            window.componentHandler.upgradeAllRegistered();
        }, 600);

    }]);