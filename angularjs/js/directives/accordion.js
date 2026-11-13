/**
 * Módulo das diretivas (componentes visuais).
 * Este arquivo cria o módulo; os demais arquivos da pasta apenas o reutilizam.
 */
angular.module('app.directives', [])

  /**
   * Acordeão: <accordion itens="lista"></accordion>
   * itens: [{ titulo: '...', conteudo: '...' }]
   * Apenas um item fica aberto por vez.
   */
  .directive('accordion', function () {
    return {
      restrict: 'E',
      scope: {
        itens: '='
      },
      template:
        '<div class="acordeao">' +
        '  <div class="acordeao-item" ng-repeat="item in itens" ng-class="{ aberto: estaAberto($index) }">' +
        '    <button type="button" class="acordeao-titulo" ng-click="alternar($index)">' +
        '      {{ item.titulo }}' +
        '      <span>{{ estaAberto($index) ? "−" : "+" }}</span>' +
        '    </button>' +
        '    <div class="acordeao-corpo"><p>{{ item.conteudo }}</p></div>' +
        '  </div>' +
        '</div>',
      link: function (scope) {
        // Índice do item aberto (-1 = nenhum)
        scope.indiceAberto = -1;

        scope.estaAberto = function (indice) {
          return scope.indiceAberto === indice;
        };

        scope.alternar = function (indice) {
          scope.indiceAberto = scope.estaAberto(indice) ? -1 : indice;
        };
      }
    };
  });
