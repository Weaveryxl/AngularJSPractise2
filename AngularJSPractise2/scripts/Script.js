/// <reference path="angular.js" />

var app = angular
                .module("myModule", [])
                .controller("myController", function ($scope, $http, $log) {

                    var successCallBack = function (response) {
                        $scope.employees = response.data;
                        $log.info(response);
                    };

                    var errorCallBack = function (response) {
                        $scope.error = response.data;
                        $log.info(response);
                    }

                    $http({
                            method: 'GET', 
                            url: 'EmployeeService.asmx/GetAllEmployees'
                    })
                        .then(successCallBack, errorCallBack);
                });