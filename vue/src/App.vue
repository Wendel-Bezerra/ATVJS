<!-- Componente principal: orquestra os demais componentes -->
<template>
  <header>
    <h1>Loja Lorem</h1>
    <p>Desafio extra Vue.js — componentes</p>
  </header>

  <main class="grade">
    <!-- Menu suspenso + Paginação -->
    <section class="cartao largo">
      <h2>Produtos</h2>
      <div class="barra-filtros">
        <input v-model="busca" type="text" placeholder="Buscar produto..." @input="paginaAtual = 1">
        <AppDropdown
          :rotulo="'Categoria: ' + categoria"
          :opcoes="categorias"
          @selecionar="aoSelecionarCategoria"
        />
      </div>

      <ul class="produtos">
        <li v-for="produto in produtosVisiveis" :key="produto.nome">
          <strong>{{ produto.nome }}</strong>
          <small>{{ produto.categoria.toUpperCase() }}</small>
          <span>{{ formatarPreco(produto.preco) }}</span>
        </li>
        <li v-if="produtosVisiveis.length === 0">Nenhum produto encontrado.</li>
      </ul>

      <AppPagination :total="totalPaginas" :atual="paginaAtual" @mudar="paginaAtual = $event" />
    </section>

    <!-- Abas -->
    <section class="cartao">
      <h2>Detalhes do produto</h2>
      <AppTabs :abas="abasProduto" />
    </section>

    <!-- Barra de progresso -->
    <section class="cartao">
      <h2>Envio de arquivo</h2>
      <AppProgressBar :valor="progresso" />
      <div class="botoes">
        <button type="button" :disabled="enviando" @click="iniciarEnvio">Enviar arquivo</button>
        <button type="button" :disabled="!enviando" @click="cancelarEnvio">Cancelar</button>
      </div>
      <label class="controle">
        Ajuste manual: {{ progresso }}%
        <input v-model.number="progresso" type="range" min="0" max="100" :disabled="enviando">
      </label>
    </section>

    <!-- Acordeão -->
    <section class="cartao">
      <h2>Perguntas frequentes</h2>
      <AppAccordion :itens="perguntas" />
    </section>

    <!-- Toasts -->
    <section class="cartao">
      <h2>Notificações</h2>
      <div class="botoes">
        <button type="button" @click="notificar('sucesso', 'Operação realizada com sucesso!')">Sucesso</button>
        <button type="button" @click="notificar('erro', 'Erro ao salvar os dados.')">Erro</button>
        <button type="button" @click="notificar('info', 'Você tem uma nova mensagem.')">Informação</button>
      </div>
    </section>
  </main>

  <ToastContainer />
</template>

<script>
import AppAccordion from './components/AppAccordion.vue';
import AppDropdown from './components/AppDropdown.vue';
import AppPagination from './components/AppPagination.vue';
import AppProgressBar from './components/AppProgressBar.vue';
import AppTabs from './components/AppTabs.vue';
import ToastContainer from './components/ToastContainer.vue';
import { toastService } from './services/toastService.js';

const ITENS_POR_PAGINA = 4;

export default {
  name: 'App',
  components: { AppAccordion, AppDropdown, AppPagination, AppProgressBar, AppTabs, ToastContainer },
  data() {
    return {
      produtos: [],
      categorias: ['Todas', 'Informática', 'Áudio', 'Móveis'],
      busca: '',
      categoria: 'Todas',
      paginaAtual: 1,
      progresso: 0,
      enviando: false,
      temporizadorEnvio: null,
      abasProduto: [
        { titulo: 'Descrição', conteudo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Notebook leve, rápido e ideal para estudar e trabalhar.' },
        { titulo: 'Especificações', conteudo: 'Processador Lorem i5, 16 GB de memória, SSD de 512 GB, tela de 15,6 polegadas.' },
        { titulo: 'Avaliações', conteudo: '"Sed do eiusmod tempor, ótimo custo-benefício!" — nota 4,8 de 5 (132 avaliações).' }
      ],
      perguntas: [
        { titulo: 'Qual é o prazo de entrega?', conteudo: 'Lorem ipsum: o prazo é de 3 a 7 dias úteis, de acordo com a sua região.' },
        { titulo: 'Como faço para trocar um produto?', conteudo: 'Dolor sit amet: a troca pode ser solicitada em até 30 dias após o recebimento.' },
        { titulo: 'Quais são as formas de pagamento?', conteudo: 'Consectetur adipiscing: aceitamos cartão de crédito, boleto e Pix.' },
        { titulo: 'O site é seguro?', conteudo: 'Sed do eiusmod: todos os dados trafegam criptografados.' }
      ]
    };
  },
  computed: {
    /** Produtos que batem com a categoria e o texto de busca. */
    produtosFiltrados() {
      const texto = this.busca.toLowerCase();
      return this.produtos.filter((produto) => {
        const categoriaOk = this.categoria === 'Todas' || produto.categoria === this.categoria;
        return categoriaOk && produto.nome.toLowerCase().includes(texto);
      });
    },
    totalPaginas() {
      return Math.max(1, Math.ceil(this.produtosFiltrados.length / ITENS_POR_PAGINA));
    },
    produtosVisiveis() {
      const inicio = (this.paginaAtual - 1) * ITENS_POR_PAGINA;
      return this.produtosFiltrados.slice(inicio, inicio + ITENS_POR_PAGINA);
    }
  },
  // Lifecycle hook: carrega os dados fictícios ao criar o componente
  created() {
    this.produtos = [
      { nome: 'Notebook Lorem', categoria: 'Informática', preco: 3499.9 },
      { nome: 'Mouse Ipsum', categoria: 'Informática', preco: 89.9 },
      { nome: 'Teclado Dolor', categoria: 'Informática', preco: 199.5 },
      { nome: 'Monitor Sit 24"', categoria: 'Informática', preco: 899 },
      { nome: 'Fone Amet', categoria: 'Áudio', preco: 249.99 },
      { nome: 'Caixa de Som Elit', categoria: 'Áudio', preco: 399 },
      { nome: 'Microfone Sed', categoria: 'Áudio', preco: 329.9 },
      { nome: 'Cadeira Magna', categoria: 'Móveis', preco: 1199 },
      { nome: 'Mesa Aliqua', categoria: 'Móveis', preco: 749.9 },
      { nome: 'Estante Tempor', categoria: 'Móveis', preco: 459 },
      { nome: 'Webcam Labore', categoria: 'Informática', preco: 279.9 },
      { nome: 'Luminária Dolore', categoria: 'Móveis', preco: 129.9 }
    ];
  },
  beforeUnmount() {
    clearInterval(this.temporizadorEnvio);
  },
  methods: {
    formatarPreco(valor) {
      return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    },
    aoSelecionarCategoria(opcao) {
      this.categoria = opcao;
      this.paginaAtual = 1;
      toastService.mostrar('info', 'Filtro aplicado: ' + opcao);
    },
    iniciarEnvio() {
      this.progresso = 0;
      this.enviando = true;
      this.temporizadorEnvio = setInterval(() => {
        this.progresso += 10;
        if (this.progresso >= 100) {
          this.pararEnvio();
          toastService.mostrar('sucesso', 'Arquivo enviado com sucesso!');
        }
      }, 300);
    },
    cancelarEnvio() {
      this.pararEnvio();
      toastService.mostrar('erro', 'Envio cancelado pelo usuário.');
    },
    pararEnvio() {
      clearInterval(this.temporizadorEnvio);
      this.enviando = false;
    },
    notificar(tipo, mensagem) {
      toastService.mostrar(tipo, mensagem);
    }
  }
};
</script>
