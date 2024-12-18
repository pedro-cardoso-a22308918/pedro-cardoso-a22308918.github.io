document.addEventListener('DOMContentLoaded', function() {
    fetchProdutos();
    fetchCategorias();
    atualizaCesto();
});

document
  .getElementById("buy-button")
  .addEventListener("click", function () {
    const cestoProdutos = JSON.parse(localStorage.getItem('cestoProdutos')) || [];

    let totalSemDesconto = document.querySelector(".product-cesto").textContent;
    
    totalSemDesconto = parseFloat(totalSemDesconto.replace('Preço Total: ', '').replace('€', '').trim());

    const totalComDesconto = calculaDesconto(totalSemDesconto);

    const estudante = document.getElementById('estudante-checkbox').checked;
    const cupom = document.getElementById('cupao-input').value;

    comprar(cestoProdutos.map(produto => produto.id), estudante, cupom);  //passa os ids dos produtos o estado do estudante e o cupom
  });


document.getElementById('ordering').addEventListener('change', (event) => {
    let ordernacao = event.target.value; 
    let categoria = document.getElementById('categories').value;
    fetchProdutos(categoria,ordernacao); 
});

document.getElementById('search').addEventListener('input', (event) => {
    let pesquisa = event.target.value;
    let categoria = document.getElementById('categories').value;
    let ordernacao = document.getElementById('ordering').value;
    fetchProdutos(categoria,ordernacao,pesquisa); 
});


//parametro default(null|vazio) caso nao seja defenido
function fetchProdutos(categoria = '', ordernacao = '', pesquisa = '') {
    let getProdutos = 'https://deisishop.pythonanywhere.com/products/';

    fetch(getProdutos)
        .then(response => response.json())//transforma a resposta em JSON
        .then(produtos => {
            console.log(produtos); // Debug

            let produtosFiltrados;
            if (categoria === 'all categories' || categoria === '') {
                produtosFiltrados = produtos;
            } else if (categoria) {
                produtosFiltrados = produtos.filter(produto => produto.category === categoria);
            }
            
            console.log(produtosFiltrados); // Debug

            if (ordernacao === 'lowest') {
                produtosFiltrados = produtosFiltrados.sort((a, b) => a.price - b.price); 
            } else if (ordernacao === 'highest') {
                produtosFiltrados = produtosFiltrados.sort((a, b) => b.price - a.price); 
            }

            console.log(produtosFiltrados); // Debug

            if (pesquisa) {
                produtosFiltrados = produtosFiltrados.filter(produto => produto.title.toLowerCase().includes(pesquisa.toLowerCase()));
            }

            limparProdutos();
            carregarProdutos(produtosFiltrados); 
        })
        .catch(error => {
            console.log('Erro produtos', error);
        });
}

function carregarProdutos(produtos){
    const gridContainer = document.querySelector('.grid-container');

    produtos.forEach(function(produto){
        const sectionProduto = criarProduto(produto);
        gridContainer.appendChild(sectionProduto);
    
        console.log(produto);
    });
}

function limparProdutos(){
    const containerProdutos = document.querySelector('.grid-container');
    if (containerProdutos) {
        containerProdutos.innerHTML = '';//remove produtos
    }
}
    

function fetchCategorias() {
    const getCategorias = 'https://deisishop.pythonanywhere.com/categories/';

    fetch(getCategorias)
        .then(response => response.json())
        .then(categorias => {
            console.log(categorias);//Debug
            carregarCategorias(categorias);
        })
        .catch(error => console.error('Erro categorias', error));
}


function carregarCategorias(categorias){
    const categories = document.getElementById("categories");
    if (!categories) return;

    categorias.forEach(categoria => {
        const option = document.createElement("option");
        option.value = categoria;
        option.textContent = categoria;
        categories.appendChild(option);
    });

    categories.addEventListener("change", (event) => {
        const categoriaSelecionada = event.target.value;
        const ordering = document.getElementById('ordering').value;
        fetchProdutos(categoriaSelecionada,ordering);
    });
  
}

function criarProduto(produto){
    const productSection = document.createElement('section');
    productSection.classList.add("grid-item")

    const titulo = document.createElement('h1');
    titulo.classList.add("title-product");
    titulo .textContent = produto.title;
    productSection.appendChild(titulo);

    const imagem = document.createElement('img');
    imagem.src = produto.image;
    imagem.alt = produto.title;
    productSection.appendChild(imagem);

    const preco = document.createElement('p');
    preco.textContent = `Custo total:${produto.price}€`;
    productSection.appendChild(preco);

    const descricao = document.createElement('p');
    descricao.classList.add("description-product");
    descricao.textContent = produto.description;
    productSection.appendChild(descricao);

    const botao = document.createElement('button');
    botao.textContent = "+Adicionar ao cesto";
    productSection.appendChild(botao);

    botao.addEventListener('click', function(){
        adicionaProdutoAoCesto(produto);
    });

    return productSection;
}

