/**
 * Created by philo on 29/06/2016.
 */
var app = angular.module('stackMean', []);

app.controller('TodolistCtrl', ['$scope', function($scope){
        $scope.serverId = 'Data from server';
        $scope.todolist = [
            {title: 'Faire les courses', upvotes: 0},
            {title: 'Nourir le chien', upvotes: 2},
            {title: 'Lire un livre', upvotes: 1},
            {title: 'Faire des exercises', upvotes: 0},
            {title: 'Dormir', upvotes: 5}
        ];
        $scope.addTask=function () {
            $scope.todolist.push({title: $scope.taskName, upvotes: 0});
            $scope.taskName='';
        }
    }]
);