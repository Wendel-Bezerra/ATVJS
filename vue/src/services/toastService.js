import { reactive } from 'vue';

/**
 * Serviço global de notificações toast.
 * Qualquer componente pode importar e chamar toastService.mostrar(...).
 */
let proximoId = 1;

export const toastService = reactive({
  /** Lista observada pelo componente ToastContainer. */
  toasts: [],

  /**
   * Exibe uma notificação.
   * @param {string} tipo 'sucesso' | 'erro' | 'info'
   * @param {string} mensagem texto exibido
   * @param {number} [duracao] milissegundos até sumir (padrão 3000)
   */
  mostrar(tipo, mensagem, duracao = 3000) {
    const id = proximoId++;
    this.toasts.push({ id, tipo, mensagem });
    setTimeout(() => this.fechar(id), duracao);
  },

  /** Remove a notificação (pelo tempo ou pelo clique do usuário). */
  fechar(id) {
    const indice = this.toasts.findIndex((toast) => toast.id === id);
    if (indice !== -1) {
      this.toasts.splice(indice, 1);
    }
  }
});
