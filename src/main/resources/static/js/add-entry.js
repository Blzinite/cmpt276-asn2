function setProxyWidth() {
    let proxy = document.getElementById("rectangle-proxy");
    proxy.style.width = document.getElementById("width").value + "px";
}

function setProxyHeight() {
    let proxy = document.getElementById("rectangle-proxy");
    proxy.style.height = document.getElementById("height").value + "px";
}

function setProxyColor() {
    let proxy = document.getElementById("rectangle-proxy");
    proxy.style.background = "#" + document.getElementById("color").value;
}

function setProxyName() {
    let proxy = document.getElementById("rectangle-proxy");
    proxy.innerText = document.getElementById("name").value
}

function getRandom() {
    return Math.floor(Math.random()*10000);
}

// Event Listeners
document.getElementById("roll-rarity").addEventListener('click', function (evt){
    evt.preventDefault()
    let pull = getRandom();
    let out = document.getElementById("rarity");
    if (pull <= 1) {
        out.value = "DOGE";
        out.style.color = "#D69420";
    } else if (pull < 10) {
        out.value = "MYTHICAL";
        out.style.color = "#FF4500";
    } else if (pull < 100) {
        out.value = "LEGENDARY";
        out.style.color = "#FFD700";
    } else if (pull < 500) {
        out.value = "EPIC";
        out.style.color = "#800080";
    } else if (pull < 1500) {
        out.value = "RARE";
        out.style.color = "#0000FF";
    } else if (pull < 4000) {
        out.value = "UNCOMMON";
        out.style.color = "#00FF00";
    } else {
        out.value = "COMMON";
        out.style.color = "#C0C0C0";
    }
})

function init() {
    setProxyName();
    setProxyColor();
    setProxyWidth();
    setProxyHeight();
}

if (document.getElementById("section").innerText !== "ADD") {
    init();
}