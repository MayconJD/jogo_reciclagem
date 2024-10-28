let score = 0;
let timeLeft = 30;
let countdownInterval;
let timerInterval;
let lastItemIndex = -1;
const items = [
    { name: "Folha de Papel", type: "papel" },
    { name: "Garrafa PET", type: "plastico" },
    { name: "Copo Quebrado", type: "vidro" },
    { name: "Casca de Banana", type: "organico" },
    { name: "Lata de Refrigerante", type: "metal" }
];

function startGame() {
    document.getElementById("start-screen").classList.add("hidden");
    document.getElementById("play-screen").classList.remove("hidden");
    startCountdown();
}

function startCountdown() {
    let count = 3;
    document.getElementById("countdown").textContent = count;
    countdownInterval = setInterval(() => {
        count--;
        document.getElementById("countdown").textContent = count;
        if (count <= 0) {
            clearInterval(countdownInterval);
            document.getElementById("countdown").classList.add("hidden");
            startTimer();
            generateItem();
        }
    }, 1000);
}

function startTimer() {
    document.getElementById("timer").textContent = "Tempo: 30s";
    document.getElementById("score").textContent = "Pontuação: 0";
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").textContent = `Tempo: ${timeLeft}s`;
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function generateItem() {
    let newItemIndex;
    do {
        newItemIndex = Math.floor(Math.random() * items.length);
    } while (newItemIndex === lastItemIndex);

    lastItemIndex = newItemIndex;
    const randomItem = items[newItemIndex];
    document.getElementById("item").textContent = randomItem.name;
    document.getElementById("item").dataset.type = randomItem.type;
}

function showFeedback(isCorrect) {
    const feedbackMessage = document.getElementById("feedback-message");
    feedbackMessage.textContent = isCorrect ? "Correto!" : "Incorreto!";
    feedbackMessage.className = isCorrect ? "correct" : "incorrect";
    setTimeout(() => feedbackMessage.textContent = "", 1000);
}

document.querySelectorAll(".bin").forEach(bin => {
    bin.addEventListener("click", (event) => {
        const selectedBin = event.currentTarget.dataset.type;
        const currentItem = document.getElementById("item").dataset.type;
        if (selectedBin === currentItem) {
            score++;
            document.getElementById("score").textContent = `Pontuação: ${score}`;
            showFeedback(true);
        } else {
            showFeedback(false);
        }
        generateItem();
    });
});

function endGame() {
    clearInterval(timerInterval);
    document.getElementById("play-screen").classList.add("hidden");
    document.getElementById("end-screen").classList.remove("hidden");
    document.getElementById("final-score").textContent = `Sua pontuação: ${score}`;
}

function resetGame() {
    score = 0;
    timeLeft = 30;
    document.getElementById("countdown").classList.remove("hidden");
    document.getElementById("end-screen").classList.add("hidden");
    document.getElementById("start-screen").classList.remove("hidden");
}
