/**
 * Notificações toast: <toast-container></toast-container>
 * Exibe as notificações registradas no ToastService.
 * Para disparar uma: ToastService.mostrar('sucesso' | 'erro' | 'info', 'mensagem').
 */
angular.module('app.directives')
  .directive('toastContainer', function (ToastService) {
    return {
      restrict: 'E',
      scope: {},
      template:
        '<div class="toasts">' +
        '  <div class="toast" ng-repeat="toast in toasts track by toast.id" ng-class="toast.tipo">' +
        '    <span>{{ toast.mensagem }}</span>' +
        '    <button type="button" ng-click="fechar(toast)" aria-label="Fechar">×</button>' +
        '  </div>' +
        '</div>',
      link: function (scope) {
        scope.toasts = ToastService.toasts;
        scope.fechar = ToastService.fechar;
      }
    };
  });
