/**
 * Paginação: <pagination total="5" atual="pagina" ao-mudar="irPara(pagina)"></pagination>
 * total: número total de páginas
 * atual: página atual (começa em 1)
 * ao-mudar: callback chamado com a nova página
 */
angular.module('app.directives')
  .directive('pagination', function () {
    return {
      restrict: 'E',
      scope: {
        total: '=',
        atual: '=',
        aoMudar: '&'
      },
      template:
        '<nav class="paginacao">' +
        '  <button type="button" ng-disabled="atual <= 1" ng-click="ir(atual - 1)">‹ Anterior</button>' +
        '  <button type="button" ng-repeat="numero in paginas" ng-class="{ ativa: numero === atual }"' +
        '          ng-click="ir(numero)">{{ numero }}</button>' +
        '  <button type="button" ng-disabled="atual >= total" ng-click="ir(atual + 1)">Próxima ›</button>' +
        '</nav>',
      link: function (scope) {
        scope.paginas = [];

        // Recria a lista de números sempre que o total de páginas mudar
        scope.$watch('total', function (total) {
          scope.paginas = [];
          for (var numero = 1; numero <= total; numero++) {
            scope.paginas.push(numero);
          }
        });

        scope.ir = function (pagina) {
          if (pagina >= 1 && pagina <= scope.total && pagina !== scope.atual) {
            scope.aoMudar({ pagina: pagina });
          }
        };
      }
    };
  });
