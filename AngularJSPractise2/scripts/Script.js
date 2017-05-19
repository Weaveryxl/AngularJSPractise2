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
                });