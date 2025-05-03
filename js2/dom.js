let example = document.querySelector(".example");
let allData = [];
let currentIndex = 0; // индекс начала текущего среза

function get(data) {
    allData = data;
    render();
}

function render() {
    example.innerHTML = "";
    
    // Срез данных для отображения только 3 элементов
    const dataToShow = allData.slice(currentIndex, currentIndex + 3);
    
    dataToShow.forEach(el => {
        let box = document.createElement("div");
        box.classList.add("box");
        box.innerHTML = `
            <img src="${el.img}" class="img">
            <p>${el.name}</p>
            <p class="price"><b>$${el.price.toFixed(2)}</b></p>
        `;
        example.append(box);
    });
}

function moveLeft() {
    if (currentIndex > 0) {
        currentIndex -= 3; 
        render();
    }
}

function moveRight() {
    if (currentIndex + 3 < allData.length) {
        currentIndex += 3; 
        render();
    }
}

document.querySelector(".left").addEventListener("click", moveLeft);
document.querySelector(".right").addEventListener("click", moveRight);

export default get;
