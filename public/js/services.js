var services = angular.module('services', []);

services.factory('Task', function() {
    var Task = $resource("/api/tasks");
});