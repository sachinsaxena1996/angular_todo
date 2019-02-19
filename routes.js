// ROUTES
todoApp.config(function ($routeProvider) {
   
    $routeProvider
    
    .when('/', {
        templateUrl: 'pages/home.htm',
        controller: 'homeController'
    })
    
    .when('/create', {
        templateUrl: 'pages/create.htm',
        controller: 'createController'
    })
    
    .when('/index', {
        templateUrl: 'pages/index.htm',
        controller: 'indexController'
    })
    
    .when('/delete/:id', {
        templateUrl: 'pages/delete.htm',
        controller: 'deleteController'
    })
    
    .when('/edit/:todo', {
        templateUrl: 'pages/edit.htm',
        controller: 'editController'
    })
    
    .when('/update/:id', {
        templateUrl: 'pages/update.htm',
        controller: 'updateController'
    })
    
    .when('/attach_tag/:id', {
        templateUrl: 'pages/attach_tag.htm',
        controller: 'attachTagController'
    })
    
    .when('/update_tag/:id', {
        templateUrl: 'pages/update_tag.htm',
        controller: 'updateTagController'
    })
    
    .when('/undo_delete/:id', {
        templateUrl: 'pages/undo_delete.htm',
        controller: 'undoDeleteController'
    })
});