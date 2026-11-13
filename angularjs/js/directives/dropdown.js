/**
 * Menu suspenso: <dropdown rotulo="Categoria" opcoes="lista" ao-selecionar="fn(opcao)"></dropdown>
 * rotulo: texto do botão
 * opcoes: [{ texto: '...', acao: function () {} }]  (acao é opcional)
 * ao-selecionar: callback chamado com a opção escolhida
 * Fecha ao selecionar uma opção ou ao clicar fora.
 */
angular.module('app.directives')
  .directive('dropdown', function ($document) {
    return {
      restrict: 'E',
      scope: {
        rotulo: '@',
        opcoes: '=',
        aoSelecionar: '&'
      },
      template:
        '<div class="suspenso">' +
        '  <button type="button" class="suspenso-botao" ng-click="alternar()">{{ rotulo }} ▾</button>' +
        '  <ul class="suspenso-lista" ng-show="aberto">' +
        '    <li ng-repeat="opcao in opcoes">' +
        '      <button type="button" ng-click="selecionar(opcao)">{{ opcao.texto }}</button>' +
        '    </li>' +
        '  </ul>' +
        '</div>',
      link: function (scope, elemento) {
        scope.aberto = false;

        scope.alternar = function () {
          scope.aberto = !scope.aberto;
        };

        scope.selecionar = function (opcao) {
          scope.aberto = false;
          // Callback próprio da opção (se existir)
          if (angular.isFunction(opcao.acao)) {
            opcao.acao();
          }
          scope.aoSelecionar({ opcao: opcao });
        };

        // Fecha o menu quando o clique acontece fora do componente
        function aoClicarFora(evento) {
          if (scope.aberto && !elemento[0].contains(evento.target)) {
            scope.$apply(function () {
              scope.aberto = false;
            });
          }
        }

        $document.on('click', aoClicarFora);
        scope.$on('$destroy', function () {
          $document.off('click', aoClicarFora);
        });
      }
    };
  });
