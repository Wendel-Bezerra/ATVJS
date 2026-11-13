/**
 * Abas: <tabs abas="lista"></tabs>
 * abas: [{ titulo: '...', conteudo: '...' }]
 */
angular.module('app.directives')
  .directive('tabs', function () {
    return {
      restrict: 'E',
      scope: {
        abas: '='
      },
      template:
        '<div class="abas">' +
        '  <div class="abas-titulos">' +
        '    <button type="button" ng-repeat="aba in abas" ng-class="{ ativa: $index === ativa }"' +
        '            ng-click="selecionar($index)">{{ aba.titulo }}</button>' +
        '  </div>' +
        '  <div class="abas-conteudo"><p>{{ abas[ativa].conteudo }}</p></div>' +
        '</div>',
      link: function (scope) {
        // Índice da aba ativa
        scope.ativa = 0;

        scope.selecionar = function (indice) {
          scope.ativa = indice;
        };
      }
    };
  });
