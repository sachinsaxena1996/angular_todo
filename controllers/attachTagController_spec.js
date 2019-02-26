describe('attachTagController', function() {
   var $httpBackend, $rootScope, $routeParams, attachTagController;
   // Set up the module
   beforeEach(module('todoApp'));
   beforeEach(inject(function($injector) {
     // Set up the mock http service responses
    $httpBackend = $injector.get('$httpBackend');           
    $httpBackend.when('GET', 'pages/createTodo.htm').respond({ body: '<html><body>Mock homepage</body></html>'});
    $httpBackend.when('GET', 'pages/index.htm').respond({ body: '<html><body>Mock Indexpage</body></html>'}); 
                  
    $httpBackend.when('PUT', "http://localhost:3000/api/to_dos/22/attach_tag").respond(201, '');
       
     // Get hold of a scope (i.e. the root scope)
     $rootScope = $injector.get('$rootScope');
     $routeParams = $injector.get('$routeParams');
     // The $controller service is used to create instances of controllers
     var $controller = $injector.get('$controller');
     attachTagController = function() {
       return $controller('attachTagController', {'$scope' : $rootScope , '$routeParams' : $routeParams});
     };
   }));

   afterEach(function() {
     $httpBackend.verifyNoOutstandingExpectation();
     $httpBackend.verifyNoOutstandingRequest();
   });
       
   it('should attach tag to the todo', function() {
     var todo = {};
     todo.is_deleted = true;
     todo.name = 'ToDo 1';
     todo.description = 'ToDo 1';
     todo._id = {"$oid": '22'};
     $routeParams.todo = JSON.stringify(todo);
     $rootScope.tag = {};
     $rootScope.tag.name = "test";
     var controller = attachTagController();
     $httpBackend.expectPUT("http://localhost:3000/api/to_dos/22/attach_tag");     
     $rootScope.updateTag(todo._id.$oid);       
     expect($rootScope.status).toBe('updating...');
     $httpBackend.flush();
     expect($rootScope.status).toBe('');
   });   
});
