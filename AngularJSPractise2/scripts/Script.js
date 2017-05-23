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
                    .controller("demoController", function ($scope, $http, $location, $anchorScroll) {
                        $http.get('CountryService.asmx/GetData')
                        .then(function (response) {
                            $scope.countries = response.data;
                        })

                        $scope.scrollTo = function (countryName) {
                            $location.hash(countryName);
                            $anchorScroll.yOffset = 20;
                            $anchorScroll();
                        }
                    });