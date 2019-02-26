describe('indexToDoController', function() {
   var $httpBackend, $rootScope, indexController;

   // Set up the module
   beforeEach(module('todoApp'));

   beforeEach(inject(function($injector) {
     // Set up the mock http service responses
    $httpBackend = $injector.get('$httpBackend');           
    $httpBackend.when('GET', 'pages/createTodo.htm').respond({ body: '<html><body>Mock homepage</body></html>'});
    $httpBackend.when('GET', 'pages/index.htm').respond({ body: '<html><body>Mock Indexpage</body></html>'}); 
       
    $httpBackend.when('GET', 'http://localhost:3000/api/to_dos').respond(201, '');
    $httpBackend.when('GET', 'http://localhost:3000/api/tags/todos?tag_name=Rails').respond(201, '');
     // backend definition common for all tests
     

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
   
});
