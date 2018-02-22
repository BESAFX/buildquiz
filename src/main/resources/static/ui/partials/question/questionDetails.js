app.controller('questionDetailsCtrl', [
    'QuestionService',
    'AnswerService',
    'ModalProvider',
    '$scope',
    '$rootScope',
    '$timeout',
    '$log',
    '$uibModalInstance',
    'question',
    function (
        QuestionService,
        AnswerService,
        ModalProvider,
        $scope,
        $rootScope,
        $timeout,
        $log,
        $uibModalInstance,
        question) {

        $scope.question = question;
        $scope.refreshQuestion = function () {
            QuestionService.findOne($scope.question.id).then(function (data) {
                $scope.question = data
            });
        };
        $scope.refreshAnswers = function () {
            AnswerService.findByQuestion($scope.question).then(function (data) {
                return $scope.question.answers = data;
            });
        };
        $scope.newAnswer = function () {
            ModalProvider.openAnswerCreateModel(question).result.then(function (data) {
                return $scope.question.answers.splice(0, 0, data);
            });
        };
        $scope.deleteAnswer = function (answer) {
            ModalProvider.openConfirmModel("حذف الاجابات", "error", "هل تود حذف الاجابة فعلاً؟")
                .result.then(function (action) {
                if(action){
                    AnswerService.remove(answer.id).then(function () {
                        var index = $scope.question.answers.indexOf(answer);
                        return $scope.question.answers.splice(index, 1);
                    });
                }
            })
        };
        $scope.rowMenuAnswer = [
            {
                html: '<div class="drop-menu">انشاء اختيار جديد<span class="fa fa-pencil fa-lg"></span></div>',
                enabled: function () {
                    return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_ANSWER_CREATE']);
                },
                click: function ($itemScope, $event, value) {
                    $scope.newAnswer();
                }
            },
            {
                html: '<div class="drop-menu">تعديل بيانات الاختيار<span class="fa fa-edit fa-lg"></span></div>',
                enabled: function () {
                    return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_ANSWER_UPDATE']);
                },
                click: function ($itemScope, $event, value) {
                    ModalProvider.openAnswerUpdateModel($itemScope.answer);
                }
            },
            {
                html: '<div class="drop-menu">حذف الاختيار<span class="fa fa-trash fa-lg"></span></div>',
                enabled: function () {
                    return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_ANSWER_DELETE']);
                },
                click: function ($itemScope, $event, value) {
                    $scope.deleteAnswer($itemScope.answer);
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