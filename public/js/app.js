/**
 * Created by philo on 29/06/2016.
 */
var app = angular.module('stackMean',['ngResource']);

/*app.factory('Task', ['$resource', function($resource) {
    return $resource("/api/tasks");
}]);*/

app.controller('TodolistCtrl', ['$scope','$resource',function($scope,$resource){
        var Task = $resource("/api/tasks");
        $scope.serverId = 'Data from server';
        $scope.todolist = [
            {title: 'Faire les courses', upvotes: 0},
            {title: 'Nourir le chien', upvotes: 2},
            {title: 'Lire un livre', upvotes: 1},
            {title: 'Faire des exercises', upvotes: 0},
            {title: 'Dormir', upvotes: 5}
        ];

/*        $scope.createTask=function () {
            $scope.todolist.push({title: $scope.taskName, upvotes: 0});
            $scope.taskName='';
        };*/

        $scope.createTask = function(){
            var task = new Task();
            task.taskName = $scope.taskName;
            task.$save();
        }
    }]
);