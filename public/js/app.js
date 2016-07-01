/**
 * Created by philo on 29/06/2016.
 */
var app = angular.module('stackMean', []);

app.controller('MainCtrl', ['$scope', function($scope){
        $scope.test = 'Hello world!';
        $scope.posts = [
            {title: 'post 1', upvotes: 5},
            {title: 'post 2', upvotes: 2},
            {title: 'post 3', upvotes: 15},
            {title: 'post 4', upvotes: 9},
            {title: 'post 5', upvotes: 4}
        ];
    }]
);