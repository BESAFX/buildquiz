app.controller('teamCreateUpdateCtrl', [
    'TeamService',
    '$scope',
    '$rootScope',
    '$timeout',
    '$log',
    '$uibModalInstance',
    'title',
    'action',
    'team',
    function (TeamService, $scope, $rootScope, $timeout, $log, $uibModalInstance, title, action, team) {

        $scope.title = title;

        $scope.action = action;

        $scope.roles = [];

        //////////////////////////Trainer////////////////////////////////
        $scope.roles.push({
            nameArabic: 'إنشاء حسابات المدربين',
            nameEnglish: 'Create Trainers Account',
            value: 'ROLE_TRAINER_CREATE',
            selected: false,
            category: $rootScope.lang === 'AR' ? 'الإدارة' : 'Administrator'
        });
        $scope.roles.push({
            nameArabic: 'تعديل حسابات المدربين',
            nameEnglish: 'Update Trainers Account',
            value: 'ROLE_TRAINER_UPDATE',
            selected: false,
            category: $rootScope.lang === 'AR' ? 'الإدارة' : 'Administrator'
        });
        $scope.roles.push({
            nameArabic: 'تفعيل حسابات المدربين',
            nameEnglish: 'Enable Trainers Account',
            value: 'ROLE_TRAINER_ENABLE',
            selected: false,
            category: $rootScope.lang === 'AR' ? 'الإدارة' : 'Administrator'
        });
        $scope.roles.push({
            nameArabic: 'تعطيل حسابات المدربين',
            nameEnglish: 'Disable Trainers Account',
            value: 'ROLE_TRAINER_DISABLE',
            selected: false,
            category: $rootScope.lang === 'AR' ? 'الإدارة' : 'Administrator'
        });
        $scope.roles.push({
            nameArabic: 'حذف حسابات المدربين',
            nameEnglish: 'Delete Trainers Account',
            value: 'ROLE_TRAINER_DELETE',
            selected: false,
            category: $rootScope.lang === 'AR' ? 'الإدارة' : 'Administrator'
        });
        //////////////////////////Trainee////////////////////////////////
        $scope.roles.push({
            nameArabic: 'إنشاء حسابات المتدربين',
            nameEnglish: 'Create Trainees Account',
            value: 'ROLE_TRAINEE_CREATE',
            selected: false,
            category: $rootScope.lang === 'AR' ? 'الإدارة' : 'Administrator'
        });
        $scope.roles.push({
            nameArabic: 'تعديل حسابات المتدربين',
            nameEnglish: 'Update Trainees Account',
            value: 'ROLE_TRAINEE_UPDATE',
            selected: false,
            category: $rootScope.lang === 'AR' ? 'الإدارة' : 'Administrator'
        });
        $scope.roles.push({
            nameArabic: 'تفعيل حسابات المتدربين',
            nameEnglish: 'Enable Trainees Account',
            value: 'ROLE_TRAINEE_ENABLE',
            selected: false,
            category: $rootScope.lang === 'AR' ? 'الإدارة' : 'Administrator'
        });
        $scope.roles.push({
            nameArabic: 'تعطيل حسابات المتدربين',
            nameEnglish: 'Disable Trainees Account',
            value: 'ROLE_TRAINEE_DISABLE',
            selected: false,
            category: $rootScope.lang === 'AR' ? 'الإدارة' : 'Administrator'
        });
        $scope.roles.push({
            nameArabic: 'حذف حسابات المتدربين',
            nameEnglish: 'Delete Trainees Account',
            value: 'ROLE_TRAINEE_DELETE',
            selected: false,
            category: $rootScope.lang === 'AR' ? 'الإدارة' : 'Administrator'
        });
        //////////////////////////Category////////////////////////////////
        $scope.roles.push({
            nameArabic: 'إنشاء التصنيفات',
            nameEnglish: 'Create Category',
            value: 'ROLE_CATEGORY_CREATE',
            selected: false,
            category: $rootScope.lang === 'AR' ? 'الإدارة' : 'Administrator'
        });
        $scope.roles.push({
            nameArabic: 'تعديل التصنيفات',
            nameEnglish: 'Update Category',
            value: 'ROLE_CATEGORY_UPDATE',
            selected: false,
            category: $rootScope.lang === 'AR' ? 'الإدارة' : 'Administrator'
        });
        $scope.roles.push({
            nameArabic: 'حذف التصنيفات',
            nameEnglish: 'Delete Category',
            value: 'ROLE_CATEGORY_DELETE',
            selected: false,
            category: $rootScope.lang === 'AR' ? 'الإدارة' : 'Administrator'
        });
        //////////////////////////Quiz////////////////////////////////
        $scope.roles.push({
            nameArabic: 'إنشاء الاختبارات',
            nameEnglish: 'Create Quiz',
            value: 'ROLE_QUIZ_CREATE',
            selected: false,
            category: $rootScope.lang === 'AR' ? 'الإدارة' : 'Administrator'
        });
        $scope.roles.push({
            nameArabic: 'تعديل الاختبارات',
            nameEnglish: 'Update Quiz',
            value: 'ROLE_QUIZ_UPDATE',
            selected: false,
            category: $rootScope.lang === 'AR' ? 'الإدارة' : 'Administrator'
        });
        $scope.roles.push({
            nameArabic: 'حذف الاختبارات',
            nameEnglish: 'Delete Quiz',
            value: 'ROLE_QUIZ_DELETE',
            selected: false,
            category: $rootScope.lang === 'AR' ? 'الإدارة' : 'Administrator'
        });
        //////////////////////////Question////////////////////////////////
        $scope.roles.push({
            nameArabic: 'إنشاء الاسئلة',
            nameEnglish: 'Create Question',
            value: 'ROLE_QUESTION_CREATE',
            selected: false,
            category: $rootScope.lang === 'AR' ? 'الإدارة' : 'Administrator'
        });
        $scope.roles.push({
            nameArabic: 'تعديل الاسئلة',
            nameEnglish: 'Update Question',
            value: 'ROLE_QUESTION_UPDATE',
            selected: false,
            category: $rootScope.lang === 'AR' ? 'الإدارة' : 'Administrator'
        });
        $scope.roles.push({
            nameArabic: 'حذف الاسئلة',
            nameEnglish: 'Delete Question',
            value: 'ROLE_QUESTION_DELETE',
            selected: false,
            category: $rootScope.lang === 'AR' ? 'الإدارة' : 'Administrator'
        });
        //////////////////////////Answer////////////////////////////////
        $scope.roles.push({
            nameArabic: 'إنشاء الاجابات',
            nameEnglish: 'Create Answer',
            value: 'ROLE_ANSWER_CREATE',
            selected: false,
            category: $rootScope.lang === 'AR' ? 'الإدارة' : 'Administrator'
        });
        $scope.roles.push({
            nameArabic: 'تعديل الاجابات',
            nameEnglish: 'Update Answer',
            value: 'ROLE_ANSWER_UPDATE',
            selected: false,
            category: $rootScope.lang === 'AR' ? 'الإدارة' : 'Administrator'
        });
        $scope.roles.push({
            nameArabic: 'حذف الاجابات',
            nameEnglish: 'Delete Answer',
            value: 'ROLE_ANSWER_DELETE',
            selected: false,
            category: $rootScope.lang === 'AR' ? 'الإدارة' : 'Administrator'
        });
        //////////////////////////TraineeQuiz////////////////////////////////
        $scope.roles.push({
            nameArabic: 'إنشاء نماذج الاختبارات',
            nameEnglish: 'Create TraineeQuiz',
            value: 'ROLE_TRAINEE_QUIZ_CREATE',
            selected: false,
            category: $rootScope.lang === 'AR' ? 'الإدارة' : 'Administrator'
        });
        $scope.roles.push({
            nameArabic: 'حذف نماذج الاختبارات',
            nameEnglish: 'Delete TraineeQuiz',
            value: 'ROLE_TRAINEE_QUIZ_DELETE',
            selected: false,
            category: $rootScope.lang === 'AR' ? 'الإدارة' : 'Administrator'
        });
        //////////////////////////Team////////////////////////////////
        $scope.roles.push({
            nameArabic: 'إنشاء الصلاحيات',
            nameEnglish: 'Create Privileges',
            value: 'ROLE_TEAM_CREATE',
            selected: false,
            category: $rootScope.lang === 'AR' ? 'الإدارة' : 'Administrator'
        });
        $scope.roles.push({
            nameArabic: 'تعديل الصلاحيات',
            nameEnglish: 'Update Privileges',
            value: 'ROLE_TEAM_UPDATE',
            selected: false,
            category: $rootScope.lang === 'AR' ? 'الإدارة' : 'Administrator'
        });
        $scope.roles.push({
            nameArabic: 'حذف الصلاحيات',
            nameEnglish: 'Delete Privileges',
            value: 'ROLE_TEAM_DELETE',
            selected: false,
            category: $rootScope.lang === 'AR' ? 'الإدارة' : 'Administrator'
        });
        //////////////////////////Profile////////////////////////////////
        $scope.roles.push({
            nameArabic: 'تعديل الملف الشخصي',
            nameEnglish: 'Edit Profile',
            value: 'ROLE_PROFILE_UPDATE',
            selected: false,
            category: $rootScope.lang === 'AR' ? 'الإدارة' : 'Administrator'
        });
        //////////////////////////Report////////////////////////////////
        $scope.roles.push({
            nameArabic: 'طباعة التقارير',
            nameEnglish: 'Print Reports',
            value: 'ROLE_REPORT_PRINT',
            selected: false,
            category: $rootScope.lang === 'AR' ? 'الإدارة' : 'Administrator'
        });


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

        $scope.submit = function () {
            $scope.team.authorities = [];
            $scope.team.authorities.push('ROLE_PROFILE_UPDATE');
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
        }, 600);

    }]);