app.controller('trainerCreateUpdateCtrl', ['TrainerService', '$scope', '$rootScope', '$timeout', '$log', '$uibModalInstance', 'title', 'action', 'trainer',
    function (TrainerService, $scope, $rootScope, $timeout, $log, $uibModalInstance, title, action, trainer) {

        $scope.trainer = trainer;

        $scope.title = title;

        $scope.action = action;

        $scope.submit = function () {
            switch ($scope.action) {
                case 'create' :
                    TrainerService.create($scope.trainer).then(function (data) {
                        $uibModalInstance.close(data);
                    });
                    break;
                case 'update' :
                    TrainerService.update($scope.trainer).then(function (data) {
                        $scope.trainer = data;
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