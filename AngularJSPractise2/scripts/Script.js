﻿/// <reference path="angular.js" />
/// <reference path="angular-route.js" />

var app = angular
                .module("myModule", [])
                .controller("myController", function ($scope, stringService) {
                    $scope.transformString = function (input) {
                        $scope.output = stringService.processString(input);
                    }
                });

var demoApp = angular
                    .module("demoApp", [])
                    .controller("demoController", function ($scope, $http, $location, $anchorScroll) {
                        $http.get('StudentService.asmx/GetAllData')
                        .then(function (response) {
                            $scope.students = response.data;
                        })

                        $scope.scrollTo = function (studentName) {
                            $location.hash(studentName);
                            $anchorScroll.yOffset = 20;
                            $anchorScroll();
                        }
                    });

var routeApp = angular
                    .module("routeApp", ["ngRoute"])
                    .config(function ($routeProvider, $locationProvider) {
                        $locationProvider.hashPrefix('');
                        $routeProvider.caseInsensitiveMatch = true;
                        $routeProvider
                            .when("/home", {
                                //templateUrl: "Templates/home.html",
                                template: "<h1>Inline Template in Action</h1>",
                                controller: "homeController",
                                controllerAs: "homeCTRL"
                            })
                            .when("/courses", {
                                templateUrl: "Templates/Course.html",
                                controller: "coursesController as coursesCTRL",
                                caseInsensitiveMatch: true
                            })
                            .when("/students", {
                                templateUrl: "Templates/Student.html",
                                controller: "studentsController as studentsCTRL"
                            })
                            .when("/students/:id", {
                                templateUrl: "Templates/StudentDetails.html",
                                controller: "studentDetailsController as studentDetailsCTRL"
                            })
                            .otherwise({
                                redirectTo: "/home"
                            })
                        $locationProvider.html5Mode(true);
                        })
                        .controller("homeController", function () {
                            this.message = "Home Page";
                        })
                        .controller("coursesController", function () {
                            this.courses = ["C#", "VB.NET", "SQL Server", "ASP.NET"];
                        })
                        .controller("studentsController", function ($http, $route, $scope, $rootScope, $log) {
                            
                            var vm = this;

                            $rootScope.$on("$locationChangeStart", function () {
                                $log.debug("$locationChangeStart fired");
                            });

                            $rootScope.$on("$routeChangeStart", function () {
                                $log.debug("$routeChangeStart fired");
                            });

                            $rootScope.$on("$locationChangeSuccess", function () {
                                $log.debug("$locationChangeSuccess fired");
                            });

                            $rootScope.$on("$routeChangeSuccess", function () {
                                $log.debug("$routeChangeSuccess fired");
                            });

                            $scope.$on("$locationChangeStart", function (event, next, current) {
                                $log.debug("$locationChangeStart fired");
                                $log.debug(event);
                                $log.debug(next);
                                $log.debug(current);
                            });

                            $scope.$on("$routeChangeStart", function (event, next, current) {
                                $log.debug("$routeChangeStart fired");
                                $log.debug(event);
                                $log.debug(next);
                                $log.debug(current);
                            });

                            vm.reloadData = function () {
                                $route.reload();
                            }

                            $http.get('StudentService.asmx/GetAllStudents')
                            .then(function (response) {
                                vm.students = response.data;
                            })
                        })
                        .controller("studentDetailsController", function ($http, $routeParams) {
                            var vm = this;
                            $http({
                                url: 'StudentService.asmx/GetStudent',
                                params: { id: $routeParams.id },
                                method: "GET"
                            })
                            .then(function (response) {
                                vm.student = response.data;
                            })
    })

var locationApp = angular.module("location", [])
    .controller("countryController", function () {
        this.name = "India";
    })
    .controller("stateController", function () {
        this.name = "Maharashtra";
    })
    .controller("cityController", function () {
        this.name = "Mumbai";
    });

var colorApp = angular.module("color", [])
    .controller("redController", function ($scope, $rootScope) {
        $scope.redColor = "I'm red.";
        $rootScope.rootScopeColor = "I'm root scope color.";
    })
    .controller("greenController", function ($scope) {
        $scope.greenColor = "I'm green.";
    });