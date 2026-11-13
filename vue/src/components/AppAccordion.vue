<!-- Acordeão: apenas um item aberto por vez. itens: [{ titulo, conteudo }] -->
<template>
  <div class="acordeao">
    <div
      v-for="(item, indice) in itens"
      :key="indice"
      class="acordeao-item"
      :class="{ aberto: indiceAberto === indice }"
    >
      <button type="button" class="acordeao-titulo" @click="alternar(indice)">
        {{ item.titulo }}
        <span>{{ indiceAberto === indice ? '−' : '+' }}</span>
      </button>
      <div class="acordeao-corpo"><p>{{ item.conteudo }}</p></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppAccordion',
  props: {
    itens: { type: Array, required: true }
  },
  data() {
    return {
      // Índice do item aberto (-1 = nenhum)
      indiceAberto: -1
    };
  },
  methods: {
    alternar(indice) {
      this.indiceAberto = this.indiceAberto === indice ? -1 : indice;
    }
  }
};
</script>
