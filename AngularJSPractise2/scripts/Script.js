/// <reference path="angular.js" />

var app = angular
                .module("myModule", [])
                .controller("myController", function ($scope) {
                    var technologies = [
                        {name: "C#", likes: 0, dislikes: 0, salary: 60000, startDate: new Date("November 23, 1980")},
                        { name: "ASP.NET", likes: 0, dislikes: 0, salary: 70000, startDate: new Date("May 05, 1970") },
                        { name: "SQL Server", likes: 0, dislikes: 0, salary: 60000, startDate: new Date("August 15, 1974") },
                        { name: "AngularJS", likes: 0, dislikes: 0, salary: 65000, startDate: new Date("December 30, 1983") }
                    ]

                    $scope.technologies = technologies;

                    $scope.incrementLikes = function (technology) {
                        technology.likes++;
                    }

                    $scope.incrementDislikes = function (technology) {
                        technology.dislikes++;
                    }
                    $scope.rowLimit = 2;
                    $scope.sortColumn = "name";
                    $scope.reverseSort = false;

                    $scope.sortData = function (column) {
                        $scope.reverseSort = ($scope.sortColumn == column) ? !$scope.reverseSort : false;
                        $scope.sortColumn = column;
                    }

                    $scope.getSortClass = function (column) {
                        if ($scope.sortColumn == column) {
                            return $scope.reverseSort ? 'Myglyphicon Myglyphicon-triangle-bottom' : 'Myglyphicon Myglyphicon-triangle-top';
                        }
                        return '';
                    }
                    
                    $scope.search = function (item) {
                        if ($scope.searchText == undefined) {
                            return true;
                        }
                        else {
                            if (item.name.toLowerCase().indexOf($scope.searchText.toLowerCase()) != -1 ||
                                item.salary.toString().toLowerCase().indexOf($scope.searchText.toLowerCase()) != -1) {
                                return true;
                            }
                        }

                        return false;
                    }
                });