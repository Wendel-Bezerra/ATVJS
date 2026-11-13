<!-- Exibe as notificações registradas no toastService -->
<template>
  <div class="toasts">
    <div v-for="toast in servico.toasts" :key="toast.id" class="toast" :class="toast.tipo">
      <span>{{ toast.mensagem }}</span>
      <button type="button" aria-label="Fechar" @click="servico.fechar(toast.id)">×</button>
    </div>
  </div>
</template>

<script>
import { toastService } from '../services/toastService.js';

export default {
  name: 'ToastContainer',
  data() {
    return {
      servico: toastService
    };
  }
};
</script>
