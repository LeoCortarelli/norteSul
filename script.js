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
    updateCartModal();
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
        existingItem.quantity += 1;
    }else{
        cart.push({
            name,
            price,
            quantity: 1,
        });
    }

    updateCartModal();
}


// ATUALIZA CARRINHO
function updateCartModal(){
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const cartItemElement = document.createElement("div"); // Adcionando uma div
        cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col") // Estilizando a div

        cartItemElement.innerHTML = `
            <div class="flex items-center justify-between">
                <div>
                    <p class="font-medium">${item.name}</p>
                    <p>Qtd: ${item.quantity}</p>
                    <p class="font-medium mt-2">R$ ${item.price.toFixed(2)}</p>
                </div>
                
                <button class="remove-from-cart-btn" data-name="${item.name}"> Remover </button>
            </div>
        `

        total = total + (item.price * item.quantity);

        cartItemsContainer.appendChild(cartItemElement); // Colocando os elemnetos dentro da div
    })

    cartTotal.textContent = total.toLocaleString("pt-BR", { // Colocando em formato portugues brasil
        style: "currency",
        currency: "BRL"
    })

    cartCounter.innerHTML = cart.length; // Muda o numero da quantidade de coisas no carrinho
}


// REMOVER O ITEM DO CARRINHO
cartItemsContainer.addEventListener("click", function(event){ // parou no 53:29
    if(event.target.classList.contains("remove-from-cart-btn")){
        const name = event.target.getAttribute("data-name");

        removeItemCart(name);
    }
})

// Função para remover item
function removeItemCart(name){
    const index = cart.findIndex(item => item.name === name); 
    /* findIndex é utilizado para retornar o índice do primeiro elemento em um array 
        que satisfaça uma determinada condição provida por uma função de callback. Se nenhum elemento 
        satisfizer a condição, o método retornará -1. */

    if(index !== -1){
        const item = cart[index];
        if(item.quantity > 1){
            item.quantity = item.quantity - 1;
            updateCartModal();
            return;
        }

        cart.splice(index, 1); // O splice e uma tag que vai remover esse item da minha lista
        updateCartModal(); // Atualisza o visual do carrinho
    }
}

addressInput.addEventListener("input", function(event){
    let inputValue = event.target.value;
});


// Checando o botão de finalizar pedido
checkoutBtn.addEventListener("click", function(){
    
    // Se o seu carrinho estiver vazio ele não vai fazer nada
    if(cart.length === 0){
        return;
    }

    if(addressInput.value === ""){
        addressWarn.classList.remove("hidden"); // Aparece o texto que para digitar novamente
        addressInput.classList.add("border-red-500"); // Deixa a borda do input vermelha
    } // PAROU 1:03:02


});