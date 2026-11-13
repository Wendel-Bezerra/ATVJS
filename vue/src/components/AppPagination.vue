<!-- Paginação: recebe total e atual via props e emite "mudar" com a nova página -->
<template>
  <nav class="paginacao">
    <button type="button" :disabled="atual <= 1" @click="ir(atual - 1)">‹ Anterior</button>
    <button
      v-for="numero in total"
      :key="numero"
      type="button"
      :class="{ ativa: numero === atual }"
      @click="ir(numero)"
    >
      {{ numero }}
    </button>
    <button type="button" :disabled="atual >= total" @click="ir(atual + 1)">Próxima ›</button>
  </nav>
</template>

<script>
export default {
  name: 'AppPagination',
  props: {
    total: { type: Number, required: true },
    atual: { type: Number, required: true }
  },
  emits: ['mudar'],
  methods: {
    ir(pagina) {
      if (pagina >= 1 && pagina <= this.total && pagina !== this.atual) {
        this.$emit('mudar', pagina);
      }
    }
  }
};
</script>
