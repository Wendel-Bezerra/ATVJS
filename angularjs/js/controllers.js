/**
 * Módulo de controladores.
 */
angular.module('app.controllers', [])

  .controller('MainController', function ($scope, $interval, ProdutoFactory, ToastService) {
    var ITENS_POR_PAGINA = 4;
    var temporizadorEnvio = null;

    // ----- Produtos: busca (ng-model), filtro (dropdown) e paginação -----
    $scope.busca = '';
    $scope.categoria = 'Todas';
    $scope.paginaAtual = 1;

    /** Recalcula a lista exibida a partir da busca, categoria e página. */
    function atualizarProdutos() {
      var filtrados = ProdutoFactory.filtrar($scope.categoria, $scope.busca);
      $scope.totalPaginas = ProdutoFactory.totalPaginas(filtrados, ITENS_POR_PAGINA);
      $scope.produtosVisiveis = ProdutoFactory.paginar(filtrados, $scope.paginaAtual, ITENS_POR_PAGINA);
    }

    /** Chamado pelo ng-change do campo de busca. */
    $scope.aoBuscar = function () {
      $scope.paginaAtual = 1;
      atualizarProdutos();
    };

    /** Callback da diretiva de paginação. */
    $scope.mudarPagina = function (pagina) {
      $scope.paginaAtual = pagina;
      atualizarProdutos();
    };

    // Opções do menu suspenso, cada uma com seu próprio callback
    $scope.opcoesCategoria = ProdutoFactory.categorias.map(function (categoria) {
      return {
        texto: categoria,
        acao: function () {
          $scope.categoria = categoria;
          $scope.paginaAtual = 1;
          atualizarProdutos();
        }
      };
    });

    /** Callback geral do menu suspenso. */
    $scope.aoSelecionarCategoria = function (opcao) {
      ToastService.mostrar('info', 'Filtro aplicado: ' + opcao.texto);
    };

    // ----- Barra de progresso: envio de arquivo simulado -----
    $scope.progresso = 0;
    $scope.enviando = false;

    $scope.iniciarEnvio = function () {
      $scope.progresso = 0;
      $scope.enviando = true;
      temporizadorEnvio = $interval(function () {
        $scope.progresso += 10;
        if ($scope.progresso >= 100) {
          pararEnvio();
          ToastService.mostrar('sucesso', 'Arquivo enviado com sucesso!');
        }
      }, 300);
    };

    $scope.cancelarEnvio = function () {
      pararEnvio();
      ToastService.mostrar('erro', 'Envio cancelado pelo usuário.');
    };

    function pararEnvio() {
      $interval.cancel(temporizadorEnvio);
      $scope.enviando = false;
    }

    // ----- Abas: detalhes do produto -----
    $scope.abasProduto = [
      { titulo: 'Descrição', conteudo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Notebook leve, rápido e ideal para estudar e trabalhar.' },
      { titulo: 'Especificações', conteudo: 'Processador Lorem i5, 16 GB de memória, SSD de 512 GB, tela de 15,6 polegadas.' },
      { titulo: 'Avaliações', conteudo: '"Sed do eiusmod tempor, ótimo custo-benefício!" — nota 4,8 de 5 (132 avaliações).' }
    ];

    // ----- Acordeão: perguntas frequentes -----
    $scope.perguntas = [
      { titulo: 'Qual é o prazo de entrega?', conteudo: 'Lorem ipsum: o prazo é de 3 a 7 dias úteis, de acordo com a sua região.' },
      { titulo: 'Como faço para trocar um produto?', conteudo: 'Dolor sit amet: a troca pode ser solicitada em até 30 dias após o recebimento.' },
      { titulo: 'Quais são as formas de pagamento?', conteudo: 'Consectetur adipiscing: aceitamos cartão de crédito, boleto e Pix.' },
      { titulo: 'O site é seguro?', conteudo: 'Sed do eiusmod: todos os dados trafegam criptografados.' }
    ];

    // ----- Toasts: botões de demonstração -----
    $scope.notificar = function (tipo, mensagem) {
      ToastService.mostrar(tipo, mensagem);
    };

    // Evita que o temporizador continue rodando se o controlador for destruído
    $scope.$on('$destroy', pararEnvio);

    atualizarProdutos();
  });
