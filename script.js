// Reveal On Scroll Animation
window.addEventListener("scroll", reveal);
document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("page-loaded");
    reveal();
});

function reveal() {
    let reveals = document.querySelectorAll(".reveal");

    for (let i = 0; i < reveals.length; i++) {
        let windowHeight = window.innerHeight;
        let elementTop = reveals[i].getBoundingClientRect().top;
        let revealPoint = 150;

        if (elementTop < windowHeight - revealPoint) {
            reveals[i].classList.add("active");
        }
    }
}

// 🎵 Music Toggle
const music = document.getElementById("themeMusic");
const musicBtn = document.getElementById("musicToggle");
const owl = document.getElementById("owlCourier");
const houseButton = document.getElementById("houseButton");
const nameInput = document.getElementById("wizardName");
const heroScroll = document.getElementById("heroScroll");
const heroScrollResult = document.getElementById("heroScrollResult");
const gameSection = document.getElementById("magicGame");
const tryBtn = document.getElementById("wannaTryBtn");

let isPlaying = false;
let isDelivering = false;
const houses = [
    { name: "Gryffindor", className: "gryffindor" },
    { name: "Slytherin", className: "slytherin" },
    { name: "Ravenclaw", className: "ravenclaw" },
    { name: "Hufflepuff", className: "hufflepuff" }
];

musicBtn.addEventListener("click", () => {
    if (!isPlaying) {
        music.play();
        musicBtn.textContent = "⏸️";
        isPlaying = true;
    } else {
        music.pause();
        musicBtn.textContent = "🎵";
        isPlaying = false;
    }
});

function resetMagicGame() {
    houseButton.disabled = false;
    houseButton.textContent = "Receive My House";
    nameInput.value = "";
    heroScrollResult.textContent = "Awaiting delivery...";
    heroScrollResult.className = "house-result";
    heroScroll.classList.remove("scroll-arriving", "scroll-open");
    if (gameSection) {
        gameSection.classList.remove("visible");
    }
    if (tryBtn) {
        tryBtn.disabled = false;
        tryBtn.textContent = "Wanna Try?";
    }
}

function startHouseReveal() {
    if (isDelivering) return;
    const name = nameInput.value.trim();
    if (!name) {
        nameInput.classList.add("input-error");
        nameInput.focus();
        return;
    }

    isDelivering = true;
    nameInput.classList.remove("input-error");

    heroScroll.classList.remove("scroll-arriving", "scroll-open");
    heroScrollResult.textContent = "Taking flight...";
    heroScrollResult.className = "house-result";

    owl.classList.remove("owl-hop", "owl-flight", "owl-return");
    void owl.offsetWidth;
    owl.classList.add("owl-hop");

    setTimeout(() => {
        owl.classList.remove("owl-hop");
        owl.classList.add("owl-flight");
    }, 600);

    setTimeout(() => {
        owl.classList.remove("owl-flight");
        owl.classList.add("owl-return");
        heroScroll.classList.add("scroll-arriving");
    }, 2000);

    setTimeout(() => {
        heroScroll.classList.add("scroll-open");
        const assigned = houses[Math.floor(Math.random() * houses.length)];
        heroScrollResult.innerHTML = `<span>${name}</span>You belong to ${assigned.name}!`;
        heroScrollResult.classList.add(assigned.className);
        isDelivering = false;
        setTimeout(resetMagicGame, 4000);
    }, 3000);
}

houseButton.addEventListener("click", startHouseReveal);
owl.addEventListener("click", startHouseReveal);

nameInput.addEventListener("input", () => {
    nameInput.classList.remove("input-error");
});

nameInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        startHouseReveal();
    }
});

if (tryBtn && gameSection) {
    tryBtn.addEventListener("click", () => {
        if (!gameSection.classList.contains("visible")) {
            gameSection.classList.add("visible");
        }
        gameSection.scrollIntoView({ behavior: "smooth", block: "center" });
        setTimeout(() => nameInput.focus(), 400);
    });
}
const wannaTryBtn = document.getElementById("wannaTryBtn");
const magicGame = document.getElementById("magicGame");
const wizardName = document.getElementById("wizardName");

wannaTryBtn.addEventListener("click", function() {
    magicGame.style.display = "block";  // Show input
    wizardName.focus();                 // Focus cursor in input
});

