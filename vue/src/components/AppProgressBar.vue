<!-- Barra de progresso: recebe o valor (0 a 100) via props -->
<template>
  <div class="progresso">
    <div class="progresso-preenchimento" :style="{ width: limitado + '%' }"></div>
    <span class="progresso-texto">{{ Math.round(limitado) }}%</span>
  </div>
</template>

<script>
export default {
  name: 'AppProgressBar',
  props: {
    valor: { type: Number, default: 0 }
  },
  computed: {
    /** Garante que o valor fique sempre entre 0 e 100. */
    limitado() {
      return Math.min(100, Math.max(0, this.valor));
    }
  }
};
</script>
