/// <reference path="angular.js" />

//var app = angular
//                .module("myModule", [])
//                .controller("myController", function ($scope, stringService) {
//                    $scope.transformString = function (input) {
//                        $scope.output = stringService.processString(input);
//                    }
//                });

//var demoApp = angular
//                    .module("demoApp", [])
//                    .controller("demoController", function ($scope, $http, $location, $anchorScroll) {
//                        $http.get('StudentService.asmx/GetAllData')
//                        .then(function (response) {
//                            $scope.students = response.data;
//                        })

//                        $scope.scrollTo = function (studentName) {
//                            $location.hash(studentName);
//                            $anchorScroll.yOffset = 20;
//                            $anchorScroll();
//                        }
//                    });

var routeApp = angular
                    .module("routeApp", ["ngRoute"])
                    .config(function ($routeProvider, $locationProvider) {
                        $locationProvider.hashPrefix('');
                        $routeProvider
                            .when("/home", {
                                templateUrl: "Templates/home.html",
                                controller: "homeController"
                            })
                            .when("/courses", {
                                templateUrl: "Templates/Course.html",
                                controller: "coursesController"
                            })
                            .when("/students", {
                                templateUrl: "Templates/Student.html",
                                controller: "studentsController"
                            })
                        })
                        .controller("homeController", function ($scope) {
                            $scope.message = "Home Page";
                        })
                        .controller("coursesController", function ($scope) {
                            $scope.courses = ["C#", "VB.NET", "SQL Server", "ASP.NET"];
                        })
                        .controller("studentsController", function ($scope, $http) {
                            $http.get('StudentService.asmx/GetAllStudents')
                            .then(function (response) {
                                $scope.students = response.data;
                            })
                        });