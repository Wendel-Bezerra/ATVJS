/**
 * Módulo principal da aplicação.
 * Orquestra os demais módulos: serviços, filtros, diretivas e controladores.
 */
angular.module('app', [
  'app.services',
  'app.filters',
  'app.directives',
  'app.controllers'
]);
