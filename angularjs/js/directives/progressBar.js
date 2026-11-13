/**
 * Barra de progresso: <progress-bar valor="42"></progress-bar>
 * valor: progresso de 0 a 100
 */
angular.module('app.directives')
  .directive('progressBar', function () {
    return {
      restrict: 'E',
      scope: {
        valor: '='
      },
      template:
        '<div class="progresso">' +
        '  <div class="progresso-preenchimento" ng-style="{ width: limitado() + \'%\' }"></div>' +
        '  <span class="progresso-texto">{{ limitado() | porcentagem }}</span>' +
        '</div>',
      link: function (scope) {
        /** Garante que o valor fique sempre entre 0 e 100. */
        scope.limitado = function () {
          return Math.min(100, Math.max(0, Number(scope.valor) || 0));
        };
      }
    };
  });
