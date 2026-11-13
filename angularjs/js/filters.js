/**
 * Módulo de filtros: formatação de dados para exibição.
 */
angular.module('app.filters', [])

  /** Formata um número como moeda brasileira. Ex.: 3499.9 -> "R$ 3.499,90". */
  .filter('moeda', function () {
    return function (valor) {
      return (Number(valor) || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };
  })

  /** Formata um número como porcentagem. Ex.: 42.7 -> "43%". */
  .filter('porcentagem', function () {
    return function (valor) {
      return Math.round(Number(valor) || 0) + '%';
    };
  });
