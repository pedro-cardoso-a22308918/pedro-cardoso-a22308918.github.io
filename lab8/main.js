//fazer o query selector antes das funcoes

// 1.Mouseover
document.getElementById('hover-text').addEventListener('mouseenter', () => {
    document.getElementById('hover-text').textContent = 'Obrigado por passares';
});

document.getElementById('hover-text').addEventListener('mouseleave', () => {
    document.getElementById('hover-text').textContent = 'Passa por aqui';
});

//2.
const colorDisplay = document.getElementById('color-display');
const buttons = document.querySelectorAll('#red-btn, #green-btn, #blue-btn');

function changeColorText(color) {
    colorDisplay.style.color = color;
}

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function() {
        if (buttons[i].id === 'red-btn') {
            changeColorText('Red');
        } else if (buttons[i].id === 'green-btn') {
            changeColorText('Green');
        } else if (buttons[i].id === 'blue-btn') {
            changeColorText('Blue');
        }
    });
}   


//3.
const colorInput = document.getElementById("color-input");
const colors = ["red", "green", "blue", "yellow", "gray"];
let colorIndex = 0;

function changeBackgroundColor() {
    colorInput.style.backgroundColor = colors[colorIndex];
    colorIndex = (colorIndex + 1) % colors.length;
}

colorInput.addEventListener("input", changeBackgroundColor);
colorInput.addEventListener("change", changeBackgroundColor);

//5. COUNT
let count = 0;
const countDisplay = document.getElementById("count");
const incrementButton = document.getElementById("incrementButton");

incrementButton.addEventListener("click", function () {
    count++;
    countDisplay.innerText = count;
});

//(4.)Escolher cor com options 
document.querySelector('select').onchange = function() {
    document.querySelector('body').style.backgroundColor = this.value;
}


//6.
const form = document.getElementById('form');
const name = document.getElementById('name');
const age = document.getElementById('age');
const result = document.getElementById('result');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    result.innerHTML = `Olá ${name.value}, tens ${age.value} anos.`;
});

//7.
if(!localStorage.getItem('automaticCounter')) {
    localStorage.setItem('automaticCounter', 0);
}

const span = document.getElementById('span');
function automaticCounter() {
    let automaticCounter = localStorage.getItem('automaticCounter');
    automaticCounter++;
    document.querySelector('h1').textContent = automaticCounter;
    localStorage.setItem('automaticCounter', automaticCounter);
}
setInterval(automaticCounter, 1000);

document.querySelector('h1').textContent = localStorage.getItem('automaticCounter');