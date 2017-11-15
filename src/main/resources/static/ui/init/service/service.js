app.service('ModalProvider', ['$uibModal', '$log', '$rootScope', function ($uibModal, $log, $rootScope) {

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
            templateUrl: '/ui/partials/admin/category/categoryCreateUpdate.html',
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
            templateUrl: '/ui/partials/admin/category/categoryCreateUpdate.html',
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
    this.openQuizCreateModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/admin/quiz/quizCreateUpdate.html',
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
                    return {};
                }
            }
        });
    };

    this.openQuizUpdateModel = function (quiz) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/admin/quiz/quizCreateUpdate.html',
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

    /**************************************************************
     *                                                            *
     * Question Model                                             *
     *                                                            *
     *************************************************************/
    this.openQuestionCreateModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/admin/question/questionCreateUpdate.html',
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
                    return {};
                }
            }
        });
    };

    this.openQuestionUpdateModel = function (question) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/admin/question/questionCreateUpdate.html',
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
            templateUrl: '/ui/partials/admin/question/answerCreateUpdate.html',
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
            templateUrl: '/ui/partials/admin/question/answerCreateUpdate.html',
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
     * Summary Model                                              *
     *                                                            *
     *************************************************************/
    this.openSummaryCreateModel = function (quiz) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/admin/quiz/summaryCreateUpdate.html',
            controller: 'summaryCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                title: function () {
                    return $rootScope.lang === 'AR' ? 'انشاء اختبار متدرب جديد' : 'New Quiz For Trainer';
                },
                action: function () {
                    return 'create';
                },
                summary: function () {
                    var summary = {};
                    summary.quiz = quiz;
                    return summary;
                }
            }
        });
    };

    this.openSummaryUpdateModel = function (summary) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/admin/quiz/summaryCreateUpdate.html',
            controller: 'summaryCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                title: function () {
                    return $rootScope.lang === 'AR' ? 'تعديل بيانات الاختبار للمتدرب' : 'Update Quiz For Trainer';
                },
                action: function () {
                    return 'update';
                },
                summary: function () {
                    return summary;
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
            templateUrl: '/ui/partials/admin/team/teamCreateUpdate.html',
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
            templateUrl: '/ui/partials/admin/team/teamCreateUpdate.html',
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
     * Person Model                                               *
     *                                                            *
     *************************************************************/
    this.openPersonCreateModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/admin/person/personCreateUpdate.html',
            controller: 'personCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            resolve: {
                title: function () {
                    return $rootScope.lang === 'AR' ? 'انشاء حساب جديد' : 'New User';
                },
                action: function () {
                    return 'create';
                },
                person: function () {
                    return {};
                }
            }
        });
    };

    this.openPersonUpdateModel = function (person) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/admin/person/personCreateUpdate.html',
            controller: 'personCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            resolve: {
                title: function () {
                    return $rootScope.lang === 'AR' ? 'تعديل بيانات الحساب' : 'Update User';
                },
                action: function () {
                    return 'update';
                },
                person: function () {
                    return person;
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

