 

angular.module('selfboss', ['ionic',  'selfboss.controllers', 'selfboss.directives'])

 
 
 .run(function($ionicPlatform,$rootScope, auth) {
	  
    auth.checkStatus();
 
 	 
  $ionicPlatform.ready(function() {
    
	if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    
	if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  
  
  });
  
  
})

 

.factory("auth", function($location,$state)
{
    return{ 
		 
         checkStatus : function()
        {     
		     var rutasPrivadas = [
    			"/app/home",
				  "/app/meusprofissionais" 
  			 ];
 		   
		    if(this.in_array($location.path(),rutasPrivadas) && typeof(window.localStorage['token']) == "undefined")
            {
 			   $state.go('login');  
            }
            
             if($location.path() == "/login" && typeof(window.localStorage['token']) != "undefined")
            {
  			     $state.go('app.home');
            } 
        },
        in_array : function(needle, haystack)
        {
            var key = '';
            for(key in haystack)
            {
                if(haystack[key] == needle)
                {
                    return true;
                }
            }
            return false;
        }
    }
})

 
 
 
.config(function($stateProvider, $urlRouterProvider) {
     $stateProvider
   
   
    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })
	 
	 
	  .state('app.home', {
      url: "/home",
      views: {
        'menuContent' :{
          templateUrl: "templates/home.html",
          controller: 'homeCtrl'
        }
      }
    })
	 
	   

 .state('app.dados', {
      url: "/dados",
      views: {
        'menuContent' :{
          templateUrl: "templates/dados.html",
          controller: 'dadosCtrl'
        }
      }
    })
	
	
  
.state('app.pesquisar', {
      url: "/pesquisar",
      views: {
        'menuContent' :{
          templateUrl: "templates/pesquisar.html",
          controller: 'pesquisarCtrl'
        }
      }
    })	
	
	 
	
	
	
 .state('app.orcamentos', {
      url: "/orcamentos",
      views: {
        'menuContent' :{
          templateUrl: "templates/orcamentos.html",
          controller: 'orcamentosCtrl'
        }
      }
    })	
	
	  
	 
	
	 .state('app.proximo', {
      url: "/proximo",
      views: {
        'menuContent' :{
          templateUrl: "templates/proximo.html",
          controller: 'MapCtrl'
        }
      }
    })	
	
	  

  .state('app.meusprofissionais', {
      url: "/meusprofissionais",
      views: {
        'menuContent' :{
          templateUrl: "templates/meusprofissionais.html",
          controller: 'meusprofissionaisCtrl'
        }
      }
    })   

    .state('app.profissional', {
      url: "/profissional/:id",
      views: {
        'menuContent' :{
          templateUrl: "templates/profissional.html",
          controller: 'profissionalCtrl'  
        }
      }
    }) 
  
   
  	.state('login', {
      url: "/login",
      templateUrl: "templates/login.html",
      controller: 'LoginCtrl'
    });  



  $urlRouterProvider.otherwise('/login');
   
})  


  

 
 

