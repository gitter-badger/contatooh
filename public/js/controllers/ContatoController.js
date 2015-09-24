angular.module('contatooh').controller('ContatoController', function ($scope, $routeParams, $resource) {

	var Contato = $resource('/contatos/:id');
	$scope.contato = new Contato();

	if ($routeParams.contatoId) {
		//Só busca dados do contato se o ID for passado
		Contato.get({ id: $routeParams.contatoId },
			function (contato) {
				$scope.contato = contato;
			},
			function (erro) {
				$scope.mensagem = {
					texto: 'Contato não existe. Novo contato.'
				};
			}
			);
	} else {
		$scope.contato = {};
	}

	$scope.salva = function () {
		//Como 'contato' é um objeto retornado de $resource é adicinado funções adicionais ao nosso objeto sem sabermos
		// A função $save gera por debaixo dos panos uma requisição do tipo POST que envia para http://localhost/contatos
		$scope.contato.$save()
			.then(function () {
				$scope.mensagem = { texto: 'Salvo com sucesso' };
				// limpa o formulário
				$scope.contato = new Contato();
			})
			.catch(function (erro) {
				$scope.mensagem = { texto: 'Não foi possível salvar' };
			});
	};



});