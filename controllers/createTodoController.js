todoApp.controller('createTodoController', [
    '$scope',
    '$http',
    '$location', 
    function($scope, 
              $http, 
              $location) {
        $scope.createTodo = function() {
            $scope.status = 'Saving...';
            var url = "http://localhost:3000/api/to_dos";
            var data = { "to_do" : { "name" : $scope.todo.name, "description" : $scope.todo.description, "status" : $scope.todo.status, "tag_id" : $scope.todo.tag_id, "is_deleted" : $scope.todo.is_deleted}};
            $http.post(url, data).then(function(){
                alert("ToDo created successfully.");
                $location.path( "/index" );
                $scope.status = '';
            }).catch(function() {
              $scope.status = 'Failed...';
            });
        }
}]);
