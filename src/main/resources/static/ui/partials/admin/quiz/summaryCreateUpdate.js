app.controller('summaryCreateUpdateCtrl', ['SummaryService', 'PersonService', '$scope', '$rootScope', '$timeout', '$log', '$uibModalInstance', 'title', 'action', 'summary',
        function (SummaryService, PersonService, $scope, $rootScope, $timeout, $log, $uibModalInstance, title, action, summary) {

            $scope.summary = summary;

            $scope.title = title;

            $scope.action = action;

            $timeout(function () {
                PersonService.findAllCombo().then(function (data) {
                    $scope.persons = data;
                });
            }, 1000);

            $scope.submit = function () {
                switch ($scope.action) {
                    case 'create' :
                        SummaryService.create($scope.summary).then(function (data) {
                            $uibModalInstance.close(data);
                        });
                        break;
                    case 'update' :
                        SummaryService.update($scope.summary).then(function (data) {
                            $scope.summary = data;
                        });
                        break;
                }
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };

        }]);