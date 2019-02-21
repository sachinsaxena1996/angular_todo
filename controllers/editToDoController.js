todoApp.controller('editToDoController', ['$scope', '$http', '$routeParams', '$location', function($scope, $http, $routeParams, $location) {
    $scope.todo = JSON.parse($routeParams.todo);
    $scope.updateTodo = function() {
        var url = "http://localhost:3000/api/to_dos/" + $scope.todo._id.$oid;
        var data = { "name" : $scope.todo.name, "description" : $scope.todo.description, "status" : $scope.todo.status, "tag_id" : $scope.todo.tag_id, "is_deleted" : $scope.todo.is_deleted};
        $http.put(url, data).then(function(){
            alert("ToDo updated successfully.");
            $location.path( "/index" );
        });                     
    }
}]);
