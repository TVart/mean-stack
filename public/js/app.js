/**
 * Created by philo on 29/06/2016.
 */
var app = angular.module('stackMean',['ngResource']);

app.factory('Task', ['$resource', function($resource) {
    var Task = $resource("/api/v2/tasks");
    return{
        list : function () {
            return Task.query(function (results) {
                return results
            })
        },

        remove : function (taskId) {
            var taskClass = $resource("/api/v2/tasks/:id",{id:taskId},{
                update: {
                    method: 'DELETE'
                }
            });
            var taskObj = new taskClass;
            taskObj.$delete();
        },

        create: function(taskName){
            myTask = new Task;
            myTask.name = taskName;
            return myTask.$save(function (result) {
                return result
            })
        }
    };
}]);

app.controller('TodolistCtrl', ['$scope','Task',function($scope,Task){
    $scope.serverId = 'Data from server';
    //var Task = $resource("/api/v2/tasks");
    //Task.query(function (results) {$scope.todolist = results;});
    $scope.todolist = Task.list();
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
    $scope.removeTask=function(taskId){
        Task.remove(taskId);
        $scope.todolist = Task.list();
    };

    $scope.createTask=function(){
        Task.create($scope.name);
        $scope.todolist = Task.list();
        $scope.name='';
        /*var task = new Task();
        task.name = $scope.name;
        task.$save(function (result) {
            //$scope.todolist.push(result);
            $scope.todolist = Task.list();
            $scope.name='';
        });*/
    }
    }]
);