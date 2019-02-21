//describe('todoApp module', function() {
//
//  beforeEach(module('todoApp'));
//
////  describe('view1 controller', function(){
//
//    it('should ....', inject(function($controller) {
//      //spec body
//      var createTodoController = $controller('createTodoController');
//      expect(createTodoController).toBeDefined();
//    }));
//
////  });
//});


describe("createTodoController", function() {
    var $rootScope;
    var $controller;
    beforeEach(module("todoApp"));
    beforeEach(inject(function($injector) {

        $rootScope = $injector.get('$rootScope');
        $controller = $injector.get('$controller');
        $scope = $rootScope.$new();

    }));
    beforeEach(inject(function($controller) {
        var createTodoController = $controller("createTodoController");

    }));

    it("Should say hello", function() {
        expect(createTodoController).toBeDefined();
    });

});