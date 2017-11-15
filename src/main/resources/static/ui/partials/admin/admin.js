app.controller("adminCtrl", ['CategoryService', 'QuizService', 'QuestionService', 'AnswerService', 'SummaryService', 'TeamService', 'PersonService', 'ModalProvider', '$rootScope', '$state', '$timeout',
    function (CategoryService, QuizService, QuestionService, AnswerService, SummaryService, TeamService, PersonService, ModalProvider, $rootScope, $state, $timeout) {

        var vm = this;

        /**************************************************************
         *                                                            *
         * Category                                                   *
         *                                                            *
         *************************************************************/
        vm.selectedCategory = {};
        vm.categories = [];
        vm.fetchCategoryData = function () {
            CategoryService.findAll().then(function (data) {
                vm.categories = data;
                vm.setSelectedCategory(data[0]);
            });
        };
        vm.setSelectedCategory = function (object) {
            if (object) {
                angular.forEach(vm.categories, function (category) {
                    if (object.id == category.id) {
                        vm.selectedCategory = category;
                        return category.isSelected = true;
                    } else {
                        return category.isSelected = false;
                    }
                });
            }
        };
        vm.deleteCategory = function (category) {
            if (category) {
                $rootScope.showConfirmNotify("حذف البيانات", "هل تود حذف المادة فعلاً؟", "error", "fa-trash", function () {
                    CategoryService.remove(category.id).then(function () {
                        var index = vm.categories.indexOf(category);
                        vm.categories.splice(index, 1);
                        vm.setSelectedCategory(vm.categories[0]);
                    });
                });
                return;
            }

            $rootScope.showConfirmNotify("حذف البيانات", "هل تود حذف المادة فعلاً؟", "error", "fa-trash", function () {
                CategoryService.remove(vm.selectedCategory.id).then(function () {
                    var index = vm.categories.indexOf(vm.selectedCategory);
                    vm.categories.splice(index, 1);
                    vm.setSelectedCategory(vm.categories[0]);
                });
            });
        };
        vm.newCategory = function () {
            ModalProvider.openCategoryCreateModel().result.then(function (data) {
                vm.categories.splice(0, 0, data);
            }, function () {
                console.info('CategoryCreateModel Closed.');
            });
        };
        vm.rowMenuCategory = [
            {
                html: '<div class="drop-menu">انشاء مادة جديد<span class="fa fa-pencil fa-lg"></span></div>',
                enabled: function () {
                    return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_CATEGORY_CREATE']);
                },
                click: function ($itemScope, $event, value) {
                    vm.newCategory();
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
                    vm.deleteCategory($itemScope.category);
                }
            }
        ];

        /**************************************************************
         *                                                            *
         * Quiz                                                       *
         *                                                            *
         *************************************************************/
        vm.quizzes = [];
        vm.fetchQuizData = function () {
            QuizService.findAll().then(function (data) {
                vm.quizzes = data;
            });
        };
        vm.refreshQuiz = function (quiz) {
            QuizService.findOne(quiz.id).then(function (data) {
                data.isSelected = true;
                angular.forEach(vm.quizzes, function (q) {
                    if(q.id === quiz.id){
                        var index = vm.quizzes.indexOf(q);
                        return vm.quizzes[index] = data;
                    }
                });
            });
        };
        vm.deleteQuiz = function (quiz) {
            $rootScope.showConfirmNotify("حذف البيانات", "هل تود حذف الاختبار فعلاً؟", "error", "fa-trash", function () {
                QuizService.remove(quiz.id).then(function () {
                    var index = vm.quizzes.indexOf(quiz);
                    vm.quizzes.splice(index, 1);
                });
            });
        };
        vm.newQuiz = function () {
            ModalProvider.openQuizCreateModel().result.then(function (data) {
                vm.quizzes.splice(0, 0, data);
            }, function () {
                console.info('QuizCreateModel Closed.');
            });
        };

        /**************************************************************
         *                                                            *
         * Summary                                                    *
         *                                                            *
         *************************************************************/
        vm.deleteSummary = function (summary) {
            $rootScope.showConfirmNotify("حذف البيانات", "هل تود حذف المتدرب فعلاً؟", "error", "fa-trash", function () {
                SummaryService.remove(summary.id).then(function () {
                    angular.forEach(vm.quizzes, function (quiz) {
                        if(summary.quiz.id)
                    });
                    var index = summary.quiz.summaries.indexOf(summary);
                    return summary.summaries.splice(index, 1);
                });
            });
        };
        vm.deleteSummariesByQuestion = function (quiz) {
            $rootScope.showConfirmNotify("حذف البيانات", "هل تود حذف المتدربين فعلاً؟", "error", "fa-trash", function () {
                SummaryService.removeByQuestion(quiz.id).then(function () {
                    return quiz.summaries = [];
                });
            });
        };
        vm.newSummary = function (quiz) {
            ModalProvider.openSummaryCreateModel(quiz).result.then(function (data) {
                return quiz.summaries.splice(0, 0, data);
            }, function () {
                console.info('SummaryCreateModel Closed.');
            });
        };
        vm.updateSummary = function (summary) {
            ModalProvider.openSummaryUpdateModel(summary).result.then(function (data) {
                vm.refreshQuestion(data.quiz);
            }, function () {
                console.info('SummaryCreateModel Closed.');
            });
        };

        /**************************************************************
         *                                                            *
         * Question                                                   *
         *                                                            *
         *************************************************************/
        vm.questions = [];
        vm.fetchQuestionData = function () {
            QuestionService.findAll().then(function (data) {
                vm.questions = data;
            });
        };
        vm.refreshQuestion = function (question) {
            QuestionService.findOne(question.id).then(function (data) {
                data.isSelected = true;
                angular.forEach(vm.questions, function (q) {
                    if(q.id === question.id){
                        var index = vm.questions.indexOf(q);
                        return vm.questions[index] = data;
                    }
                });
            });
        };
        vm.deleteQuestion = function (question) {
            $rootScope.showConfirmNotify("حذف البيانات", "هل تود حذف السؤال فعلاً؟", "error", "fa-trash", function () {
                QuestionService.remove(question.id).then(function () {
                    var index = vm.questions.indexOf(question);
                    vm.questions.splice(index, 1);
                });
            });
        };
        vm.newQuestion = function () {
            ModalProvider.openQuestionCreateModel().result.then(function (data) {
                vm.questions.splice(0, 0, data);
            }, function () {
                console.info('QuestionCreateModel Closed.');
            });
        };

        /**************************************************************
         *                                                            *
         * Answer                                                     *
         *                                                            *
         *************************************************************/
        vm.deleteAnswer = function (answer) {
            $rootScope.showConfirmNotify("حذف البيانات", "هل تود حذف الجواب فعلاً؟", "error", "fa-trash", function () {
                AnswerService.remove(answer.id).then(function () {
                    var index = answer.question.answers.indexOf(answer);
                    return answer.answers.splice(index, 1);
                });
            });
        };
        vm.deleteAnswersByQuestion = function (question) {
            $rootScope.showConfirmNotify("حذف البيانات", "هل تود حذف اجابات السؤال فعلاً؟", "error", "fa-trash", function () {
                AnswerService.removeByQuestion(question.id).then(function () {
                    return question.answers = [];
                });
            });
        };
        vm.newAnswer = function (question) {
            ModalProvider.openAnswerCreateModel(question).result.then(function (data) {
                return question.answers.splice(0, 0, data);
            }, function () {
                console.info('AnswerCreateModel Closed.');
            });
        };
        vm.updateAnswer = function (answer) {
            ModalProvider.openAnswerUpdateModel(answer).result.then(function (data) {
                vm.refreshQuestion(data.question);
            }, function () {
                console.info('AnswerCreateModel Closed.');
            });
        };

        /**************************************************************
         *                                                            *
         * Team                                                       *
         *                                                            *
         *************************************************************/
        vm.selectedTeam = {};
        vm.teams = [];
        vm.fetchTeamData = function () {
            TeamService.findAll().then(function (data) {
                vm.teams = data;
                vm.setSelectedTeam(data[0]);
            });
        };
        vm.setSelectedTeam = function (object) {
            if (object) {
                angular.forEach(vm.teams, function (team) {
                    if (object.id == team.id) {
                        vm.selectedTeam = team;
                        return team.isSelected = true;
                    } else {
                        return team.isSelected = false;
                    }
                });
            }
        };
        vm.deleteTeam = function (team) {
            if (team) {
                $rootScope.showConfirmNotify("حذف البيانات", "هل تود حذف الصلاحيات فعلاً؟", "error", "fa-trash", function () {
                    TeamService.remove(team.id).then(function () {
                        var index = vm.teams.indexOf(team);
                        vm.teams.splice(index, 1);
                        vm.setSelectedTeam(vm.teams[0]);
                    });
                });
                return;
            }

            $rootScope.showConfirmNotify("حذف البيانات", "هل تود حذف الصلاحيات فعلاً؟", "error", "fa-trash", function () {
                TeamService.remove(vm.selectedTeam.id).then(function () {
                    var index = vm.teams.indexOf(vm.selectedTeam);
                    vm.teams.splice(index, 1);
                    vm.setSelectedTeam(vm.teams[0]);
                });
            });
        };
        vm.newTeam = function () {
            ModalProvider.openTeamCreateModel().result.then(function (data) {
                vm.teams.splice(0, 0, data);
            }, function () {
                console.info('TeamCreateModel Closed.');
            });
        };
        vm.rowMenuTeam = [
            {
                html: '<div class="drop-menu">انشاء صلاحيات جديد<span class="fa fa-pencil fa-lg"></span></div>',
                enabled: function () {
                    return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_TEAM_CREATE']);
                },
                click: function ($itemScope, $event, value) {
                    vm.newTeam();
                }
            },
            {
                html: '<div class="drop-menu">تعديل بيانات الصلاحيات<span class="fa fa-edit fa-lg"></span></div>',
                enabled: function () {
                    return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_TEAM_UPDATE']);
                },
                click: function ($itemScope, $event, value) {
                    ModalProvider.openTeamUpdateModel($itemScope.team);
                }
            },
            {
                html: '<div class="drop-menu">حذف الصلاحيات<span class="fa fa-trash fa-lg"></span></div>',
                enabled: function () {
                    return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_TEAM_DELETE']);
                },
                click: function ($itemScope, $event, value) {
                    vm.deleteTeam($itemScope.team);
                }
            }
        ];

        /**************************************************************
         *                                                            *
         * Person                                                     *
         *                                                            *
         *************************************************************/
        vm.selectedPerson = {};
        vm.persons = [];
        vm.fetchPersonData = function () {
            PersonService.findAll().then(function (data) {
                vm.persons = data;
                vm.setSelectedPerson(data[0]);
            });
        };
        vm.setSelectedPerson = function (object) {
            if (object) {
                angular.forEach(vm.persons, function (person) {
                    if (object.id == person.id) {
                        vm.selectedPerson = person;
                        return person.isSelected = true;
                    } else {
                        return person.isSelected = false;
                    }
                });
            }
        };
        vm.deletePerson = function (person) {
            if (person) {
                $rootScope.showConfirmNotify("حذف البيانات", "هل تود حذف المستخدم فعلاً؟", "error", "fa-trash", function () {
                    PersonService.remove(person.id).then(function () {
                        var index = vm.persons.indexOf(person);
                        vm.persons.splice(index, 1);
                        vm.setSelectedPerson(vm.persons[0]);
                    });
                });
                return;
            }

            $rootScope.showConfirmNotify("حذف البيانات", "هل تود حذف المستخدم فعلاً؟", "error", "fa-trash", function () {
                PersonService.remove(vm.selectedPerson.id).then(function () {
                    var index = vm.persons.indexOf(vm.selectedPerson);
                    vm.persons.splice(index, 1);
                    vm.setSelectedPerson(vm.persons[0]);
                });
            });
        };
        vm.newPerson = function () {
            ModalProvider.openPersonCreateModel().result.then(function (data) {
                vm.persons.splice(0, 0, data);
            }, function () {
                console.info('PersonCreateModel Closed.');
            });
        };
        vm.rowMenuPerson = [
            {
                html: '<div class="drop-menu">انشاء حساب جديد<span class="fa fa-pencil fa-lg"></span></div>',
                enabled: function () {
                    return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_PERSON_CREATE']);
                },
                click: function ($itemScope, $event, value) {
                    vm.newPerson();
                }
            },
            {
                html: '<div class="drop-menu">تعديل بيانات الحساب<span class="fa fa-edit fa-lg"></span></div>',
                enabled: function () {
                    return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_PERSON_UPDATE']);
                },
                click: function ($itemScope, $event, value) {
                    ModalProvider.openPersonUpdateModel($itemScope.person);
                }
            },
            {
                html: '<div class="drop-menu">حذف الحساب<span class="fa fa-trash fa-lg"></span></div>',
                enabled: function () {
                    return $rootScope.contains($rootScope.me.team.authorities, ['ROLE_PERSON_DELETE']);
                },
                click: function ($itemScope, $event, value) {
                    vm.deletePerson($itemScope.person);
                }
            }
        ];

        /**************************************************************
         *                                                            *
         * General                                                    *
         *                                                            *
         *************************************************************/
        $timeout(function () {
            window.componentHandler.upgradeAllRegistered();
        }, 1500);

    }]);