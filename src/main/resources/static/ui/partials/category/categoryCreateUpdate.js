app.controller('categoryCreateUpdateCtrl', ['CategoryService', '$scope', '$rootScope', '$timeout', '$log', '$uibModalInstance', 'title', 'action', 'category',
        function (CategoryService, $scope, $rootScope, $timeout, $log, $uibModalInstance, title, action, category) {

            $scope.category = category;

            $scope.title = title;

            $scope.action = action;

            $scope.submit = function () {
                switch ($scope.action) {
                    case 'create' :
                        CategoryService.create($scope.category).then(function (data) {
                            $uibModalInstance.close(data);
                        });
                        break;
                    case 'update' :
                        CategoryService.update($scope.category).then(function (data) {
                            $scope.category = data;
                        });
                        break;
                }
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };

        }]);