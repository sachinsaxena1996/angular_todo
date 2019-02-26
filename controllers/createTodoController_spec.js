describe('createTodoController', function() {
   var $httpBackend, $rootScope, createController, $scope ;

   beforeEach(module('todoApp'));
   beforeEach(inject(function($injector) {
     // Set up the mock http service responses
    $httpBackend = $injector.get('$httpBackend');           
    $httpBackend.when('GET', 'pages/createTodo.htm').respond({ body: '<html><body>Mock homepage</body></html>'});
    $httpBackend.when('GET', 'pages/index.htm').respond({ body: '<html><body>Mock Indexpage</body></html>'}); 
     // Get hold of a scope (i.e. the root scope)
     $rootScope = $injector.get('$rootScope');
     // The $controller service is used to create instances of controllers
     var $controller = $injector.get('$controller');
     createController = function() {
       return $controller('createTodoController', {'$scope' : $rootScope });
     };
   }));

   afterEach(function() {
     $httpBackend.verifyNoOutstandingExpectation();
     $httpBackend.verifyNoOutstandingRequest();
   });

   it("Should be defined", function() {
        var controller = createController();
        $httpBackend.flush();
        expect(controller).toBeDefined();
   });
    
   it('should send todo to server', function() {
     var controller = createController();
     $httpBackend.flush();
     $rootScope.todo = {"to_do": {}};
     $httpBackend.expectPOST('http://localhost:3000/api/to_dos', {"to_do": {}}).respond(201, '');
     $rootScope.createTodo();
     expect($rootScope.status).toBe('Saving...');
     $httpBackend.flush();
     expect($rootScope.status).toBe('');
   });   
});
