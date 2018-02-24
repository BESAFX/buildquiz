app.service('ModalProvider', ['$uibModal', '$log', '$rootScope', function ($uibModal, $log, $rootScope) {

    /**************************************************************
     *                                                            *
     * Trainee Model                                              *
     *                                                            *
     *************************************************************/
    this.openTraineeCreateModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/trainee/traineeCreateUpdate.html',
            controller: 'traineeCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            resolve: {
                title: function () {
                    return $rootScope.lang === 'AR' ? 'انشاء حساب متدرب جديد' : 'New Trainee';
                },
                action: function () {
                    return 'create';
                },
                trainee: function () {
                    return {};
                }
            }
        });
    };

    this.openTraineeUpdateModel = function (trainee) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/trainee/traineeCreateUpdate.html',
            controller: 'traineeCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            resolve: {
                title: function () {
                    return $rootScope.lang === 'AR' ? 'تعديل حساب متدرب' : 'Update Trainee Information';
                },
                action: function () {
                    return 'update';
                },
                trainee: ['TraineeService', function (TraineeService) {
                    return TraineeService.findOne(trainee.id).then(function (data) {
                        return data;
                    });
                }]
            }
        });
    };

    this.openTraineeDetailsModel = function (trainee) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/trainee/traineeDetails.html',
            controller: 'traineeDetailsCtrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            resolve: {
                trainee: ['TraineeService', function (TraineeService) {
                    return TraineeService.findOne(trainee.id).then(function (data) {
                        return data;
                    });
                }]
            }
        });
    };

    this.openTraineeQuizAddModel = function (trainee) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/trainee/traineeQuizAdd.html',
            controller: 'traineeQuizAddCtrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            resolve: {
                title: function () {
                    return $rootScope.lang === 'AR' ? 'اضافة نموذج اختبار' : 'Add Quiz';
                },
                trainee: function () {
                    return trainee;
                }
            }
        });
    };

    /**************************************************************
     *                                                            *
     * Trainer Model                                              *
     *                                                            *
     *************************************************************/
    this.openTrainerCreateModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/trainer/trainerCreateUpdate.html',
            controller: 'trainerCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            resolve: {
                title: function () {
                    return $rootScope.lang === 'AR' ? 'انشاء حساب مدرب جديد' : 'New Trainer';
                },
                action: function () {
                    return 'create';
                },
                trainer: function () {
                    return {};
                }
            }
        });
    };

    this.openTrainerUpdateModel = function (trainer) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/trainer/trainerCreateUpdate.html',
            controller: 'trainerCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            resolve: {
                title: function () {
                    return $rootScope.lang === 'AR' ? 'تعديل حساب مدرب' : 'Update Trainer Information';
                },
                action: function () {
                    return 'update';
                },
                trainer: ['TrainerService', function (TrainerService) {
                    return TrainerService.findOne(trainer.id).then(function (data) {
                        return data;
                    });
                }]
            }
        });
    };

    this.openTrainerDetailsModel = function (trainer) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/trainer/trainerDetails.html',
            controller: 'trainerDetailsCtrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            resolve: {
                trainer: ['TrainerService', function (TrainerService) {
                    return TrainerService.findOne(trainer.id).then(function (data) {
                        return data;
                    });
                }]
            }
        });
    };

    /**************************************************************
     *                                                            *
     * Category Model                                             *
     *                                                            *
     *************************************************************/
    this.openCategoryCreateModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/category/categoryCreateUpdate.html',
            controller: 'categoryCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                title: function () {
                    return $rootScope.lang === 'AR' ? 'انشاء مادة جديدة' : 'New Subject';
                },
                action: function () {
                    return 'create';
                },
                category: function () {
                    return {};
                }
            }
        });
    };

    this.openCategoryUpdateModel = function (category) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/category/categoryCreateUpdate.html',
            controller: 'categoryCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                title: function () {
                    return $rootScope.lang === 'AR' ? 'تعديل بيانات المادة' : 'Update Subject';
                },
                action: function () {
                    return 'update';
                },
                category: function () {
                    return category;
                }
            }
        });
    };

    /**************************************************************
     *                                                            *
     * Quiz Model                                                 *
     *                                                            *
     *************************************************************/
    this.openQuizCreateModel = function (category) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/quiz/quizCreateUpdate.html',
            controller: 'quizCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                title: function () {
                    return $rootScope.lang === 'AR' ? 'انشاء اختبار جديد' : 'New Quiz';
                },
                action: function () {
                    return 'create';
                },
                quiz: function () {
                    var quiz = {};
                    quiz.category = category;
                    return quiz;
                }
            }
        });
    };

    this.openQuizUpdateModel = function (quiz) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/quiz/quizCreateUpdate.html',
            controller: 'quizCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                title: function () {
                    return $rootScope.lang === 'AR' ? 'تعديل بيانات الاختبار' : 'Update Quiz';
                },
                action: function () {
                    return 'update';
                },
                quiz: function () {
                    return quiz;
                }
            }
        });
    };

    this.openQuizDetailsModel = function (quiz) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/quiz/quizDetails.html',
            controller: 'quizDetailsCtrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            resolve: {
                quiz: function () {
                    return quiz;
                }
            }
        });
    };

    /**************************************************************
     *                                                            *
     * Question Model                                             *
     *                                                            *
     *************************************************************/
    this.openQuestionCreateModel = function (quiz) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/question/questionCreateUpdate.html',
            controller: 'questionCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                title: function () {
                    return $rootScope.lang === 'AR' ? 'انشاء سؤال جديد' : 'New Question';
                },
                action: function () {
                    return 'create';
                },
                question: function () {
                    var question = {};
                    question.quiz = quiz;
                    return question;
                }
            }
        });
    };

    this.openQuestionUpdateModel = function (question) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/question/questionCreateUpdate.html',
            controller: 'questionCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                title: function () {
                    return $rootScope.lang === 'AR' ? 'تعديل بيانات السؤال' : 'Update Question';
                },
                action: function () {
                    return 'update';
                },
                question: function () {
                    return question;
                }
            }
        });
    };

    this.openQuestionDetailsModel = function (question) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/question/questionDetails.html',
            controller: 'questionDetailsCtrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            resolve: {
                question: function () {
                    return question;
                }
            }
        });
    };

    /**************************************************************
     *                                                            *
     * Answer Model                                               *
     *                                                            *
     *************************************************************/
    this.openAnswerCreateModel = function (question) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/answer/answerCreateUpdate.html',
            controller: 'answerCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                title: function () {
                    return $rootScope.lang === 'AR' ? 'انشاء اجابة جديد' : 'New Answer';
                },
                action: function () {
                    return 'create';
                },
                answer: function () {
                    var answer = {};
                    answer.isAnswer = false;
                    answer.question = question;
                    return answer;
                }
            }
        });
    };

    this.openAnswerUpdateModel = function (answer) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/answer/answerCreateUpdate.html',
            controller: 'answerCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                title: function () {
                    return $rootScope.lang === 'AR' ? 'تعديل بيانات الاجابة' : 'Update Answer';
                },
                action: function () {
                    return 'update';
                },
                answer: function () {
                    return answer;
                }
            }
        });
    };

    /**************************************************************
     *                                                            *
     * Team Model                                                 *
     *                                                            *
     *************************************************************/
    this.openTeamCreateModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/team/teamCreateUpdate.html',
            controller: 'teamCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            resolve: {
                title: function () {
                    return $rootScope.lang === 'AR' ? 'انشاء مجموعة جديدة' : 'New Team';
                },
                action: function () {
                    return 'create';
                },
                team: function () {
                    return undefined;
                }
            }
        });
    };

    this.openTeamUpdateModel = function (team) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/team/teamCreateUpdate.html',
            controller: 'teamCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            resolve: {
                title: function () {
                    return $rootScope.lang === 'AR' ? 'تعديل بيانات مجموعة' : 'Update Team';
                },
                action: function () {
                    return 'update';
                },
                team: function () {
                    return team;
                }
            }
        });
    };

    /**************************************************************
     *                                                            *
     * Confirm Model                                              *
     *                                                            *
     *************************************************************/
    this.openConfirmModel = function (title, icon, message) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/modal/confirmModal.html',
            controller: 'confirmModalCtrl',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                title: function () {
                    return title;
                },
                icon: function () {
                    return icon;
                },
                message: function () {
                    return message;
                }
            }
        });
    };

}]);

app.service('NotificationProvider', ['$http', function ($http) {

    this.notifyOne = function (code, title, message, type, receiver) {
        $http.post("/notifyOne?"
            + 'code=' + code
            + '&'
            + 'title=' + title
            + '&'
            + 'message=' + message
            + '&'
            + 'type=' + type
            + '&'
            + 'receiver=' + receiver);
    };
    this.notifyAll = function (code, title, message, type) {
        $http.post("/notifyAll?"
            + 'code=' + code
            + '&'
            + 'title=' + title
            + '&'
            + 'message=' + message
            + '&'
            + 'type=' + type
        );
    };
    this.notifyAllExceptMe = function (code, title, message, type) {
        $http.post("/notifyAllExceptMe?"
            + 'code=' + code
            + '&'
            + 'title=' + title
            + '&'
            + 'message=' + message
            + '&'
            + 'type=' + type
        );
    };

}]);

