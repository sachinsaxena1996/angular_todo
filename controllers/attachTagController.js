todoApp.controller('attachTagController', ['$scope', '$http', '$routeParams','$location', function($scope, $http, $routeParams, $location) {
    $scope.todo_id = $routeParams.id;        
    $scope.updateTag = function(todo_id) {  
        $scope.status = 'updating...';
        var url = "http://localhost:3000/api/to_dos/" + todo_id + "/attach_tag";
        var data = {"tag": { "name" : $scope.tag.name }};
        $http.put(url, data).then(function(){
            alert("Tag attached successfully for the todo with id: " + todo_id);
            $location.path( "/index" );
            $scope.status = '';
        }).catch(function() {
         $scope.status = 'Failed...';
       });                     
    }
}]);
