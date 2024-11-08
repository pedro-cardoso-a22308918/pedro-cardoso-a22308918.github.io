// Seleciona elementos
const form = document.getElementById('form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const feedback = document.getElementById('feedback-message');
const container = document.querySelector('.container');

//click no botao de enviar
form.addEventListener('submit', function(event) {
    event.preventDefault();
    feedback.textContent = 'Formulário enviado com sucesso!';
    feedback.style.color = 'green';
});

//dblclick na mensagem
messageInput.addEventListener('dblclick', function() {
    messageInput.style.backgroundColor = 'lightblue';
    feedback.textContent = 'Mensagem destacada';
});

//Mouseover e mouseout no título
const title = document.querySelector('h2');
title.addEventListener('mouseover', function() {
    title.style.color = 'blue';
});

title.addEventListener('mouseout', function() {
    title.style.color = 'black';
    feedback.textContent = '';
});

//keydown e keyup no nome
nameInput.addEventListener('keydown', function() {
    nameInput.style.backgroundColor = 'lightyellow';
});

nameInput.addEventListener('keyup', function() {
    nameInput.style.backgroundColor = '';
});

//change no campo de email
emailInput.addEventListener('change', function() {
    feedback.textContent = 'Campo de email alterado.';
});

//textContent e innerHTML
feedback.addEventListener('click', function() {
    feedback.innerHTML = '<strong>Mensagem de feedback clicada!</strong>';
    feedback.style.color = 'purple';
});
