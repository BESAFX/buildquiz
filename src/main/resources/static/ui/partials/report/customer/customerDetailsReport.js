app.controller('traineeDetailsReportCtrl', ['TraineeService', '$scope', '$rootScope', '$timeout', '$uibModalInstance',
    function (TraineeService, $scope, $rootScope, $timeout, $uibModalInstance) {

        $scope.buffer = {};

        $timeout(function () {
            TraineeService.findAllCombo().then(function (data) {
                $scope.trainees = data;
            });
        }, 2000);

        $scope.submit = function () {
            window.open('/report/trainee/details/' + $scope.buffer.trainee.id + '?exportType=' + 'PDF'
            );
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }]);