function adicionaProdutoAoCesto(produto){
    const cestoContainer = document.querySelector('.cesto');
    const cestoProduto = criarProdutoNoCesto(produto);
    cestoContainer.appendChild(cestoProduto);
    guardarProdutoCesto(produto);
    calcularPrecoTotal();
}

function criarProdutoNoCesto(produto){
    const cesto = document.createElement('section');
    cesto.classList.add("grid-item")

    const titulo = document.createElement('h1');
    titulo.classList.add("title-product");
    titulo .textContent = produto.title;
    cesto.appendChild(titulo);

    const imagem = document.createElement('img');
    imagem.src = produto.image;
    imagem.alt = produto.title;
    cesto.appendChild(imagem);

    const preco = document.createElement('p');
    preco.textContent = `Custo total:${produto.price}€`;
    cesto.appendChild(preco);

    const descricao = document.createElement('p');
    descricao.classList.add("description-product");
    descricao.textContent = produto.description;
    cesto.appendChild(descricao);

    const botao = document.createElement('button');
    botao.textContent = "-Remover do cesto";
    cesto.appendChild(botao);

    botao.addEventListener('click', function(){
        removerProdutoDoCesto(produto ,cesto);
    });    

    return cesto;
}

function removerProdutoDoCesto(produto ,cesto){
    const cestoContainer = document.querySelector('.cesto');
    cestoContainer.removeChild(cesto);  

    //se estiver vazio cria um array vazio se nao pega o que esta no local storage
    let cestoProdutos = JSON.parse(localStorage.getItem('cestoProdutos')) || [];
    
    //filtra o produto que é diferente do produto que foi removido
    cestoProdutos = cestoProdutos.filter(item => item.id !== produto.id);
    localStorage.setItem('cestoProdutos', JSON.stringify(cestoProdutos));
    calcularPrecoTotal();
}

//utilizando local storage
function guardarProdutoCesto(produto){
    const cestoProdutos = JSON.parse(localStorage.getItem('cestoProdutos')) || [];
    cestoProdutos.push(produto);
    localStorage.setItem('cestoProdutos', JSON.stringify(cestoProdutos));
}

function atualizaCesto(){
    const cestoContainer = document.querySelector('.cesto');
    const cestoProdutos = JSON.parse(localStorage.getItem('cestoProdutos')) || [];

    cestoProdutos.forEach(function(produto){
        const cestoProduto = criarProdutoNoCesto(produto);
        cestoContainer.appendChild(cestoProduto);
    });
    
    calcularPrecoTotal();

}

function calcularPrecoTotal(){
    const cestoProdutos = JSON.parse(localStorage.getItem('cestoProdutos')) || [];

    const precoTotal = cestoProdutos.reduce((total, produto) => total + produto.price, 0);

    const precoTotalElemento = document.querySelector('.product-cesto');

    if (!precoTotalElemento) {
        const novoPrecoTotalElemento = document.createElement('h1');

        novoPrecoTotalElemento.classList.add('product-cesto');
        novoPrecoTotalElemento.textContent = `Preço Total: ${precoTotal.toFixed(2)}€`;

        const cestoContainer = document.querySelector('.cesto');
        cestoContainer.appendChild(novoPrecoTotalElemento);

    } else {
        precoTotalElemento.textContent = `Preço Total: ${precoTotal.toFixed(2)}€`;
    }

}   

function calculaDesconto(totalSemDesconto){
    const estudante = document.getElementById('estudante-checkbox').checked;
    const cupaoInput = document.getElementById('cupao-input').value;

    if(estudante){
        totalSemDesconto *= 0.25;
    }

    if(cupaoInput === 'BLACKFRIDAY'){
        totalSemDesconto *= 0.5;
    }else if(cupaoInput === 'DEISI'){
        totalSemDesconto *= 0.75;
    }else if(cupaoInput === ''){
        document.getElementById("desconto-resultado").textContent = "Cupão inválido!";
        return total;
    }

    document.getElementById("desconto-resultado").textContent = `Preço com desconto: ${totalSemDesconto.toFixed(2)}€`;
    return totalSemDesconto;
}

function comprar(produtos, estudante, cupom){
    const data = {
        products: produtos,  
        student: estudante,  
        coupon: cupom
    };

    fetch("https://deisishop.pythonanywhere.com/buy/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
          }
          return response.json();
        })
        .then((responseData) => {
            if (responseData.error) {
                document.getElementById(
                  "desconto-resultado"
                ).textContent = `Erro: ${responseData.error}`;
              } else {
        
                document.getElementById(
                  "desconto-resultado"
                ).textContent = `Referência para pagamento: ${responseData.reference}, Total a pagar: ${responseData.totalCost}€`;
              }
            })
            .catch((error) => {
              document.getElementById(
                "desconto-resultado"
              ).textContent = `Erro ao processar o pagamento: ${error.message}`;
            });
}