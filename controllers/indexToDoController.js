todoApp.controller('indexToDoController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
   $scope.statuses = ['start', 'not_start', 'finish'];
   $scope.tagName = '';
   $scope.loadTodos = function() {
        $scope.status = 'indexing...';
        var url_1 = "http://localhost:3000/api/tags/todos?tag_name=" + $scope.tagName;
        var url = ($scope.tagName.length === 0) ? "http://localhost:3000/api/to_dos" : url_1;
        $http.get(url)
         .then(function(response){
         $scope.todos = response.data;
         $scope.status = '';
       }).catch(function() {
         $scope.status = 'Failed...';
       });            
    }    
   $scope.loadTodos();        
   $scope.updateTodoStatus = function(todo){
        var id = todo._id.$oid;
        $scope.status = 'updating...';
        var url = "http://localhost:3000/api/to_dos/" + id + "/status";
        var data = { "status" : todo.status };
        $http.put(url, data)
            .then(function(response){
            alert("status updated successfully for the todo with id: " + id);
            todo.status = response.data.status;
            $scope.status = '';
            
        }).catch(function() {
         $scope.status = 'Failed...';
       });
    }
   
   $scope.deleteTodo = function(todo) {
       if (todo.is_deleted === false) {
           $http.delete("http://localhost:3000/api/to_dos/" + todo._id.$oid)
            .then(function(){
                todo.is_deleted = true;
                alert("Successfully deleted the todo with id: " + todo._id.$oid);
            })   
       }
       else
       {
           $http.put("http://localhost:3000/api/to_dos/" + todo._id.$oid + "/is_deleted", {})
           .then(function(){
               todo.is_deleted = false;
               alert("Successfully did undo delete for the todo with id: " + todo._id.$oid);
           })           
       }         
    }
}]);

