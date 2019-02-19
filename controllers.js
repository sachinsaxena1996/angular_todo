// CONTROLLERS
todoApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService) {
    
    $scope.todo = cityService.todo;
    $scope.$watch('todo', function() {
       cityService.todo = $scope.todo;
    });
    
}]);

todoApp.controller('createController', ['$scope', '$http', '$routeParams', 'cityService', function($scope, $http, $routeParams, cityService) {
    
    $scope.todo = cityService.todo;
    var url = "http://localhost:3000/api/to_dos";
    var data = { "to_do" : { "name" : $scope.todo.name, "description" : $scope.todo.description, "status" : $scope.todo.status, "tag_id" : $scope.todo.tag_id, "is_deleted" : $scope.todo.is_deleted}};
    $http.post(url, data).then(function(){
    });
    
}]);

todoApp.controller('indexController', ['$scope', '$http', '$routeParams', 'cityService', function($scope, $http, $routeParams, cityService) {
   $scope.statuses = ['start', 'not_start', 'finish'];
   $http.get("http://localhost:3000/api/to_dos")
   .then(function(response){
     $scope.todos = response.data;
   })
    
   $scope.updateStatus = function(id, status){
        var url = "http://localhost:3000/api/to_dos/" + id + "/status";
        var data = { "status" : status };
        console.log(data);
        $http.put(url, data).then(function(){
            alert("status updated successfully for the todo with id: " + id);
        });
    }
}]);


todoApp.controller('deleteController', ['$scope', '$http', '$routeParams', 'cityService', function($scope, $http, $routeParams, cityService) {
   $http.delete("http://localhost:3000/api/to_dos/" + $routeParams.id)
   .then(function(response){
     console.log(response);
   })
}]);


todoApp.controller('editController', ['$scope', '$http', '$routeParams', 'updateService', function($scope, $http, $routeParams, updateService) {
    $scope.todo = updateService.todo;
    $scope.todo = JSON.parse($routeParams.todo);
    $scope.$watch('todo', function() {
       updateService.todo = $scope.todo; 
    });
}]);

todoApp.controller('updateController', ['$scope', '$http', '$routeParams', 'updateService', function($scope, $http, $routeParams, updateService) {
    
    $scope.todo = updateService.todo;
    var url = "http://localhost:3000/api/to_dos/" + $routeParams.id;
    var data = { "name" : $scope.todo.name, "description" : $scope.todo.description, "status" : $scope.todo.status, "tag_id" : $scope.todo.tag_id, "is_deleted" : $scope.todo.is_deleted};
    $http.put(url, data).then(function(){
        
    });
}]);