/**
 * Created by philo on 29/06/2016.
 */
var app = angular.module('stackMean',['ngResource']);

/*app.factory('Task', ['$resource', function($resource) {
    return $resource("/api/tasks");
     return{
     all : function () {
     return $resource("/api/v2/tasks");
     },
     post: function(){
     return $resource("/api/v2/tasks");
     }
     };
}]);*/

app.controller('TodolistCtrl', ['$scope','$resource',function($scope,$resource){
    $scope.serverId = 'Data from server';
    var Task = $resource("/api/v2/tasks");
    Task.query(function (results) {
       $scope.todolist = results;
    });
    /*$scope.todolist = [
        {name: 'Faire les courses', upvotes: 0},
        {name: 'Nourir le chien', upvotes: 2},
        {name: 'Lire un livre', upvotes: 1},
        {name: 'Faire des exercises', upvotes: 0},
        {name: 'Dormir', upvotes: 5}
    ];*/

    /*$scope.createTask1=function () {
        $scope.todolist.push({title: $scope.name, upvotes: 0});
        $scope.name='';
    };*/

    $scope.createTask=function(){
        var task = new Task();
        task.name = $scope.name;
        task.$save(function (result) {
            $scope.todolist.push(result);
            $scope.name='';
        });
    }
    }]
);