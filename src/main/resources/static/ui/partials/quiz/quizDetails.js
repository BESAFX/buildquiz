app.controller('quizDetailsCtrl', [
    'QuizService',
    'QuestionService',
    'ModalProvider',
    '$scope',
    '$rootScope',
    '$timeout',
    '$log',
    '$uibModalInstance',
    'quiz',
    function (
        QuizService,
        QuestionService,
        ModalProvider,
        $scope,
        $rootScope,
        $timeout,
        $log,
        $uibModalInstance,
        quiz) {

        $scope.quiz = quiz;
        $scope.refreshQuiz = function () {
            QuizService.findOne($scope.quiz.id).then(function (data) {
                $scope.quiz = data
            });
        };
        $scope.refreshQuestions = function () {
            QuestionService.findByQuiz($scope.quiz).then(function (data) {
                $scope.quiz.questions = data;
            });
        };
        $scope.newQuestion = function () {
            ModalProvider.openQuestionCreateModel(quiz).result.then(function (data) {
                return $scope.quiz.questions.splice(0, 0, data);
            });
        };
        $scope.deleteQuestion = function (question) {
            ModalProvider.openConfirmModel("حذف الاسئلة", "error", "هل تود حذف السؤال فعلاً؟")
                .result.then(function (action) {
                if(action){
                    QuestionService.remove(question.id).then(function () {
                        var index = $scope.questions.indexOf(question);
                        $scope.questions.splice(index, 1);
                    });
                }
            })
        };
        $scope.rowMenuQuestion = [
            {
                html: '<div class="drop-menu">انشاء سؤال جديد<span class="fa fa-pencil fa-lg"></span></div>',
                enabled: function () {
                    return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_QUESTION_CREATE']);
                },
                click: function ($itemScope, $event, value) {
                    $scope.newQuestion();
                }
            },
            {
                html: '<div class="drop-menu">تعديل بيانات السؤال<span class="fa fa-edit fa-lg"></span></div>',
                enabled: function () {
                    return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_QUESTION_UPDATE']);
                },
                click: function ($itemScope, $event, value) {
                    ModalProvider.openQuestionUpdateModel($itemScope.question);
                }
            },
            {
                html: '<div class="drop-menu">حذف السؤال<span class="fa fa-trash fa-lg"></span></div>',
                enabled: function () {
                    return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_QUESTION_DELETE']);
                },
                click: function ($itemScope, $event, value) {
                    $scope.deleteQuestion($itemScope.question);
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