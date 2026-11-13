<!-- Abas: abas: [{ titulo, conteudo }] -->
<template>
  <div class="abas">
    <div class="abas-titulos">
      <button
        v-for="(aba, indice) in abas"
        :key="indice"
        type="button"
        :class="{ ativa: indice === ativa }"
        @click="ativa = indice"
      >
        {{ aba.titulo }}
      </button>
    </div>
    <div class="abas-conteudo"><p>{{ abas[ativa].conteudo }}</p></div>
  </div>
</template>

<script>
export default {
  name: 'AppTabs',
  props: {
    abas: { type: Array, required: true }
  },
  data() {
    return {
      // Índice da aba ativa
      ativa: 0
    };
  }
};
</script>
