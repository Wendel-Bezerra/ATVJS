/**
 * Módulo de serviços: dados e lógica de negócio.
 */
angular.module('app.services', [])

  /**
   * Factory de produtos: guarda os dados fictícios e a lógica de filtro/paginação.
   */
  .factory('ProdutoFactory', function () {
    var produtos = [
      { nome: 'Notebook Lorem', categoria: 'Informática', preco: 3499.9 },
      { nome: 'Mouse Ipsum', categoria: 'Informática', preco: 89.9 },
      { nome: 'Teclado Dolor', categoria: 'Informática', preco: 199.5 },
      { nome: 'Monitor Sit 24"', categoria: 'Informática', preco: 899 },
      { nome: 'Fone Amet', categoria: 'Áudio', preco: 249.99 },
      { nome: 'Caixa de Som Elit', categoria: 'Áudio', preco: 399 },
      { nome: 'Microfone Sed', categoria: 'Áudio', preco: 329.9 },
      { nome: 'Cadeira Magna', categoria: 'Móveis', preco: 1199 },
      { nome: 'Mesa Aliqua', categoria: 'Móveis', preco: 749.9 },
      { nome: 'Estante Tempor', categoria: 'Móveis', preco: 459 },
      { nome: 'Webcam Labore', categoria: 'Informática', preco: 279.9 },
      { nome: 'Luminária Dolore', categoria: 'Móveis', preco: 129.9 }
    ];

    return {
      /** Categorias disponíveis (a primeira significa "sem filtro"). */
      categorias: ['Todas', 'Informática', 'Áudio', 'Móveis'],

      /** Retorna os produtos que batem com a categoria e o texto de busca. */
      filtrar: function (categoria, busca) {
        var texto = (busca || '').toLowerCase();
        return produtos.filter(function (produto) {
          var categoriaOk = categoria === 'Todas' || produto.categoria === categoria;
          var buscaOk = produto.nome.toLowerCase().indexOf(texto) !== -1;
          return categoriaOk && buscaOk;
        });
      },

      /** Quantidade de páginas para uma lista (mínimo 1). */
      totalPaginas: function (lista, porPagina) {
        return Math.max(1, Math.ceil(lista.length / porPagina));
      },

      /** Recorta a lista para a página informada (começando em 1). */
      paginar: function (lista, pagina, porPagina) {
        var inicio = (pagina - 1) * porPagina;
        return lista.slice(inicio, inicio + porPagina);
      }
    };
  })

  /**
   * Serviço de notificações toast: permite várias notificações ao mesmo tempo.
   */
  .service('ToastService', function ($timeout) {
    var self = this;
    var proximoId = 1;

    /** Lista observada pela diretiva <toast-container>. */
    self.toasts = [];

    /**
     * Exibe uma notificação.
     * @param {string} tipo 'sucesso' | 'erro' | 'info'
     * @param {string} mensagem texto exibido
     * @param {number} [duracao] milissegundos até sumir (padrão 3000)
     */
    self.mostrar = function (tipo, mensagem, duracao) {
      var toast = { id: proximoId++, tipo: tipo, mensagem: mensagem };
      self.toasts.push(toast);
      $timeout(function () {
        self.fechar(toast);
      }, duracao || 3000);
    };

    /** Remove a notificação (pelo tempo ou pelo clique do usuário). */
    self.fechar = function (toast) {
      var indice = self.toasts.indexOf(toast);
      if (indice !== -1) {
        self.toasts.splice(indice, 1);
      }
    };
  });
