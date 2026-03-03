// =====================================
// CONFIGURAÇÕES
// =====================================
const emailVendas = "gglimportes@gmail.com"; // troque se quiser

// =====================================
// PRODUTOS (VOCÊ EDITA AQUI PELO CELULAR)
// =====================================
const produtos = [
  {
    nome: "Cartela de 55 adesivos para bicicleta (Foto Meramente Ilustrativa)",
    preco: 20,
    imagem: "55 adesivos.jpeg"
  },
  {
    nome: "Boné de marca",
    preco: 90,
    imagem: "boné de marca.jpeg"
  },
  {
    nome: "Punho de bicicleta",
    preco: 20,
    imagem: "punho de bicicleta.jpeg"
  },
  {
    nome: "Banco de bicicleta",
    preco: 30,
    imagem: "banco de bicicleta.jpeg"
  },
  {
    nome: "Relógio smartwatch",
    preco: 100,
    imagem: "relogio smartwatch.jpeg"
  },
  {
    nome: "16 adesivos (Foto Meramente Ilustrativa)",
    preco: 16,
    imagem: "16 adesivos.jpeg"
  },
  {
    nome: "Chuteira Nike Original Society (Foto Meramente Ilustrativa)",
    preco: 290,
    imagem: "chuteira nike original society.jpeg"
  },
  {
    nome: "Patinho de guidão",
    preco: 10,
    imagem: "patinho de guidão.jpeg"
  },
  {
    nome: "Protetor de Quadro",
    preco: 14.99,
    imagem: "protetor de quadro.jpeg"
  },
  {
    nome: "Kit de Cordão",
    preco: 15,
    imagem: "kit cordão.jpeg"
  },
  {
    nome: "Pezinho de Bicicleta",
    preco: 25,
    imagem: "pézinho de bike.jpeg"
  },
  {
    nome: "Banco Selim de Grau para Bicicleta",
    preco: 60,
    imagem: "banco selim grau para bicicleta.jpeg"
  },
  {
    nome: "Guidom de Bicicleta Profissional",
    preco: 79.99,
    imagem: "guidao de bike profissional.jpeg"
  },
  {
    nome: "Pedal de Ferro",
    preco: 40,
    imagem: "pedal de ferro.jpeg"
  },
];

// =====================================
// CARRINHO
// =====================================
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function salvarCarrinho() {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  atualizarCarrinho();
}

function adicionarCarrinho(index) {
  carrinho.push(produtos[index]);
  salvarCarrinho();
  alert("Produto adicionado ao carrinho!");
}

function removerCarrinho(index) {
  carrinho.splice(index, 1);
  salvarCarrinho();
}

function limparCarrinho() {
  carrinho = [];
  salvarCarrinho();
}

// =====================================
// RENDERIZAÇÃO
// =====================================
function mostrarProdutos() {
  const lista = document.getElementById("listaProdutos");
  lista.innerHTML = "";

  produtos.forEach((p, i) => {
    lista.innerHTML += `
      <div class="produto">
        <img src="${p.imagem}">
        <h3>${p.nome}</h3>
        <p>R$ ${p.preco}</p>
        <button onclick="adicionarCarrinho(${i})">Adicionar</button>
      </div>
    `;
  });
}

function atualizarCarrinho() {
  const lista = document.getElementById("itensCarrinho");
  const totalSpan = document.getElementById("totalCarrinho");
  const contador = document.getElementById("contadorCarrinho");

  lista.innerHTML = "";
  let total = 0;

  carrinho.forEach((p, i) => {
    total += p.preco;
    lista.innerHTML += `
      <li>
        ${p.nome} - R$ ${p.preco}
        <button onclick="removerCarrinho(${i})">X</button>
      </li>
    `;
  });

  totalSpan.textContent = total;
  contador.textContent = carrinho.length;
}

// =====================================
// EMAIL
// =====================================
function finalizarPedido() {
  if (carrinho.length === 0) {
    alert("Carrinho vazio!");
    return;
  }

  const nome = document.getElementById("nomeCliente").value || "Não informado";

  let mensagem = `Nome/Apelido: ${nome}\n\nPedido:\n`;
  carrinho.forEach(p => {
    mensagem += `- ${p.nome} (R$ ${p.preco})\n`;
  });

  const total = carrinho.reduce((s, p) => s + p.preco, 0);
  mensagem += `\nTotal: R$ ${total}`;

  const link = `mailto:${emailVendas}?subject=Pedido - GL Imports&body=${encodeURIComponent(mensagem)}`;
  window.location.href = link;
}

// =====================================
// NAVEGAÇÃO
// =====================================
function mostrarSecao(id) {
  document.querySelectorAll(".secao").forEach(s => s.classList.add("escondido"));
  document.getElementById(id).classList.remove("escondido");
}

// =====================================
// INICIALIZAÇÃO
// =====================================
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("listaProdutos")) {
    mostrarProdutos();
  }

  if (document.getElementById("itensCarrinho")) {
    atualizarCarrinho();
  }
});












