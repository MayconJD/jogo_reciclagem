let score = 0;
let timeLeft;
let countdownInterval;
let timerInterval;
let lastItemIndex = -1;
let errors = 0; // Contador de erros
let timeIncrement; // Incremento de tempo baseado na dificuldade
let selectedDifficulty = 'easy'; // Dificuldade padrão
const items = [
    { name: "Folha de Papel", type: "papel" },
    { name: "Caderno Velho", type: "papel" },
    { name: "Revista", type: "papel" },
    { name: "Jornal", type: "papel" },
    { name: "Caixa de Papelão", type: "papel" },
    { name: "Envelope", type: "papel" },
    { name: "Papel de Presente", type: "papel" },
    { name: "Rascunho de Papel", type: "papel" },
    { name: "Papel Higiênico (usado)", type: "papel" },
    { name: "Cartão de Visita", type: "papel" },
    { name: "Papel Sulfite", type: "papel" },
    { name: "Papel de Impressão", type: "papel" },
    { name: "Papel de Caderno", type: "papel" },
    { name: "Papel de Cartão", type: "papel" },
    { name: "Papel de Embalagem", type: "papel" },

    { name: "Garrafa PET", type: "plastico" },
    { name: "Saco Plástico", type: "plastico" },
    { name: "Tampa de Garrafa", type: "plastico" },
    { name: "Embalagem de Iogurte", type: "plastico" },
    { name: "Embalagem de Refrigerante", type: "plastico" },
    { name: "Embalagem de Alimento", type: "plastico" },
    { name: "Canudo", type: "plastico" },
    { name: "Balde de Plástico", type: "plastico" },
    { name: "Frasco de Detergente", type: "plastico" },
    { name: "Embalagem de Sabonete Líquido", type: "plastico" },
    { name: "Embalagem de Shampoo", type: "plastico" },
    { name: "Embalagem de Condicionador", type: "plastico" },
    { name: "Embalagem de Creme Dental", type: "plastico" },
    { name: "Embalagem de Produtos de Limpeza", type: "plastico" },
    { name: "Embalagem de Sorvete", type: "plastico" },

    { name: "Copo Quebrado", type: "vidro" },
    { name: "Garrafa de Vidro", type: "vidro" },
    { name: "Frasco de Conserva", type: "vidro" },
    { name: "Vidro de Perfume", type: "vidro" },
    { name: "Frasco de Molho", type: "vidro" },
    { name: "Pote de Vidro", type: "vidro" },
    { name: "Copo de Vidro", type: "vidro" },
    { name: "Lata de Vidro", type: "vidro" },
    { name: "Vidro de Azeite", type: "vidro" },
    { name: "Vidro de Vinagre", type: "vidro" },
    { name: "Vidro de Bebida", type: "vidro" },
    { name: "Vidro de Conserva", type: "vidro" },
    { name: "Vidro de Sucos", type: "vidro" },
    { name: "Vidro de Água", type: "vidro" },
    { name: "Vidro de Refrigerante", type: "vidro" },

    { name: "Lata de Refrigerante", type: "metal" },
    { name: "Lata de Cerveja", type: "metal" },
    { name: "Lata de Sopa", type: "metal" },
    { name: "Lata de Alimento", type: "metal" },
    { name: "Lata de Tinta", type: "metal" },
    { name: "Lata de Óleo", type: "metal" },
    { name: "Lata de Conserva", type: "metal" },
    { name: "Tampa de Lata", type: "metal" },
    { name: "Lata de Produtos de Limpeza", type: "metal" },
    { name: "Lata de Bebida", type: "metal" },
    { name: "Lata de Molho", type: "metal" },
    { name: "Lata de Frutas", type: "metal" },
    { name: "Lata de Vegetais", type: "metal" },
    { name: "Lata de Sucos", type: "metal" },
    { name: "Lata de Energético", type: "metal" },

    { name: "Casca de Banana", type: "organico" },
    { name: "Restos de Comida", type: "organico" },
    { name: "Bagaço de Fruta", type: "organico" },
    { name: "Folhas de Verdura", type: "organico" },
    { name: "Cascas de Legumes", type: "organico" },
    { name: "Café Usado", type: "organico" },
    { name: "Chá Usado", type: "organico" },
    { name: "Restos de Salada", type: "organico" },
    { name: "Papel toalha usado", type: "organico" },
    { name: "Restos de Pão", type: "organico" },
    { name: "Casca de Ovo", type: "organico" },
    { name: "Restos de Carne", type: "organico" },
    { name: "Restos de Peixe", type: "organico" },
    { name: "Restos de Arroz", type: "organico" },
    { name: "Restos de Feijão", type: "organico" }
];

function selectDifficulty(difficulty) {
    selectedDifficulty = difficulty;
    const buttons = document.querySelectorAll('.difficulty-button');
    buttons.forEach(button => {
        button.classList.remove('selected'); // Remove a seleção de todos os botões
    });
    document.querySelector(`.difficulty-button:contains('${difficulty}')`).classList.add('selected'); // Adiciona a seleção ao botão clicado
}

function startGame() {
    setGameDifficulty(selectedDifficulty); // Usa a dificuldade selecionada
    
    document.getElementById("start-screen").classList.add("hidden");
    document.getElementById("play-screen").classList.remove("hidden");
    startCountdown();
}

function setGameDifficulty(difficulty) {
    if (difficulty === "easy") {
        timeLeft = 30;
        timeIncrement = 5;
    } else if (difficulty === "medium") {
        timeLeft = 20;
        timeIncrement = 3;
    } else if (difficulty === "hard") {
        timeLeft = 10;
        timeIncrement = 1;
    }
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
    document.getElementById("timer").textContent = `Tempo: ${timeLeft}s`;
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

function showRecyclingInfo() {
    document.getElementById("start-screen").classList.add("hidden");
    document.getElementById("play-screen").classList.add("hidden");
    document.getElementById("end-screen").classList.add("hidden");
    document.getElementById("recycling-info").classList.remove("hidden");
}

function goBack() {
    document.getElementById("recycling-info").classList.add("hidden");
    document.getElementById("start-screen").classList.remove("hidden");
}
document.querySelectorAll(".bin").forEach(bin => {
    bin.addEventListener("click", (event) => {
        const selectedBin = event.currentTarget.dataset.type;
        const currentItem = document.getElementById("item").dataset.type;
        if (selectedBin === currentItem) {
            score++;
            timeLeft += timeIncrement; // Aumenta o tempo com base na dificuldade
            document.getElementById("score").textContent = `Pontuação: ${score}`;
            showFeedback(true);
        } else {
            errors++;
            showFeedback(false);
            showErrorCount();
            if (errors >= 3) {
                endGame();
            }
        }
        generateItem();
    });
});

function showErrorCount() {
    const errorMessage = document.getElementById("error-message");
    errorMessage.textContent = `Erros: ${errors}`;
    errorMessage.classList.remove("hidden");
    setTimeout(() => errorMessage.textContent = "", 2000);
}

function endGame() {
    clearInterval(timerInterval);
    document.getElementById("play-screen").classList.add("hidden");
    document.getElementById("end-screen").classList.remove("hidden");
    document.getElementById("final-score").textContent = `Sua pontuação: ${score}`;
}

function resetGame() {
    score = 0;
    errors = 0; // Reinicia o contador de erros
    document.getElementById("error-message").classList.add("hidden"); // Oculta a mensagem de erro
    document.getElementById("countdown").classList.remove("hidden");
    document.getElementById("end-screen").classList.add("hidden");
    document.getElementById("start-screen").classList.remove("hidden");
}