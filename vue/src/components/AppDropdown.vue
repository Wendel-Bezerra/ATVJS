<!-- Menu suspenso: recebe rotulo e opcoes via props e emite "selecionar" com a opção -->
<template>
  <div class="suspenso">
    <button type="button" class="suspenso-botao" @click="aberto = !aberto">{{ rotulo }} ▾</button>
    <ul v-show="aberto" class="suspenso-lista">
      <li v-for="opcao in opcoes" :key="opcao">
        <button type="button" @click="selecionar(opcao)">{{ opcao }}</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'AppDropdown',
  props: {
    rotulo: { type: String, required: true },
    opcoes: { type: Array, required: true }
  },
  emits: ['selecionar'],
  data() {
    return {
      aberto: false
    };
  },
  // Lifecycle hooks: registra/remove o ouvinte de clique fora do componente
  mounted() {
    document.addEventListener('click', this.aoClicarFora);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.aoClicarFora);
  },
  methods: {
    selecionar(opcao) {
      this.aberto = false;
      this.$emit('selecionar', opcao);
    },
    aoClicarFora(evento) {
      if (!this.$el.contains(evento.target)) {
        this.aberto = false;
      }
    }
  }
};
</script>
