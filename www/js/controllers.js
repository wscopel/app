angular.module('selfboss.controllers', [])

// ideia de layout
//http://codepen.io/anon/pen/zijFv


// mapa
//http://codepen.io/jdnichollsc/pen/CIflH

// mensagens
//http://codepen.io/rossmartin/pen/XJmpQr


// endereco auto completar
// http://codepen.io/Froelund/pen/BuiDz


// imagens fullscreen
// http://codepen.io/rdelafuente/pen/tJrik


// assinatura
// http://codepen.io/jdnichollsc/pen/socfb

// galeria de imagem
// http://codepen.io/aceoliver/pen/aqijr

// slide de imagens
// http://codepen.io/pickupman/pen/wBvezY
///http://codepen.io/samuelmartineau/pen/AiotH
// http://codepen.io/azimba/pen/lBAFk


//auto carregamento
/// http://codepen.io/anon/pen/IqgLs




.controller('homeCtrl', function($scope, $stateParams, $ionicLoading, $timeout ) {
	
	
	 $scope.show = function() {
    $ionicLoading.show({
      template: 'carregando...'
    });
  };
  
  
  $scope.hide = function(){
    $ionicLoading.hide();
  };

  
     $scope.show();
     $timeout(function() {
					 $scope.hide();
					}, 300);

 

})


 
 .controller('LoginCtrl', function($scope, $ionicModal, $http, $timeout, $location, $state, auth, $ionicLoading) {
	
 $scope.logofechar        = true;


  $scope.show = function() {
    $ionicLoading.show({
      template: 'carregando...'
    });
  };
  
  
  $scope.hide = function(){
    $ionicLoading.hide();
  };
  
    
  $scope.show();
  auth.checkStatus();
   $scope.hide();
  
$scope.cadastroSalvar = function() {
	
	$scope.enviando              = true;
	var dados = $('#formcadastro').serialize();
 			
	$http({
        method  : 'POST',
 	      url     : 'http://ec2-54-94-136-137.sa-east-1.compute.amazonaws.com/cadastro/salvar',  
          //url     : 'http://ec2-54-94-136-137.sa-east-1.compute.amazonaws.com/cadastro/salvar', 
         data    : dados,  
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  
    })
        .success(function(data) {
			
             if (!data.sucesso) {
				    $scope.enviando                  = false;
 					$scope.errorNome                 = data.errors.nome;
 					$scope.errorCelular              = data.errors.celular;
 					$scope.errorEmail                = data.errors.email;
					$scope.errorEmail1               = data.errors.email1;
 					$scope.errorUsuario              = data.errors.usuario;
					$scope.errorSenha                = data.errors.senha;
    			    $scope.retorno_error             = data.retorno_error; 
					 
                   
			 } else { 
				   
			        window.localStorage['logado']                       = true;
 					window.localStorage['session_cd_cliente']           = data.session_cd_cliente;
					window.localStorage['session_nome']                 = data.session_nome;
					window.localStorage['session_usuario']              = data.session_usuario;
					window.localStorage['session_status']               = data.session_status;
					window.localStorage['session_email']                = data.session_email; 
					window.localStorage['session_emp_secreto']          = data.session_emp_secreto;
					window.localStorage['session_plano']                = data.session_plano;
 					window.localStorage['session_produto_usuario']      = data.session_produto_usuario;
					window.localStorage['session_produto_captador']     = data.session_produto_captador;
					window.localStorage['session_produto_profissional'] = data.session_produto_profissional; 
 					window.localStorage['token']                        = data.session_emp_secreto;
					
 					$timeout(function() {
					  $scope.closeLogin();
					  $state.go('app.home');
					}, 500);
  				 
				 
				 
				    
				 
				 }
        }); 
}	 
	 
 $scope.esqueci_senha = function() {
	
	$scope.enviando_gerar  = true;
 	
	//var dados = $('#form1').serialize();	
  
  var dados = $.param({ 
	            usuario_recupera_senha:  $("input:text[name='usuario_recupera_senha']").val() 
   			});	
  
  
 	$http({
        method  : 'POST',
	      url     : 'http://ec2-54-94-136-137.sa-east-1.compute.amazonaws.com/home/recupera',  
          //url     : 'http://ec2-54-94-136-137.sa-east-1.compute.amazonaws.com/home/recupera', 
         data    : dados,  
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  
    })
  	
        .success(function(data) {
              if (!data.sucesso) {
			        $scope.enviando_gerar   = false;
 				    $scope.retorno_esqueci_senha          = data.retorno_esqueci_senha;
					$scope.errorUsuario2                   = data.errors.usuario;
					$scope.retorno_esqueci_senha_error    = data.retorno_esqueci_senha_error;
 					 
 			 } else {
				    $scope.enviando_gerar   = false;
 				    $scope.retorno_esqueci_senha          = data.retorno_esqueci_senha;
					$scope.retorno_esqueci_senha_error    = '';
					$scope.errorUsuario2     = '';
  					 
  				 }
        }); 
}	 
	 
	 
  
   
  $scope.login = function() {
	   
  	 $scope.enviando_login    = false;  
	 $scope.form_nome         = 'Login'; 
	 $scope.form_login        = true;  
	 $scope.form_esqueci      = false;  
	 $scope.form_cadastro     = false;
	 $scope.logofechar        = false;  
     $scope.modal.show();
  };
   	
 $scope.senha = function() {
	 $scope.form_nome     = 'Esqueci a senha'; 
	 $scope.form_login    = false;  
	 $scope.form_esqueci  = true;  
	 $scope.form_cadastro = false;  
	 $scope.enviando_gerar = false;
	 
  };
	
  $scope.cadastro = function() {
	 $scope.form_nome     = 'Cadastro'; 
 	 $scope.form_login    = false;  
	 $scope.form_esqueci  = false;  
	 $scope.form_cadastro = true;  
	 $scope.logofechar    = false;  
     $scope.modal.show();
  };	
	
 
  $ionicModal.fromTemplateUrl('templates/modals/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

 
  $scope.closeLogin = function() {
    $scope.logofechar    = true; 
    $scope.modal.hide();

	 
  };
 
  $scope.doLogin = function() {
 
	
	$scope.enviando_login  = true;
	
 	var dados = $.param({ 
	            usuario:  $("input:text[name='usuario']").val(),
				senha:    $("input:password[name='senha']").val(),			 
   			});	
			   
			   
 			   
 	 $http({
        method  : 'POST',  
          url     : 'http://ec2-54-94-136-137.sa-east-1.compute.amazonaws.com/home/login',  
        // url     : 'http://ec2-54-94-136-137.sa-east-1.compute.amazonaws.com/home/login', 

        data    : dados,  
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  
    })
        .success(function(data) {
			
             if (!data.sucesso) {
				 
				    $scope.enviando_login        = false;
					$scope.errorUsuario          = data.errors.usuario;
					$scope.errorSenha            = data.errors.senha;
    				$scope.retorno_error_login   = data.retorno_error_login; 
 					
 			 } else {  
			        window.localStorage['logado']                       = true;
 					window.localStorage['session_cd_cliente']           = data.session_cd_cliente;
					window.localStorage['session_nome']                 = data.session_nome;
					window.localStorage['session_usuario']              = data.session_usuario;
					window.localStorage['session_status']               = data.session_status;
					window.localStorage['session_email']                = data.session_email; 
					window.localStorage['session_emp_secreto']          = data.session_emp_secreto;
					window.localStorage['session_plano']                = data.session_plano;
 					window.localStorage['session_produto_usuario']      = data.session_produto_usuario;
					window.localStorage['session_produto_captador']     = data.session_produto_captador;
					window.localStorage['session_produto_profissional'] = data.session_produto_profissional; 
 					window.localStorage['token']                        = data.session_emp_secreto;
					
 					$timeout(function() {
					  $scope.closeLogin();
					  $state.go('app.home');
					}, 500);
  				 }
        }); 
  
  
  };
})

.controller('AppCtrl', function($scope, $state, $ionicModal, $http, $timeout, $location, $ionicSlideBoxDelegate, auth) {
  
    auth.checkStatus();
   
    $scope.session_cd_cliente = window.localStorage['session_cd_cliente'];
    $scope.session_usuario    = window.localStorage['session_usuario'];
    $scope.session_nome       = window.localStorage['session_nome'];
   
    
   $scope.nextSlide = function() {
    $ionicSlideBoxDelegate.next();
  }
   
    $scope.previousSlide = function() {
    $ionicSlideBoxDelegate.previous();
  }
    
    $scope.logout = function() {
 		window.localStorage.clear();
 		$state.go('login');
   };
   
   
    
})

 
.controller('meusprofissionaisCtrl', function($scope,$state,$timeout) {
	 
  $scope.registros = [
	{ nome: 'Joao Arnaldo', cidade: 'Vitoria - ES', Profissao: 'Pedreiro', foto: 'img/homem.jpg', id: 1 },
	{ nome: 'Joao Arnaldo', cidade: 'Vitoria - ES', Profissao: 'Pedreiro', foto: 'img/homem.jpg', id: 2 },
	{ nome: 'Joao Arnaldo', cidade: 'Vitoria - ES', Profissao: 'Pedreiro', foto: 'img/homem.jpg', id: 3 },
	{ nome: 'Joao Arnaldo', cidade: 'Vitoria - ES', Profissao: 'Pedreiro', foto: 'img/homem.jpg', id: 4 },
	{ nome: 'Joao Arnaldo', cidade: 'Vitoria - ES', Profissao: 'Pedreiro', foto: 'img/homem.jpg', id: 5 },
	{ nome: 'Joao Arnaldo', cidade: 'Vitoria - ES', Profissao: 'Pedreiro', foto: 'img/homem.jpg', id: 6 },
	{ nome: 'Joao Arnaldo', cidade: 'Vitoria - ES', Profissao: 'Pedreiro', foto: 'img/homem.jpg', id: 7 },
	{ nome: 'Joao Arnaldo', cidade: 'Vitoria - ES', Profissao: 'Pedreiro', foto: 'img/homem.jpg', id: 8 },
	{ nome: 'Joao Arnaldo', cidade: 'Vitoria - ES', Profissao: 'Pedreiro', foto: 'img/homem.jpg', id: 9 },
	{ nome: 'Joao Arnaldo', cidade: 'Vitoria - ES', Profissao: 'Pedreiro', foto: 'img/homem.jpg', id: 10 },
	{ nome: 'Joao Arnaldo', cidade: 'Vitoria - ES', Profissao: 'Pedreiro', foto: 'img/homem.jpg', id: 11 },
   ];




// infinit scroll
//http://codepen.io/gnomeontherun/pen/HJkCj

//atual
//http://codepen.io/ionic/pen/mqolp

 $scope.doRefresh = function() {
    
    console.log('Refreshing!');

    
    $timeout( function() {
      //simulate async response
      $scope.registros.push( 
      [
	{ nome: 'aJoao Arnaldo', cidade: 'Vitoria - ES', Profissao: 'Pedreiro', foto: 'img/homem.jpg', id: 1 } 
   ]
	 
    ); 

      //Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    
    }, 1000);
      
  };









   
})

.controller('profissionalCtrl', function($scope, $ionicModal, $http, $stateParams, $timeout, $location,$state, auth, $ionicLoading) {
	
 	 
           
 $scope.profissional = function(){
	 alert($stateParams.id);
	 
 		/*$http.get($scope.server("/venda/gerenciarJson/"+$routeParams.id)).success(function(data){
		  $scope.registro  = data;
		}); */
		
	  
 
	  }	
	 
	
	
})

 

.controller('dadosCtrl', function($scope, $stateParams,$ionicLoading, $http, $timeout, $ionicActionSheet) {
	
	
	$scope.session_cd_cliente = window.localStorage['session_cd_cliente'];
    $scope.session_usuario    = window.localStorage['session_usuario'];
    $scope.session_nome       = window.localStorage['session_nome'];



 $scope.showActionsheet = function() {

    $ionicActionSheet.show({
      titleText: 'Mudar Foto',
      buttons: [
        { text: 'Biblioteca <i class="icon ion-share"></i>' },
        { text: 'Tirar Foto <i class="icon ion-arrow-move"></i>' },
      ],
     // destructiveText: 'Delete',
      cancelText: 'Cancel',
      cancel: function() {
        alert('CANCELLED');
      },
      buttonClicked: function(index) {
        console.log('BUTTON CLICKED', index);
        return true;
      },
      destructiveButtonClicked: function() {
        console.log('DESTRUCT');
        return true;
      }
    });
  };


 

 $scope.show = function(id) {
    $ionicLoading.show({
      template: id
    });
  };
  
  
  $scope.hide = function(){
    $ionicLoading.hide();
  };
  
      

 $scope.dados = function() {
   $scope.show('carregando...');	
   
    $timeout(function() {
					 $scope.hide();
					}, 500);
					 
	$http.get("http://ec2-54-94-136-137.sa-east-1.compute.amazonaws.com/perfil/dadosJson/"+$scope.session_cd_cliente).success(function(data){	
 		  $scope.registro  = data;
		  
		  
		     if(data['sexo']==1){
				 $scope.registros_sexo = [
				  {nome: "Masculino", id: "1"},
				  {nome: "Feminino", id: "2"},
				];
 			 
			}else if(data['sexo']==2){
 				$scope.registros_sexo = [
				  {nome: "Feminino", id: "2"},
				  {nome: "Masculino", id: "1"} 
				];
			
 			 }else{
				$scope.registros_sexo = [
					{nome: "Selecione", id: ""},
					{nome: "Masculino", id: "1"}, 
					{nome: "Feminino", id: "2"}
 				]; 
 			 }
		  
		  
		});				
					
	 
  };

  // auto executar
  $scope.dados();


 $scope.endereco = function() {
 	  $scope.show('carregando...');
	  $scope.perfil_dados    = false;
      $scope.perfil_endereco = true;
      $scope.perfil_senha    = false;

   $scope.isActiveD       = false;
   $scope.isActiveE       = true;
   $scope.isActiveS       = false;



     $timeout(function() {
					 $scope.hide();
					}, 500);
	 

	 
  };

   $scope.senha = function() {
   	  $scope.show('carregando...');
	  $scope.perfil_dados    = false;
      $scope.perfil_endereco = false;
      $scope.perfil_senha    = true;



   $scope.isActiveD       = false;
   $scope.isActiveE       = false;
   $scope.isActiveS       = true;

    $timeout(function() {
					 $scope.hide();
					}, 500);
	 
  };






	 
$scope.dadosSalvar = function() {
    $scope.show('Verificando dados...');
	$scope.enviando_gerar = true;
	
	 
	var dados = $.param({ 
 				nome:     $("input:text[name='nome']").val(),
 				telefone: $("input:text[name='telefone']").val(),
				celular:  $("input:text[name='celular']").val(),
 				sexo:     $("#sexo option:selected").val(),
				email:    $("input:text[name='email']").val(),
				email1:   $("input:text[name='email1']").val() 
 				});	 
 	 
	$http({
        method  : 'POST',
        url     : 'http://ec2-54-94-136-137.sa-east-1.compute.amazonaws.com/perfil/dadosSalvar/'+$scope.session_cd_cliente,
        data    : dados,  
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  
    })
        .success(function(data) {
 
            if (!data.sucesso) {
				    $scope.enviando_gerar  = false;
					  
 					$scope.errorNome       = data.errors.nome;
 					$scope.errorTelefone   = data.errors.telefone; 
					$scope.errorCelular    = data.errors.celular;
 					$scope.errorSexo       = data.errors.sexo;
					$scope.errorEmail      = data.errors.email;
					$scope.errorEmail1     = data.errors.email1;
   				    $scope.retorno_error    = data.retorno_error;
				 	
					  $timeout(function() {
					     $scope.hide();
					}, 500);
					 
					
 			 } else {
				  $scope.enviando_gerar  = false;
				  $scope.retorno         = data.retorno; 
				   
				  	$scope.errorNome       = false;
 					$scope.errorTelefone   = false;
					$scope.errorCelular    = false;
 					$scope.errorSexo       = false;
					$scope.errorEmail      = false;
					$scope.errorEmail1     = false;
   				    $scope.retorno_error   = false;
				  
				   $timeout(function() {
					 $scope.hide();
					}, 500);
				  
				  
				 }
        });
}
	 

 







})


.controller('enderecoCtrl', function($scope, $stateParams,$ionicLoading, $http, $timeout, $ionicActionSheet) {
	 
    $scope.data = { 'estado' : '10000000' };
   
    $scope.$watch('data.estado', function(newValue, oldValue) {
          
		 if(newValue==10000000){
			 return;
			 
			 }else{
		 
		 $http.get("http://ec2-54-94-136-137.sa-east-1.compute.amazonaws.com/perfil/enderecoCidadeJson/"+newValue).success(function(data2){
				 $scope.registros_cidade  = data2;
				});
		  
		 }
    });
   
	
	
	$scope.session_cd_cliente = window.localStorage['session_cd_cliente'];
    $scope.session_usuario    = window.localStorage['session_usuario'];
    $scope.session_nome       = window.localStorage['session_nome'];

 
 $scope.show = function(id) {
    $ionicLoading.show({
      template: id
    });
  };
  
  
  $scope.hide = function(){
    $ionicLoading.hide();
  };
  
      

 $scope.endereco = function() {
	 
	 
	 
	 
   $scope.show('carregando...');	
   
    $timeout(function() {
					 $scope.hide();
					}, 500);
					 
	$http.get("http://ec2-54-94-136-137.sa-east-1.compute.amazonaws.com/perfil/enderecoJson/"+$scope.session_cd_cliente).success(function(data){	
 		  $scope.registro  = data;  
		   
		   
		   
		    $http.get("http://ec2-54-94-136-137.sa-east-1.compute.amazonaws.com/perfil/enderecoEstadoJson/").success(function(data2){
 			       $scope.registros_estado   = data2;
  				  });
				  
				  
		});				
					
	 
  };

  
  $scope.endereco();
  
	 
$scope.enderecoSalvar = function() {
    $scope.show('Verificando dados...');
	$scope.enviando_gerar = true;
	 
	var dados = $.param({ 
				cep:         $("input:text[name='cep']").val(),
				logradouro:  $("input:text[name='logradouro']").val(),
				numero:      $("input:text[name='numero']").val(),
				complemento: $("input:text[name='complemento']").val(),
 				bairro:      $("input:text[name='bairro']").val(),
				estado:      $("#estado option:selected").val(),
				cidade:      $("#cidade option:selected").val(),
				estadomudar: $('#check').is(':checked')
  			});	 
 	 
	$http({
        method  : 'POST',
        url     : 'http://ec2-54-94-136-137.sa-east-1.compute.amazonaws.com/perfil/enderecoSalvar/'+$scope.session_cd_cliente,
        data    : dados,  
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  
    })
        .success(function(data) {
 
            if (!data.sucesso) {
				    $scope.enviando_gerar  = false;
					  
 					$scope.errorNome       = data.errors.nome;
 					$scope.errorTelefone   = data.errors.telefone; 
					$scope.errorCelular    = data.errors.celular;
 					$scope.errorSexo       = data.errors.sexo;
					$scope.errorEmail      = data.errors.email;
					$scope.errorEmail1     = data.errors.email1;
   				    $scope.retorno_error    = data.retorno_error;
				 	
					  $timeout(function() {
					     $scope.hide();
					}, 500);
					 
					
 			 } else {
				  $scope.enviando_gerar  = false;
				  $scope.retorno         = data.retorno; 
				   
				  	$scope.errorNome       = false;
 					$scope.errorTelefone   = false;
					$scope.errorCelular    = false;
 					$scope.errorSexo       = false;
					$scope.errorEmail      = false;
					$scope.errorEmail1     = false;
   				    $scope.retorno_error   = false;
				  
				   $timeout(function() {
					 $scope.hide();
					}, 500);
					
					
				  $scope.endereco();
				  
				 }
        });
}
	 

 







})



.controller('senhaCtrl', function($scope, $stateParams,$ionicLoading, $http, $timeout, $ionicActionSheet) {
	 
	$scope.session_cd_cliente = window.localStorage['session_cd_cliente'];
    $scope.session_usuario    = window.localStorage['session_usuario'];
    $scope.session_nome       = window.localStorage['session_nome'];

 
 $scope.show = function(id) {
    $ionicLoading.show({
      template: id
    });
  };
  
  
  $scope.hide = function(){
    $ionicLoading.hide();
  };
   
  
 $scope.senha = function() {
 $scope.show('carregando...');	
   
    $timeout(function() {
					 $scope.hide();
					}, 500);
					 
	   
  };

  
  $scope.senha();
  
	 
$scope.senhaSalvar = function() {
    $scope.show('Salvando nova senha...');
	$scope.enviando_gerar = true;
	 
	var dados = $.param({ 
					back_novasenha:   $("input:password[name='back_novasenha']").val(),
				    back_novasenha1:  $("input:password[name='back_novasenha1']").val(),
  			});	 
 	 
	$http({
        method  : 'POST',
        url     : 'http://ec2-54-94-136-137.sa-east-1.compute.amazonaws.com/perfil/senhaSalvar/'+$scope.session_cd_cliente,
        data    : dados,  
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  
    })
        .success(function(data) {
 
            if (!data.sucesso) {
				    $scope.enviando_gerar  = false;
  					$scope.errorSenha      = data.errors.back_novasenha;
					   $scope.retorno        = data.retorno;
				     $scope.retorno_error     = data.retorno_error;
					 	   $scope.back_novasenha      = '';
				    $scope.back_novasenha1       = '';
					 
					  $timeout(function() {
					     $scope.hide();
					}, 500);
 					
 			 } else {
				  $scope.enviando_gerar  = false;
				   $scope.retorno        = data.retorno;
				  $scope.retorno_error  = false;
				  $scope.errorSenha      = false;
				  $scope.back_novasenha      = '';
				    $scope.back_novasenha1       = '';
				   
		 
 			  
				   $timeout(function() {
					 $scope.hide();
					}, 500);
					 
				  $scope.senha();
				  
				 }
        });
}
	 

 







})



 
.controller('orcamentosCtrl', function($scope, $stateParams, $ionicModal, $ionicActionSheet) {

 

 $scope.showActionsheet = function() {

    $ionicActionSheet.show({
      titleText: 'O que deseja fazer?',
      buttons: [
        { text: 'Ver Perfil do Profissional' },
        { text: 'Ligar para o Profissional' },
      ],
     // destructiveText: 'Delete',
      cancelText: 'Cancelar',
      cancel: function() {
        alert('CANCELLED');
      },

      buttonClicked: function(index) {
        alert(index);
        return true;
      },
      destructiveButtonClicked: function() {
        alert('DESTRUCT');
        return true;
      }
    });
  };

















 $scope.solicitar_orcamento = function() {
      $scope.modal.show();
  };


  $scope.abrir_orcamento = function() {
      $scope.modal_orcamento.show();
  };


 $ionicModal.fromTemplateUrl('templates/modals/orcamento.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });



 $ionicModal.fromTemplateUrl('templates/modals/orcamento_abrir.html', {
    scope: $scope
  }).then(function(modal_orcamento) {
    $scope.modal_orcamento = modal_orcamento;
  });
 
  $scope.closeOrcamento = function() {
    
    $scope.modal_orcamento.hide();
	 $scope.modal.hide();
 
  };




 $scope.registros = [
	{ titulo: 'Pintura', data: '07/12/2014 05:30', id: 1, notificacao: 0 },
	{ titulo: 'Serralheria', data: '08/12/2014 05:30', id: 1, notificacao: 3 },
	{ titulo: 'Limpeza de Quintal', data: '10/12/2014 05:30', id: 1, notificacao: 5 },

	  ];




})
 
 
 

.controller('buscarCtrl', function($scope, $stateParams, $timeout, $ionicLoading, $http, $ionicModal) { 
 $scope.codigo_cidade = 0;
 
 $scope.show = function() {
    $ionicLoading.show({
      template: 'carregando...'
    });
  };
  
  
  $scope.hide = function(){
    $ionicLoading.hide();
  };

  
     $scope.show();
     $timeout(function() {
					 $scope.hide();
					}, 300);
					
					
					
					
					
					
   $scope.buscarProfissionais = function() {
		
	$scope.enviando          = true;
	$scope.retorno_error     = '';
	$scope.errorCidade      = '';
 	
	var dados = $('#formbuscarProfissionais').serialize(); 
		
		
		console.log(dados);
		
		
		
		
	/*$http({
		method  : 'POST',
		url     :'http://ec2-54-94-136-137.sa-east-1.compute.amazonaws.com/buscar/buscarProfissionais', 
		data    : dados,  
		headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  
	})
	
	.success(function(data) {
	 if (!data.success) {
		 
			  $scope.enviando          = false;
			  $scope.errorCidade       = data.errors.cidade;
 			  $scope.retorno_error    = data.retorno_error; 
 	 } else {
		      
			   
			  $scope.errorCidade       = '';
			  $scope.retorno_error      = '';
			  $scope.retorno            = data.retorno;
 			  $scope.enviando           = false;
			 
			  
			  
		 }
	}); */
	}	 
	  
				
					
					
 
 
 
 
 $scope.cidade = function(index){ 
				    
	            $http.get("http://ec2-54-94-136-137.sa-east-1.compute.amazonaws.com/buscar/cidade/"+index).success(function(data){
 				  
				  $scope.termo_cidade   =  data.nome+' - '+data.sigla;
				  $scope.codigo_cidade  =  data.cd_cidade;
 				  $scope.modal.hide();
 				}); 
 				
				 }	
 
 
 
 
 $scope.pesquisar = function(pesquisa){
	 
  		if (pesquisa == ""){
  			$scope.completing = false;

		} else if(pesquisa.length < 4){
			$scope.completing = false;
			
	  }else{
			
 			var dados = $.param({ 
	            local:  pesquisa
				 		 
   			});	
  
   		 $http({
           method  : 'POST',  
           url     : 'http://ec2-54-94-136-137.sa-east-1.compute.amazonaws.com/buscar/local',  
            data    : dados,  
           headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  
         })
           .success(function(data) {
			   
				$scope.completing = true;	
 		    	$scope.registros      = data;    
				 
	        }) 
			
			.error(function(data) {  
				console.log("Ocorreu um erro no banco de dados");
	        });		
		}
	 };
 
 
 
 
 
  
  
  
  
 $scope.solicitar_orcamento = function() {
      $scope.modal.show();
  };
 

 $ionicModal.fromTemplateUrl('templates/modals/buscar.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

   
  
  
  
  
})



  
.controller('MapCtrl', function($scope, $ionicLoading) {  


 navigator.geolocation.getCurrentPosition(function (pos) {
      console.log('Got pos', pos);
	  
	   $scope.myLatlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
 		alert(pos.coords.latitude);   
	  
	   }, function (error) {
       alert('Nao foi possível encontrar localizacao: ' + error.message);
    });
	
 $scope.show = function() {
    $ionicLoading.show({
      template: 'carregando...'
    });
  };
  
  
  $scope.hide = function(){
    $ionicLoading.hide();
  };
  $scope.show();  
  
  $scope.mapCreated = function(map) {
	 
    $scope.map = map;
	 $scope.hide();
  };

 

  $scope.centerOnMe = function () {
	 
	 console.log("Centering");
    if (!$scope.map) {
      return;
    }
	
	
	 $scope.loading = $ionicLoading.show({
      content: 'Carregando sua localizacao ...',
      showBackdrop: false
    });
	
	
	
	 navigator.geolocation.getCurrentPosition(function (pos) {
      console.log('Got pos', pos);
	  
	   $scope.myLatlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
 		 
		$scope.mapOptions = {
          center: $scope.myLatlng,
          zoom: 14,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
  		  
        //var map = new google.maps.Map($element[0], mapOptions);
        $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
		$scope.marker = new google.maps.Marker(
		
		
		{
          position: $scope.myLatlng,
          map: $scope.map,
          title: 'Hello World!'
         } 
		 
		 
		 
		 
		 );
	   
	   
      $scope.loading.hide();
	  
	  
	  
	  
	   }, function (error) {
       alert('Nao foi possível encontrar localizacao: ' + error.message);
    });
	  
	 };
  
 
})  

  