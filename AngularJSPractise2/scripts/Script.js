/// <reference path="angular.js" />

var app = angular
                .module("myModule", [])
                .controller("myController", function ($scope, stringService) {
                    $scope.transformString = function (input) {
                        $scope.output = stringService.processString(input);
                    }
                });

var demoApp = angular
                    .module("demoApp", [])
                    .controller("demoController", function ($scope, $location, $anchorScroll) {
                        $scope.scrollTo = function (scrollLocation) {
                            $location.hash(scrollLocation);
                            $anchorScroll.yOffset = 20;
                            $anchorScroll();
                        }
                    });