document.addEventListener('DOMContentLoaded', function() {
    carregarProdutos(produtos);
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
        removerProdutoDoCesto(produto);
    });    

    cestoContainer.appendChild(cesto);
}