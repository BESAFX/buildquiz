function menuCtrl($scope,
                  $rootScope,
                  $state,
                  $timeout,
                  $uibModal,
                  ModalProvider,
                  TrainerService,
                  TraineeService,
                  CategoryService,
                  QuizService,
                  QuestionService,
                  AnswerService,
                  TeamService,
                  PersonService) {

    /**************************************************************************************************************
     *                                                                                                            *
     * General                                                                                                    *
     *                                                                                                            *
     **************************************************************************************************************/
    $timeout(function () {
        window.componentHandler.upgradeAllRegistered();
    }, 600);
    $scope.$watch('toggleState', function (newValue, oldValue) {
        switch (newValue) {
            case 'menu': {
                $scope.pageTitle = $rootScope.lang==='AR' ? 'القائمة' : 'Menu';
                $scope.MDLIcon = 'widgets';
                break;
            }
            case 'trainer': {
                $scope.pageTitle = $rootScope.lang==='AR' ? 'المدربين' : 'Trainers';
                $scope.MDLIcon = 'person_pin';
                break;
            }
            case 'trainee': {
                $scope.pageTitle = $rootScope.lang==='AR' ? 'المتدربين' : 'Trainees';
                $scope.MDLIcon = 'account_circle';
                break;
            }
            case 'quiz': {
                $scope.pageTitle = $rootScope.lang==='AR' ? 'الاختبارات' : 'Quizzes';
                $scope.MDLIcon = 'lightbulb_outline';
                break;
            }
            case 'team': {
                $scope.pageTitle = $rootScope.lang==='AR' ? 'الصلاحيات' : 'Teams';
                $scope.MDLIcon = 'security';
                break;
            }
            case 'profile': {
                $scope.pageTitle = $rootScope.lang==='AR' ? 'الملف الشخصي' : 'Profile';
                $scope.MDLIcon = 'account_circle';
                break;
            }
            case 'help': {
                $scope.pageTitle = $rootScope.lang==='AR' ? 'المساعدة' : 'Help';
                $scope.MDLIcon = 'help';
                break;
            }
            case 'about': {
                $scope.pageTitle = $rootScope.lang==='AR' ? 'عن البرنامج' : 'About';
                $scope.MDLIcon = 'info';
                break;
            }
            case 'report': {
                $scope.pageTitle = $rootScope.lang==='AR' ? 'التقارير' : 'Reports';
                $scope.MDLIcon = 'print';
                break;
            }
        }
        $timeout(function () {
            window.componentHandler.upgradeAllRegistered();
        }, 500);
    }, true);
    $scope.toggleState = 'menu';
    $scope.openStateMenu = function () {
        $scope.toggleState = 'menu';
    };
    $scope.openStateTrainer = function () {
        $scope.toggleState = 'trainer';
    };
    $scope.openStateTrainee = function () {
        $scope.toggleState = 'trainee';
    };
    $scope.openStateQuiz = function () {
        $scope.toggleState = 'quiz';
    };
    $scope.openStateTeam = function () {
        $scope.toggleState = 'team';
        $timeout(function () {
            $scope.fetchTeamTableData();
        }, 500);
    };
    $scope.openStateProfile = function () {
        $scope.toggleState = 'profile';
    };
    $scope.openStateHelp = function () {
        $scope.toggleState = 'help';
    };
    $scope.openStateAbout = function () {
        $scope.toggleState = 'about';
    };
    $scope.openStateReport = function () {
        $scope.toggleState = 'report';
    };

    /**************************************************************************************************************
     *                                                                                                            *
     * Trainer                                                                                                    *
     *                                                                                                            *
     **************************************************************************************************************/
    $scope.trainers = [];
    $scope.paramTrainer = {};
    $scope.findAllTrainers = function () {
        TrainerService.findAll().then(function (data) {
            $scope.trainers = data;
        });
    };
    $scope.filterTrainer = function () {
        var search = [];
        if ($scope.paramTrainer.code) {
            search.push('code=');
            search.push($scope.paramTrainer.code);
            search.push('&');
        }
        if ($scope.paramTrainer.name) {
            search.push('name=');
            search.push($scope.paramTrainer.name);
            search.push('&');
        }
        if ($scope.paramTrainer.mobile) {
            search.push('mobile=');
            search.push($scope.paramTrainer.mobile);
            search.push('&');
        }
        if ($scope.paramTrainer.identityNumber) {
            search.push('identityNumber=');
            search.push($scope.paramTrainer.identityNumber);
            search.push('&');
        }
        if ($scope.paramTrainer.email) {
            search.push('email=');
            search.push($scope.paramTrainer.email);
            search.push('&');
        }
        TrainerService.filter(search.join("")).then(function (data) {
            $scope.trainers = data;
        });
    };
    $scope.openFilterTrainer = function () {
        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/trainer/trainerFilter.html',
            controller: 'trainerFilterCtrl',
            scope: $scope,
            backdrop: 'static',
            keyboard: false
        });

        modalInstance.result.then(function (paramTrainer) {

            $scope.paramTrainer = paramTrainer;

            $scope.filterTrainer();

        }, function () {});
    };
    $scope.deleteTrainer = function (trainer) {
        $rootScope.showConfirmNotify("حذف البيانات", "هل تود حذف المدرب وكل ما يتعلق به من حسابات فعلاً؟", "error", "fa-trash", function () {
            TrainerService.remove(trainer.id).then(function () {
                var index = $scope.trainers.indexOf(trainer);
                return $scope.trainers.splice(index, 1);
            });
        });
    };
    $scope.newTrainer = function () {
        ModalProvider.openTrainerCreateModel().result.then(function (data) {
            return $scope.trainers.splice(0, 0, data);
        }, function () {});
    };
    $scope.enableTrainer = function (trainer) {
        TrainerService.enable(trainer).then(function () {
            trainer.trainerEnabledInArabic = data.trainerEnabledInArabic;
            trainer.trainerEnabledInEnglish = data.trainerEnabledInEnglish;
            return trainer;
        });
    };
    $scope.disableTrainer = function (trainer) {
        TrainerService.disable(trainer).then(function () {
            trainer.trainerEnabledInArabic = data.trainerEnabledInArabic;
            trainer.trainerEnabledInEnglish = data.trainerEnabledInEnglish;
            return trainer;
        });
    };
    $scope.rowMenuTrainer = [
        {
            html: '<div class="drop-menu">انشاء متدرب جديد<span class="fa fa-pencil fa-lg"></span></div>',
            enabled: function () {
                return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_TRAINEE_CREATE']);
            },
            click: function ($itemScope, $event, value) {
                $scope.newTrainer();
            }
        },
        {
            html: '<div class="drop-menu">تعديل بيانات المدرب<span class="fa fa-edit fa-lg"></span></div>',
            enabled: function () {
                return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_TRAINEE_UPDATE']);
            },
            click: function ($itemScope, $event, value) {
                ModalProvider.openTrainerUpdateModel($itemScope.trainer);
            }
        },
        {
            html: '<div class="drop-menu">تفعيل المدرب<span class="fa fa-eye fa-lg"></span></div>',
            enabled: function () {
                return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_TRAINEE_ENABLE']);
            },
            click: function ($itemScope, $event, value) {
                $scope.enableTrainer($itemScope.trainer);
            }
        },
        {
            html: '<div class="drop-menu">تعطيل المدرب<span class="fa fa-eye-slash fa-lg"></span></div>',
            enabled: function () {
                return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_TRAINEE_DISABLE']);
            },
            click: function ($itemScope, $event, value) {
                $scope.disableTrainer($itemScope.trainer);
            }
        },
        {
            html: '<div class="drop-menu">حذف المدرب<span class="fa fa-trash fa-lg"></span></div>',
            enabled: function () {
                return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_TRAINEE_DELETE']);
            },
            click: function ($itemScope, $event, value) {
                $scope.deleteTrainer($itemScope.trainer);
            }
        },
        {
            html: '<div class="drop-menu">التفاصيل<span class="fa fa-info fa-lg"></span></div>',
            enabled: function () {
                return true;
            },
            click: function ($itemScope, $event, value) {
                ModalProvider.openTrainerDetailsModel($itemScope.trainer);
            }
        }
    ];

    /**************************************************************************************************************
     *                                                                                                            *
     * Trainee                                                                                                    *
     *                                                                                                            *
     **************************************************************************************************************/
    $scope.trainees = [];
    $scope.paramTrainee = {};
    $scope.findAllTrainees = function () {
        TraineeService.findAll().then(function (data) {
            $scope.trainees = data;
        });
    };
    $scope.filterTrainee = function () {
        var search = [];
        if ($scope.paramTrainee.code) {
            search.push('code=');
            search.push($scope.paramTrainee.code);
            search.push('&');
        }
        if ($scope.paramTrainee.name) {
            search.push('name=');
            search.push($scope.paramTrainee.name);
            search.push('&');
        }
        if ($scope.paramTrainee.mobile) {
            search.push('mobile=');
            search.push($scope.paramTrainee.mobile);
            search.push('&');
        }
        if ($scope.paramTrainee.identityNumber) {
            search.push('identityNumber=');
            search.push($scope.paramTrainee.identityNumber);
            search.push('&');
        }
        if ($scope.paramTrainee.email) {
            search.push('email=');
            search.push($scope.paramTrainee.email);
            search.push('&');
        }
        TraineeService.filter(search.join("")).then(function (data) {
            $scope.trainees = data;
        });
    };
    $scope.openFilterTrainee = function () {
        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/trainee/traineeFilter.html',
            controller: 'traineeFilterCtrl',
            scope: $scope,
            backdrop: 'static',
            keyboard: false
        });

        modalInstance.result.then(function (paramTrainee) {

            $scope.paramTrainee = paramTrainee;

            $scope.filterTrainee();

        }, function () {});
    };
    $scope.deleteTrainee = function (trainee) {
        $rootScope.showConfirmNotify("حذف البيانات", "هل تود حذف المتدرب وكل ما يتعلق به من حسابات فعلاً؟", "error", "fa-trash", function () {
            TraineeService.remove(trainee.id).then(function () {
                var index = $scope.trainees.indexOf(trainee);
                return $scope.trainees.splice(index, 1);
            });
        });
    };
    $scope.newTrainee = function () {
        ModalProvider.openTraineeCreateModel().result.then(function (data) {
            return $scope.trainees.splice(0, 0, data);
        }, function () {});
    };
    $scope.enableTrainee = function (trainee) {
        TraineeService.enable(trainee).then(function () {
            trainee.traineeEnabledInArabic = data.traineeEnabledInArabic;
            trainee.traineeEnabledInEnglish = data.traineeEnabledInEnglish;
            return trainee;
        });
    };
    $scope.disableTrainee = function (trainee) {
        TraineeService.disable(trainee).then(function () {
            trainee.traineeEnabledInArabic = data.traineeEnabledInArabic;
            trainee.traineeEnabledInEnglish = data.traineeEnabledInEnglish;
            return trainee;
        });
    };
    $scope.rowMenuTrainee = [
        {
            html: '<div class="drop-menu">انشاء متدرب جديد<span class="fa fa-pencil fa-lg"></span></div>',
            enabled: function () {
                return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_TRAINEE_CREATE']);
            },
            click: function ($itemScope, $event, value) {
                $scope.newTrainee();
            }
        },
        {
            html: '<div class="drop-menu">تعديل بيانات المتدرب<span class="fa fa-edit fa-lg"></span></div>',
            enabled: function () {
                return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_TRAINEE_UPDATE']);
            },
            click: function ($itemScope, $event, value) {
                ModalProvider.openTraineeUpdateModel($itemScope.trainee);
            }
        },
        {
            html: '<div class="drop-menu">تفعيل المتدرب<span class="fa fa-eye fa-lg"></span></div>',
            enabled: function () {
                return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_TRAINEE_ENABLE']);
            },
            click: function ($itemScope, $event, value) {
                $scope.enableTrainee($itemScope.trainee);
            }
        },
        {
            html: '<div class="drop-menu">تعطيل المتدرب<span class="fa fa-eye-slash fa-lg"></span></div>',
            enabled: function () {
                return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_TRAINEE_DISABLE']);
            },
            click: function ($itemScope, $event, value) {
                $scope.disableTrainee($itemScope.trainee);
            }
        },
        {
            html: '<div class="drop-menu">حذف المتدرب<span class="fa fa-trash fa-lg"></span></div>',
            enabled: function () {
                return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_TRAINEE_DELETE']);
            },
            click: function ($itemScope, $event, value) {
                $scope.deleteTrainee($itemScope.trainee);
            }
        },
        {
            html: '<div class="drop-menu">التفاصيل<span class="fa fa-info fa-lg"></span></div>',
            enabled: function () {
                return true;
            },
            click: function ($itemScope, $event, value) {
                ModalProvider.openTraineeDetailsModel($itemScope.trainee);
            }
        }
    ];

    /**************************************************************
     *                                                            *
     * Category                                                   *
     *                                                            *
     *************************************************************/
    $scope.categories = [];
    $scope.fetchCategoryData = function () {
        CategoryService.findAll().then(function (data) {
            $scope.categories = data;
        });
    };
    $scope.deleteCategory = function (category) {
        $rootScope.showConfirmNotify("حذف البيانات", "هل تود حذف المادة فعلاً؟", "error", "fa-trash", function () {
            CategoryService.remove(category.id).then(function () {
                var index = $scope.categories.indexOf(category);
                $scope.categories.splice(index, 1);
            });
        });
    };
    $scope.newCategory = function () {
        ModalProvider.openCategoryCreateModel().result.then(function (data) {
            $scope.categories.splice(0, 0, data);
        }, function () {});
    };
    $scope.rowMenuCategory = [
        {
            html: '<div class="drop-menu">انشاء مادة جديد<span class="fa fa-pencil fa-lg"></span></div>',
            enabled: function () {
                return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_CATEGORY_CREATE']);
            },
            click: function ($itemScope, $event, value) {
                $scope.newCategory();
            }
        },
        {
            html: '<div class="drop-menu">تعديل بيانات المادة<span class="fa fa-edit fa-lg"></span></div>',
            enabled: function () {
                return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_CATEGORY_UPDATE']);
            },
            click: function ($itemScope, $event, value) {
                ModalProvider.openCategoryUpdateModel($itemScope.category);
            }
        },
        {
            html: '<div class="drop-menu">حذف المادة<span class="fa fa-trash fa-lg"></span></div>',
            enabled: function () {
                return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_CATEGORY_DELETE']);
            },
            click: function ($itemScope, $event, value) {
                $scope.deleteCategory($itemScope.category);
            }
        }
    ];

    /**************************************************************
     *                                                            *
     * Quiz                                                       *
     *                                                            *
     *************************************************************/
    $scope.quizzes = [];
    $scope.fetchQuizData = function () {
        QuizService.findAll().then(function (data) {
            $scope.quizzes = data;
        });
    };
    $scope.refreshQuiz = function (quiz) {
        QuizService.findOne(quiz.id).then(function (data) {
            data.isSelected = true;
            angular.forEach($scope.quizzes, function (q) {
                if(q.id === quiz.id){
                    var index = $scope.quizzes.indexOf(q);
                    return $scope.quizzes[index] = data;
                }
            });
        });
    };
    $scope.deleteQuiz = function (quiz) {
        $rootScope.showConfirmNotify("حذف البيانات", "هل تود حذف الاختبار فعلاً؟", "error", "fa-trash", function () {
            QuizService.remove(quiz.id).then(function () {
                var index = $scope.quizzes.indexOf(quiz);
                $scope.quizzes.splice(index, 1);
            });
        });
    };
    $scope.newQuiz = function () {
        ModalProvider.openQuizCreateModel().result.then(function (data) {
            $scope.quizzes.splice(0, 0, data);
        }, function () {});
    };
    $scope.rowMenuQuiz = [
        {
            html: '<div class="drop-menu">انشاء اختبار جديد<span class="fa fa-pencil fa-lg"></span></div>',
            enabled: function () {
                return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_QUIZ_CREATE']);
            },
            click: function ($itemScope, $event, value) {
                $scope.newQuiz();
            }
        },
        {
            html: '<div class="drop-menu">تعديل بيانات الاختبار<span class="fa fa-edit fa-lg"></span></div>',
            enabled: function () {
                return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_QUIZ_UPDATE']);
            },
            click: function ($itemScope, $event, value) {
                ModalProvider.openQuizUpdateModel($itemScope.quiz);
            }
        },
        {
            html: '<div class="drop-menu">حذف الاختبار<span class="fa fa-trash fa-lg"></span></div>',
            enabled: function () {
                return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_QUIZ_DELETE']);
            },
            click: function ($itemScope, $event, value) {
                $scope.deleteQuiz($itemScope.quiz);
            }
        },
        {
            html: '<div class="drop-menu">التفاصيل<span class="fa fa-info fa-lg"></span></div>',
            enabled: function () {
                return true;
            },
            click: function ($itemScope, $event, value) {
                ModalProvider.openQuizDetailsModel($itemScope.quiz)
            }
        }
    ];

    /**************************************************************
     *                                                            *
     * Question                                                   *
     *                                                            *
     *************************************************************/
    $scope.questions = [];
    $scope.fetchQuestionData = function () {
        QuestionService.findAll().then(function (data) {
            $scope.questions = data;
        });
    };
    $scope.refreshQuestion = function (question) {
        QuestionService.findOne(question.id).then(function (data) {
            data.isSelected = true;
            angular.forEach($scope.questions, function (q) {
                if(q.id === question.id){
                    var index = $scope.questions.indexOf(q);
                    return $scope.questions[index] = data;
                }
            });
        });
    };
    $scope.deleteQuestion = function (question) {
        $rootScope.showConfirmNotify("حذف البيانات", "هل تود حذف السؤال فعلاً؟", "error", "fa-trash", function () {
            QuestionService.remove(question.id).then(function () {
                var index = $scope.questions.indexOf(question);
                $scope.questions.splice(index, 1);
            });
        });
    };
    $scope.newQuestion = function () {
        ModalProvider.openQuestionCreateModel().result.then(function (data) {
            $scope.questions.splice(0, 0, data);
        }, function () {});
    };

    /**************************************************************
     *                                                            *
     * Answer                                                     *
     *                                                            *
     *************************************************************/
    $scope.deleteAnswer = function (answer) {
        $rootScope.showConfirmNotify("حذف البيانات", "هل تود حذف الجواب فعلاً؟", "error", "fa-trash", function () {
            AnswerService.remove(answer.id).then(function () {
                var index = answer.question.answers.indexOf(answer);
                return answer.answers.splice(index, 1);
            });
        });
    };
    $scope.deleteAnswersByQuestion = function (question) {
        $rootScope.showConfirmNotify("حذف البيانات", "هل تود حذف اجابات السؤال فعلاً؟", "error", "fa-trash", function () {
            AnswerService.removeByQuestion(question.id).then(function () {
                return question.answers = [];
            });
        });
    };
    $scope.newAnswer = function (question) {
        ModalProvider.openAnswerCreateModel(question).result.then(function (data) {
            return question.answers.splice(0, 0, data);
        }, function () {});
    };
    $scope.updateAnswer = function (answer) {
        ModalProvider.openAnswerUpdateModel(answer).result.then(function (data) {
            $scope.refreshQuestion(data.question);
        }, function () {});
    };

    /**************************************************************************************************************
     *                                                                                                            *
     * Team                                                                                                       *
     *                                                                                                            *
     **************************************************************************************************************/
    $scope.teams = [];
    $scope.fetchTeamTableData = function () {
        TeamService.findAll().then(function (data) {
            $scope.teams = data;
        });
    };
    $scope.newTeam = function () {
        ModalProvider.openTeamCreateModel().result.then(function (data) {
            $scope.teams.splice(0, 0, data);
        }, function () {
        });
    };
    $scope.deleteTeam = function (team) {
        $rootScope.showConfirmNotify("حذف البيانات", "هل تود حذف المجموعة فعلاً؟", "error", "fa-trash", function () {
            TeamService.remove(team.id).then(function () {
                var index = $scope.teams.indexOf(team);
                $scope.teams.splice(index, 1);
            });
        });
    };
    $scope.rowMenuTeam = [
        {
            html: '<div class="drop-menu">انشاء مجموعة جديدة<span class="fa fa-pencil fa-lg"></span></div>',
            enabled: function () {
                return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_TEAM_CREATE']);
            },
            click: function ($itemScope, $event, value) {
                $scope.newTeam();
            }
        },
        {
            html: '<div class="drop-menu">تعديل بيانات المجموعة<span class="fa fa-edit fa-lg"></span></div>',
            enabled: function () {
                return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_TEAM_UPDATE']);
            },
            click: function ($itemScope, $event, value) {
                ModalProvider.openTeamUpdateModel($itemScope.team);
            }
        },
        {
            html: '<div class="drop-menu">حذف المجموعة<span class="fa fa-trash fa-lg"></span></div>',
            enabled: function () {
                return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_TEAM_DELETE']);
            },
            click: function ($itemScope, $event, value) {
                $scope.deleteTeam($itemScope.team);
            }
        }
    ];

    /**************************************************************************************************************
     *                                                                                                            *
     * Profile                                                                                                    *
     *                                                                                                            *
     **************************************************************************************************************/
    $scope.submitProfile = function () {
        PersonService.update($scope.me).then(function (data) {
            $scope.me = data;
        });
    };
    $scope.browseProfilePhoto = function () {
        document.getElementById('uploader-profile').click();
    };
    $scope.uploadPersonPhoto = function (files) {
        PersonService.uploadPersonPhoto(files[0]).then(function (data) {
            $scope.me.photo = data;
        });
    };

}
menuCtrl.$inject = [
    '$scope',
    '$rootScope',
    '$state',
    '$timeout',
    '$uibModal',
    'ModalProvider',
    'TrainerService',
    'TraineeService',
    'CategoryService',
    'QuizService',
    'AnswerService',
    'QuestionService',
    'TeamService',
    'PersonService'
];

app.controller("menuCtrl", menuCtrl);