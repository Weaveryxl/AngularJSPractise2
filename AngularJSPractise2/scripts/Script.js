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
                controller: "studentsController as studentsCTRL",
                resolve: {
                    studentsList: function ($http) {
                        return $http({
                            url: 'StudentService.asmx/GetAllStudents',
                            method: "GET"
                        })
                            .then(function (response) {
                                return response.data;
                            })
                    }
                }
            })
            .when("/students/:id", {
                templateUrl: "Templates/studentDetails.html",
                controller: "studentDetailsController as studentDetailsCTRL"
            })
            .when("/studentsSearch/:name?", {
                templateUrl: "Templates/studentsSearch.html",
                controller: "studentsSearchController as studentsSearchCTRL"
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
    .controller("studentsController", function (studentsList, $route, $location) {

        var vm = this;

        vm.searchStudent = function () {
            if (vm.name) {
                $location.url("/studentsSearch/" + vm.name);
            }
            else {
                $location.url("/studentsSearch");
            }
        }

        vm.reloadData = function () {
            $route.reload();
        }

        vm.students = studentsList;
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
    .controller("studentsSearchController", function ($http, $routeParams) {
        var vm = this;

        if ($routeParams.name) {
            $http({
                url: 'StudentService.asmx/GetStudentsByName',
                params: { name: $routeParams.name },
                method: "GET"
            })
                .then(function (response) {
                    vm.students = response.data;
                })
        }
        else {
            $http({
                url: 'StudentService.asmx/GetAllStudents',
                method: "GET"
            })
                .then(function (response) {
                    vm.students = response.data;
                })
        }
    });

                            

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