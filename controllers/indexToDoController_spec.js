describe('indexToDoController', function() {
   var $httpBackend, $rootScope, indexController;
   beforeEach(module('todoApp'));
   beforeEach(inject(function($injector) {
     // Set up the mock http service responses
    $httpBackend = $injector.get('$httpBackend');           
    $httpBackend.when('GET', 'pages/createTodo.htm').respond({ body: '<html><body>Mock homepage</body></html>'});
    $httpBackend.when('GET', 'pages/index.htm').respond({ body: '<html><body>Mock Indexpage</body></html>'}); 
       
    $httpBackend.when('GET', 'http://localhost:3000/api/to_dos').respond(201, '');
    $httpBackend.when('GET', 'http://localhost:3000/api/tags/todos?tag_name=Rails').respond(201, '');
    $httpBackend.when('DELETE', "http://localhost:3000/api/to_dos/22").respond(201, '');
    $httpBackend.when('PUT', "http://localhost:3000/api/to_dos/22/is_deleted").respond(201, '');
       
    updateStatusRequestHandler = $httpBackend.when('PUT', 'http://localhost:3000/api/to_dos/22/status').respond(201, {});
    
    // Get hold of a scope (i.e. the root scope)
    $rootScope = $injector.get('$rootScope');
    // The $controller service is used to create instances of controllers
    var $controller = $injector.get('$controller');
     indexController = function() {
        return $controller('indexToDoController', {'$scope' : $rootScope });
     };
   }));

   afterEach(function() {
     $httpBackend.verifyNoOutstandingExpectation();
     $httpBackend.verifyNoOutstandingRequest();
   });

    it("Should be defined", function() {
        $httpBackend.expectGET('http://localhost:3000/api/to_dos');
        var controller = indexController();
        $httpBackend.flush();
        expect(controller).toBeDefined();
    });
    
   it('should list all todos', function() {
     var controller = indexController();
     $rootScope.tagName = '';
     $httpBackend.expectGET('http://localhost:3000/api/to_dos');
     $rootScope.loadTodos();
     
     expect($rootScope.status).toBe('indexing...'); 
     $httpBackend.flush();
     expect($rootScope.status).toBe('');
   });
    
   it('should list the filtered todos by tag name', function() {
     var controller = indexController();
     $rootScope.tagName = 'Rails';
     $httpBackend.expectGET('http://localhost:3000/api/tags/todos?tag_name=Rails');
     $rootScope.loadTodos();
       
     expect($rootScope.status).toBe('indexing...');
     $httpBackend.flush();
     expect($rootScope.status).toBe('');
   });
    
   it('should update status when user selects from status listbox', function() {
     var controller = indexController();
     updateStatusRequestHandler.respond(201, {"name": "ToDO Via 6", "description": "Via", "status": "start",  "is_deleted": true });
     $httpBackend.expectPUT("http://localhost:3000/api/to_dos/22/status");
     var todo = {"_id": {"$oid": 22},
                 "name": "ToDO Via 6", 
                 "description": "Via", 
                 "status": "start",  
                 "is_deleted": false
                }
     $rootScope.updateTodoStatus(todo);       
     expect($rootScope.status).toBe('updating...');
     $httpBackend.flush();
     expect($rootScope.status).toBe('');
   });
   
   it('should respond with 401 when user passes invalid value from status listbox', function() {
     updateStatusRequestHandler.respond(401, '');
     var controller = indexController();     
     $httpBackend.expectPUT("http://localhost:3000/api/to_dos/22/status");
     var todo = {"_id": {"$oid": 22},
         "name": "ToDO Via 6", 
         "description": "Via", 
         "status": "start",  
         "is_deleted": false
        }
     $rootScope.updateTodoStatus(todo);       
     $httpBackend.flush();
     expect($rootScope.status).toBe('Failed...');     
   });
        
   it('should delete todo when user clicks on delete todo', function() {
     var controller = indexController();
     $rootScope.todo = {};
     $rootScope.todo.is_deleted = false;
     $rootScope.todo._id = {"$oid": '22'};
     $httpBackend.expectDELETE("http://localhost:3000/api/to_dos/22");
     $rootScope.deleteTodo($rootScope.todo);       
     $httpBackend.flush();
     expect($rootScope.todo.is_deleted).toBe(true);     
   });
    
   it('should undo delete todo when user clicks on undo delete', function() {
     var controller = indexController();
     $rootScope.todo = {};
     $rootScope.todo.is_deleted = true;
     $rootScope.todo._id = {"$oid": '22'};
     $httpBackend.expectPUT("http://localhost:3000/api/to_dos/22/is_deleted");
     $rootScope.deleteTodo($rootScope.todo);       
     $httpBackend.flush();
     expect($rootScope.todo.is_deleted).toBe(false);     
   });    
});
