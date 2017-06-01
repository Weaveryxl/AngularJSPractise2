/// <reference path="angular.js" />
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
                        $routeProvider
                            .when("/home", {
                                templateUrl: "Templates/home.html",
                                controller: "homeController",
                                controllerAs: "homeCTRL"
                            })
                            .when("/courses", {
                                templateUrl: "Templates/Course.html",
                                controller: "coursesController as coursesCTRL"
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
                        .controller("studentsController", function ($http) {
                            var vm = this;

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