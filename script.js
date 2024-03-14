const menu = document.getElementById("menu"); // Linha 46 index.html
const cartBtn = document.getElementById("cart-btn"); // Linha 298 index.html
const cartModal = document.getElementById("cart-modal"); // Linha 265 index.html
const cartItemsContainer = document.getElementById("card-items"); // Linha 272 index.html
const cartTotal = document.getElementById("cart-total"); // Linha 275 index.html
const checkoutBtn = document.getElementById("checkout-btn"); // Linha 285 index.html
const closeModalBtn = document.getElementById("close-modal-btn"); // Linha 284 index.html
const cartCounter = document.getElementById("cart-count"); // Linha 299 index.html
const addressInput = document.getElementById("address"); // Linha 279 index.html
const addressWarn = document.getElementById("address-warn"); // Linha 280 index.html

let cart = [];

// ABRIR O MODAL DO CARRINHO
cartBtn.addEventListener("click", function(){
    cartModal.style.display = "flex";
});

// FECHAR O MODAL DO CARRINHO AO CLICAR FORA DELE
cartModal.addEventListener("click", function(event){
    if(event.target === cartModal){
        cartModal.style.display = "none";
    }
});

// BOTÃO DE FECHAR O MODAL
closeModalBtn.addEventListener("click", function(){
    cartModal.style.display = "none";
});

// ADICIONANDO PRODUTOS NO CARRINHO
menu.addEventListener("click", function(event){
    //console.log(event.target);

    // Pegando apenas o button aonde tem a classe .add-to-cart-btn nos produtos 
    let parentButton = event.target.closest(".add-to-cart-btn");
    
    // O parentButton devolve o botão inteiro
    if(parentButton){
        const name = parentButton.getAttribute("data-name"); // Pegando o nome do produto
        const price = parseFloat(parentButton.getAttribute("data-price")); // Pegando o preco do produto , o parse tranforma para numero
        
        // Chamando a função para colocar no carrinho
        addToCard(name,price);

    }
});

// FUNÇÃO PARA ADCIONAR NO CARRINHO
function addToCard(name, price){

    // Verificando para que esse item não seja duplicado
    const existingItem = cart.find(item => item.name === name) // O (FIND) e um metodo que vai percorrer toda a lista

    if(existingItem){
        // Se o item ja existi ele aumenta a quantidade + 1
        console.log(existingItem);
        return;
        // PAROU 31:27
    }

    cart.push({
        name,
        price,
        quantity: 1,
    });
}