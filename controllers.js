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
   $scope.tagName = '';   
   $scope.loadTodos = function() {
        var url_1 = "http://localhost:3000/api/tags/todos?tag_name=" + $scope.tagName;
        var url = ($scope.tagName.length === 0) ? "http://localhost:3000/api/to_dos" : url_1;
        $http.get(url)
         .then(function(response){
         $scope.todos = response.data;
       });              
    }    
   $scope.loadTodos();        
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
   $scope.todo = $routeParams.id;
   $http.delete("http://localhost:3000/api/to_dos/" + $routeParams.id)
   .then(function(response){
   })
}]);

todoApp.controller('undoDeleteController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
   $scope.todo = $routeParams.id;
   var data = {};
   $http.put("http://localhost:3000/api/to_dos/" + $routeParams.id + "/is_deleted", data)
   .then(function(response){
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

todoApp.controller('attachTagController', ['$scope', '$http', '$routeParams', 'attachTagService', function($scope, $http, $routeParams, attachTagService) {
    $scope.tag = attachTagService.tag;
    $scope.todo_id = $routeParams.id;
    $scope.$watch('tag', function() {
       attachTagService.tag = $scope.tag; 
    });
}]);

todoApp.controller('updateTagController', ['$scope', '$http', '$routeParams', 'attachTagService', function($scope, $http, $routeParams, attachTagService) {
    $scope.tag = attachTagService.tag;
    $scope.todo_id = $routeParams.id;
    var url = "http://localhost:3000/api/to_dos/" + $routeParams.id + "/attach_tag";
    var data = {"tag": { "name" : $scope.tag.name }};
    console.log(data);
    $http.put(url, data).then(function(){
        alert("Tag attached successfully for the todo with id: " + $routeParams.id);
        attachTagService.tag = "";
    });
}]);

