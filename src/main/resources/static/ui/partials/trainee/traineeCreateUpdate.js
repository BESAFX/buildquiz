app.controller('traineeCreateUpdateCtrl', ['TraineeService', '$scope', '$rootScope', '$timeout', '$log', '$uibModalInstance', 'title', 'action', 'trainee',
    function (TraineeService, $scope, $rootScope, $timeout, $log, $uibModalInstance, title, action, trainee) {

        $scope.trainee = trainee;

        $scope.title = title;

        $scope.action = action;

        $scope.submit = function () {
            switch ($scope.action) {
                case 'create' :
                    TraineeService.create($scope.trainee).then(function (data) {
                        $uibModalInstance.close(data);
                    });
                    break;
                case 'update' :
                    TraineeService.update($scope.trainee).then(function (data) {
                        $scope.trainee = data;
                    });
                    break;
            }
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $timeout(function () {
            window.componentHandler.upgradeAllRegistered();
        }, 500);

    }]);