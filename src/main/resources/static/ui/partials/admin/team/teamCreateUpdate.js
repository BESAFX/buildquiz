app.controller('teamCreateUpdateCtrl', ['TeamService', '$scope', '$rootScope', '$timeout', '$log', '$uibModalInstance', 'title', 'action', 'team',
    function (TeamService, $scope, $rootScope, $timeout, $log, $uibModalInstance, title, action, team) {

        $scope.roles = [
            {
                id: 1,
                name: $rootScope.lang === 'AR' ? 'إنشاء المواد' : 'Create Subject',
                value: 'ROLE_CATEGORY_CREATE',
                selected: false
            },
            {
                id: 2,
                name: $rootScope.lang === 'AR' ? 'تعديل بيانات المواد' : 'Update Subject',
                value: 'ROLE_CATEGORY_UPDATE',
                selected: false
            },
            {
                id: 3,
                name: $rootScope.lang === 'AR' ? 'حذف المواد' : 'Delete Subject',
                value: 'ROLE_CATEGORY_DELETE',
                selected: false
            },
            {
                id: 4,
                name: $rootScope.lang === 'AR' ? 'إنشاء الاختبارات' : 'Create Quiz',
                value: 'ROLE_QUIZ_CREATE',
                selected: false
            },
            {
                id: 5,
                name: $rootScope.lang === 'AR' ? 'تعديل بيانات الاختبارات' : 'Update Quiz',
                value: 'ROLE_QUIZ_UPDATE',
                selected: false
            },
            {
                id: 6,
                name: $rootScope.lang === 'AR' ? 'حذف الاختبارات' : 'Delete Quiz',
                value: 'ROLE_QUIZ_DELETE',
                selected: false
            },
            {
                id: 7,
                name: $rootScope.lang === 'AR' ? 'إنشاء الاسئلة' : 'Create Question',
                value: 'ROLE_QUESTION_CREATE',
                selected: false
            },
            {
                id: 8,
                name: $rootScope.lang === 'AR' ? 'تعديل بيانات الاسئلة' : 'Update Question',
                value: 'ROLE_QUESTION_UPDATE',
                selected: false
            },
            {
                id: 9,
                name: $rootScope.lang === 'AR' ? 'حذف الاسئلة' : 'Delete Question',
                value: 'ROLE_QUESTION_DELETE',
                selected: false
            },
            {
                id: 10,
                name: $rootScope.lang === 'AR' ? 'إنشاء الاجابات' : 'Create Answer',
                value: 'ROLE_ANSWER_CREATE',
                selected: false
            },
            {
                id: 11,
                name: $rootScope.lang === 'AR' ? 'تعديل بيانات الاجابات' : 'Update Answer',
                value: 'ROLE_ANSWER_UPDATE',
                selected: false
            },
            {
                id: 12,
                name: $rootScope.lang === 'AR' ? 'حذف الاجابات' : 'Delete Answer',
                value: 'ROLE_ANSWER_DELETE',
                selected: false
            },
            {
                id: 13,
                name: $rootScope.lang === 'AR' ? 'إنشاء اختبارات المتدربين' : 'Create Quizzes For Trainers',
                value: 'ROLE_SUMMERY_CREATE',
                selected: false
            },
            {
                id: 14,
                name: $rootScope.lang === 'AR' ? 'تعديل بيانات اختبارات المتدربين' : 'Update Quizzes Of Trainers',
                value: 'ROLE_SUMMERY_UPDATE',
                selected: false
            },
            {
                id: 15,
                name: $rootScope.lang === 'AR' ? 'حذف اختبارات المتدربين' : 'Delete Quizzes Of Trainers',
                value: 'ROLE_SUMMERY_DELETE',
                selected: false
            },
            {
                id: 16,
                name: $rootScope.lang === 'AR' ? 'إنشاء الصلاحيات' : 'Create Privileges',
                value: 'ROLE_TEAM_CREATE',
                selected: false
            },
            {
                id: 17,
                name: $rootScope.lang === 'AR' ? 'تعديل بيانات الصلاحيات' : 'Update Privileges',
                value: 'ROLE_TEAM_UPDATE',
                selected: false
            },
            {
                id: 18,
                name: $rootScope.lang === 'AR' ? 'حذف الصلاحيات' : 'Delete Privileges',
                value: 'ROLE_TEAM_DELETE',
                selected: false
            },
            {
                id: 19,
                name: $rootScope.lang === 'AR' ? 'إنشاء المستخدمين' : 'Create Users',
                value: 'ROLE_PERSON_CREATE',
                selected: false
            },
            {
                id: 20,
                name: $rootScope.lang === 'AR' ? 'تعديل بيانات المستخدمين' : 'Update Users',
                value: 'ROLE_PERSON_UPDATE',
                selected: false
            },
            {
                id: 21,
                name: $rootScope.lang === 'AR' ? 'حذف المستخدمين' : 'Delete Users',
                value: 'ROLE_PERSON_DELETE',
                selected: false
            }
        ];


        if (team) {
            $scope.team = team;
            if (typeof team.authorities === 'string') {
                $scope.team.authorities = team.authorities.split(',');
            }
            //
            angular.forEach($scope.team.authorities, function (auth) {
                angular.forEach($scope.roles, function (role) {
                    if (role.value === auth) {
                        return role.selected = true;
                    }
                })
            });
        } else {
            $scope.team = {};
        }

        $scope.title = title;

        $scope.action = action;

        $scope.submit = function () {
            $scope.team.authorities = [];
            angular.forEach($scope.roles, function (role) {
                if (role.selected) {
                    $scope.team.authorities.push(role.value);
                }
            });
            $scope.team.authorities = $scope.team.authorities.join();
            switch ($scope.action) {
                case 'create' :
                    TeamService.create($scope.team).then(function (data) {
                        $uibModalInstance.close(data);
                    });
                    break;
                case 'update' :
                    TeamService.update($scope.team).then(function (data) {
                        $scope.team = data;
                        $scope.team.authorities = team.authorities.split(',');
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