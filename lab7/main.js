//fazer o query selector antes das funcoes

// 1.Mouseover
document.getElementById('hover-text').addEventListener('mouseenter', mouseEnter);
document.getElementById('hover-text').addEventListener('mouseleave', mouseLeave);

function mouseEnter(){
    document.getElementById('hover-text').textContent = 'Obrigado por passares';
}

function mouseLeave(){
    document.getElementById('hover-text').textContent = 'Passa por aqui';
}

//2.
 const colorDisplay = document.getElementById('color-display');

 function changeColorText(color) {
     colorDisplay.style .color = color;
 }

 document.getElementById('red-btn').addEventListener('click', function() {
     changeColorText('Red');
 });

 document.getElementById('green-btn').addEventListener('click', function() {
     changeColorText('Green');
 });

 document.getElementById('blue-btn').addEventListener('click', function() {
     changeColorText('Blue');
 });


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
//4.

const backGroundColorInput = document.getElementById("background-color-input");
const submitButton = document.getElementById("submit-color");

function changeBackgroundColor() {
    document.body.style.backgroundColor = backGroundColorInput.value;
}

submitButton.addEventListener("click", changeBackgroundColor);

//5. COUNT
let count = 0;
const countDisplay = document.getElementById("count");
const incrementButton = document.getElementById("incrementButton");

incrementButton.addEventListener("click", function () {
    count++;
    countDisplay.innerText = count;
});


