/**
 * @file This is the add-entry JS file written for CMPT276 asn2
 * written on Jun 3rd 2024
 * @copyright ShiYu Feng 2024
 */

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
    let color = document.getElementById("color").value;
    let r = (255 - parseInt(color.slice(0, 2), 16)).toString(16).padStart(2,'0'),
    g = (255 - parseInt(color.slice(2, 4), 16)).toString(16).padStart(2,'0'),
    b = (255 - parseInt(color.slice(4, 6), 16)).toString(16).padStart(2,'0');
    proxy.style.background = "#" + color;
    proxy.style.color = "#" + r + g + b;
    console.log("#" + r + g + b)
}

function setProxyName() {
    let proxy = document.getElementById("rectangle-proxy");
    proxy.innerText = document.getElementById("name").value
}

function getRandom(draws) {
    return Math.floor(Math.random()*draws);
}

function drawRarity() {
    let pull = getRandom(10000);
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
}

function timedLoop(i) {
  setTimeout(function() {
    drawRarity() //  your code here
    if (--i) timedLoop(i);   //  decrement i and call myLoop again if i > 0
  }, 24)
}

// Event Listeners
document.getElementById("roll-rarity").addEventListener('click', function (evt){
    evt.preventDefault()
    timedLoop(24);
})

function init() {
    setProxyName();
    setProxyColor();
    setProxyWidth();
    setProxyHeight();
    let out = document.getElementById("rarity");
    switch (out.value) {
        case "COMMON":
            out.style.color = "#C0C0C0";
            break;
        case "UNCOMMON":
            out.style.color = "#00FF00";
            break;
        case "RARE":
            out.style.color = "#0000FF";
            break;
        case "EPIC":
            out.style.color = "#800080";
            break;
        case "LEGENDARY":
            out.style.color = "#FFD700";
            break;
        case "MYTHICAL":
            out.style.color = "#FF4500";
            break;
        case "DOGE":
            out.style.color = "#D69420";
            break;
    }

}

if (document.getElementById("section").innerText !== "ADD") {
    init();
}