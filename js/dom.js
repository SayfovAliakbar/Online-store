let all = document.querySelector(".all"); 
let input = document.querySelector(".inputForSearch");
let buttons = document.querySelectorAll(".searchAndButtons button");
let numberOfBuyingThings = document.querySelector(".numberOfBuyingThings");

let infoModal = document.querySelector(".infoModal");
let infoModalClose = document.querySelector(".infoModalClose");

let groceryModal = document.querySelector(".groceryModal");
let groceryAll = document.querySelector(".groceryAll");
let closeGroceryModal = document.querySelector(".closeGroceryModal");
let openGroceryModal = document.querySelector(".openGroceryModal");

let allData = [];
let cart = [];

function get(data) {
    allData = data; 
    render(data);
}

function render(data) {
    all.innerHTML = "";

    data.forEach(el => {
        let box = document.createElement("div");
        box.classList.add("box");
        box.innerHTML = `
            <div>
                <img src="${el.img}" class="img">
                <p>${el.name}</p>
                <p class="price"><b>$${el.price.toFixed(2)}</b></p>
                <button class="btnForBuy">Buy</button>
            </div>
        `;

        let btnForBuy = box.querySelector(".btnForBuy");
        btnForBuy.onclick = () => {
            addToCart(el);
            updateCartCounter();
        }

        let infoImg = box.querySelector(".img");
        let imgInInfoModal = document.querySelector(".imgInInfoModal");
        let infoPrice = document.querySelector(".infoPrice");
        let description = document.querySelector(".description");
        let infoName = document.querySelector(".infoName");
        let infoCompany = document.querySelector(".infoCompany");
        infoImg.onclick = () => {
            infoPrice.innerHTML = "<b>$" + el.price.toFixed(2) + "</b>";
            infoCompany.innerHTML = el.company;
            infoName.innerHTML = el.name;
            description.innerHTML = el.description;
            imgInInfoModal.src = el.img;
            infoModal.showModal();
        }

        all.append(box);
    });
}

function addToCart(product) {
    let existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
}

function updateCartCounter() {
    let totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    numberOfBuyingThings.textContent = totalCount;
}

closeGroceryModal.onclick = () => {
    groceryModal.close();
}

infoModalClose.onclick = () => {
    infoModal.close();
}

openGroceryModal.onclick = () => {
    groceryAll.innerHTML = "";

    let totalSum = 0;

    cart.forEach(item => {
        let cartItem = document.createElement("div");
        cartItem.classList.add("cart");
        cartItem.innerHTML = `
            <img src="${item.img}" class="groceryImg">
            <div class="grNaPr">
                <div>
                    <p class="groceryName">${item.name}</p>
                    <p class="groceryPrice">$${item.price.toFixed(2)}</p>
                    <div class="plusAndMinus">
                        <button class="decreaseBtn">-</button>
                        <p class="groceryNum">${item.quantity}</p>
                        <button class="increaseBtn">+</button>
                    </div>
                </div>
                <button class="deleteGroceryThings">✖️</button>
            </div>
        `;

        cartItem.querySelector(".increaseBtn").onclick = () => {
            item.quantity++;
            updateCartCounter();
            openGroceryModal();
        }

        cartItem.querySelector(".decreaseBtn").onclick = () => {
            if (item.quantity > 1) {
                item.quantity--;
            } else {
                cart = cart.filter(p => p.id !== item.id);
            }
            updateCartCounter();
            openGroceryModal();
        }

        cartItem.querySelector(".deleteGroceryThings").onclick = () => {
            cart = cart.filter(p => p.id !== item.id);
            updateCartCounter();
            openGroceryModal();
        }

        totalSum += item.price * item.quantity;

        groceryAll.append(cartItem);
    });

    let total = document.querySelector(".total");
    total.innerHTML = `<b>$${totalSum.toFixed(2)}</b>`;

    groceryModal.showModal();
};

input.addEventListener("input", () => {
    let filtered = allData.filter(el => 
        el.name.toLowerCase().includes(input.value.toLowerCase())
    );
    render(filtered);
});

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        let company = btn.innerText;

        if (company === "All") {
            render(allData); 
        } else {
            let filtered = allData.filter(el => el.company === company);
            render(filtered);
        }
    });
});

export default get;
