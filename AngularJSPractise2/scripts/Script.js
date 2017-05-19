/// <reference path="angular.js" />

var app = angular
                .module("myModule", [])
                .controller("myController", function ($scope) {
                    var employees = [
                        {
                            firstName: "Ningyu",
                            lastName: "Zong",
                            gender: "Female",
                            fraction: "Zong",
                        },
                        {
                            firstName: "Ningrong",
                            lastName: "Wanyan",
                            gender: "Female",
                            fraction: "Yulong",
                        },
                        {
                            firstName: "Jing",
                            lastName: "Wen",
                            gender: "Female",
                            fraction: "Mingfeng",
                        },
                        {
                            firstName: "Zheng",
                            lastName: "Wanyan",
                            gender: "Male",
                            fraction: "Yulong",
                        }
                    ];

                    var figures = [
                        {
                            firstName: "Ningyu",
                            lastName: "Zong",
                            gender: "Female",
                            fraction: "Zong",
                            related: [
                                { name: "Ningrong", relationship: "Sister" },
                                { name: "ZongShuai", relationship: "Husband" },
                            ]
                        },
                        {
                            firstName: "Ningrong",
                            lastName: "Wanyan",
                            gender: "Female",
                            fraction: "Yulong",
                            related: [
                                { name: "Ningyu", relationship: "Sister" },
                                { name: "Zheng", relationship: "Son" },
                                { name: "Zang", relationship: "Husband" }
                            ]
                        },
                        {
                            firstName: "Jing",
                            lastName: "Wen",
                            gender: "Female",
                            fraction: "Mingfeng",
                            related: [
                                { name: "Zheng", relationship: "Boyfriend" },
                                { name: "Taiji", relationship: "Father" },
                            ]
                        },
                        {
                            firstName: "Zheng",
                            lastName: "Wanyan",
                            gender: "Male",
                            fraction: "Yulong",
                            related: [
                                { name: "Jing", relationship: "Girlfriend" },
                                { name: "Ningrong", relationship: "Mother" },
                                { name: "Zang", relationship: "Father" }
                            ]
                        }
                    ];

                    $scope.employees = employees;
                    $scope.figures = figures;
                });