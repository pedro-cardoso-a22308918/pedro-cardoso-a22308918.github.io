document.addEventListener('DOMContentLoaded', function() {
    carregarProdutos(produtos);
    atualizaCesto();
});

function carregarProdutos(produto){
    const gridContainer = document.querySelector('.grid-container');

    produtos.forEach(function(produto){
        const sectionProduto = criarProduto(produto);
        gridContainer.appendChild(sectionProduto);
    
        console.log(produto);
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

//TODO: falta mostrar o preço total do cesto
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