var app = angular.module('Application',
    [
        'ui.router',
        'ngAnimate',
        'toggle-switch',
        'jcs-autoValidate',
        'fm',
        'ngSanitize',
        'counter',
        'FBAngular',
        'ui.bootstrap',
        'angularCSS',
        'smart-table',
        'lrDragNDrop',
        'nya.bootstrap.select',
        'localytics.directives',
        'angularFileUpload',
        'ngLoadingSpinner',
        'ngStomp',
        'luegg.directives',
        'monospaced.elastic',
        'pageslide-directive',
        'ui.bootstrap.contextMenu',
        'kdate',
        'ui.sortable',
        'timer',
        'chart.js'
    ]);

app.factory('errorInterceptor', ['$q', '$rootScope', '$location', '$log',
    function ($q, $rootScope, $location, $log) {
        return {
            request: function (config) {
                return config || $q.when(config);
            },
            requestError: function (request) {
                return $q.reject(request);
            },
            response: function (response) {
                return response || $q.when(response);
            },
            responseError: function (response) {
                if (response && response.status === 404) {
                }
                if (response && response.status >= 500) {
                    $rootScope.showTechnicalNotify("الدعم الفني", response.data.message, "error", "fa-ban");
                }
                return $q.reject(response);
            }
        };
    }]);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$cssProvider', 'ChartJsProvider', '$httpProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider, $cssProvider, ChartJsProvider, $httpProvider) {

        ChartJsProvider.setOptions({colors: ['#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360']});

        $urlRouterProvider.otherwise("/home");

        $locationProvider.html5Mode(true);

        $httpProvider.interceptors.push('errorInterceptor');

        angular.extend($cssProvider.defaults, {
            container: 'head',
            method: 'append',
            persist: false,
            preload: false,
            bustCache: false
        });

        /**************************************************************
         *                                                            *
         * Home State                                                 *
         *                                                            *
         *************************************************************/
        $stateProvider.state("home", {
            url: "/home",
            css: [
                '/ui/css/mdl-style-brown-deep_orange.css',
                '/ui/css/theme-black.css'
            ],
            views: {
                '': {
                    templateUrl: "/ui/partials/home/home.html",
                    controller: "homeCtrl"
                }
            }
        });

        /**************************************************************
         *                                                            *
         * Admin State                                                *
         *                                                            *
         *************************************************************/
        $stateProvider.state("admin", {
            url: "/admin",
            templateUrl: "/ui/partials/admin/admin.html",
            controller: "adminCtrl",
            controllerAs: "adminCtrl"
        });

        $stateProvider.state("admin.category", {
            url: "/category",
            css: [
                '/ui/css/mdl-style-red-deep_orange.css',
                '/ui/css/theme-black.css'
            ],
            views:{
                'body@admin':{
                    templateUrl: "/ui/partials/admin/category/body.html"
                },
                'options@admin':{
                    templateUrl: "/ui/partials/admin/category/options.html"
                },
                'menu@admin':{
                    templateUrl: "/ui/partials/admin/category/menu.html"
                }
            }
        });

        $stateProvider.state("admin.quiz", {
            url: "/quiz",
            css : [
                '/ui/css/mdl-style-purple-pink.css',
                '/ui/css/theme-black.css'
            ],
            views:{
                'body@admin':{
                    templateUrl: "/ui/partials/admin/quiz/body.html"
                },
                'options@admin':{
                    templateUrl: "/ui/partials/admin/quiz/options.html"
                },
                'menu@admin':{
                    templateUrl: "/ui/partials/admin/quiz/menu.html"
                }
            }
        });

        $stateProvider.state("admin.question", {
            url: "/question",
            css: [
                '/ui/css/mdl-style-green-orange.css',
                '/ui/css/theme-black.css'
            ],
            views:{
                'body@admin':{
                    templateUrl: "/ui/partials/admin/question/body.html"
                },
                'options@admin':{
                    templateUrl: "/ui/partials/admin/question/options.html"
                },
                'menu@admin':{
                    templateUrl: "/ui/partials/admin/question/menu.html"
                }
            }
        });

        $stateProvider.state("admin.team", {
            url: "/team",
            css: [
                '/ui/css/mdl-style-indigo-pink.css',
                '/ui/css/theme-black.css'
            ],
            views:{
                'body@admin':{
                    templateUrl: "/ui/partials/admin/team/body.html"
                },
                'options@admin':{
                    templateUrl: "/ui/partials/admin/team/options.html"
                },
                'menu@admin':{
                    templateUrl: "/ui/partials/admin/team/menu.html"
                }
            }
        });

        $stateProvider.state("admin.person", {
            url: "/person",
            css: [
                '/ui/css/mdl-style-lime-orange.css',
                '/ui/css/theme-black.css'
            ],
            views:{
                'body@admin':{
                    templateUrl: "/ui/partials/admin/person/body.html"
                },
                'options@admin':{
                    templateUrl: "/ui/partials/admin/person/options.html"
                },
                'menu@admin':{
                    templateUrl: "/ui/partials/admin/person/menu.html"
                }
            }
        });

        /**************************************************************
         *                                                            *
         * Help State                                                 *
         *                                                            *
         *************************************************************/
        $stateProvider.state("help", {
            url: "/help",
            css: [
                '/ui/css/mdl-style.css',
                '/ui/css/theme-black.css'
            ],
            templateUrl: "/ui/partials/help/help.html",
            controller: "helpCtrl"
        });

        /**************************************************************
         *                                                            *
         * Profile State                                              *
         *                                                            *
         *************************************************************/
        $stateProvider.state("profile", {
            url: "/profile",
            css: [
                '/ui/css/mdl-style.css',
                '/ui/css/theme-black.css'
            ],
            templateUrl: "/ui/partials/profile/profile.html",
            controller: "profileCtrl"
        });

        /**************************************************************
         *                                                            *
         * About State                                                *
         *                                                            *
         *************************************************************/
        $stateProvider.state("about", {
            url: "/about",
            css: [
                '/ui/css/mdl-style.css',
                '/ui/css/theme-black.css'
            ],
            templateUrl: "/ui/partials/about/about.html",
            controller: "aboutCtrl"
        });
    }
]);


