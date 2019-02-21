// ROUTES
todoApp.config(function ($routeProvider) {
   
    $routeProvider
    
    .when('/', {
        templateUrl: 'pages/createTodo.htm',
        controller: 'createTodoController'
    })
        
    .when('/index', {
        templateUrl: 'pages/index.htm',
        controller: 'indexToDoController'
    })
        
    .when('/edit/:todo', {
        templateUrl: 'pages/edit.htm',
        controller: 'editToDoController'
    })
        
    .when('/attach_tag/:id', {
        templateUrl: 'pages/attach_tag.htm',
        controller: 'attachTagController'
    })
});