// Emoji Cards Memory Game Script

const cardEmojis = ['😀', '😅', '😎', '🥳', '😜', '😇', '😡', '🤠']; 
const cardDeck = [...cardEmojis, ...cardEmojis];
let firstCard = null;
let secondCard = null;
let hasFlippedCard = false;
let lockBoard = false;
let score = 0;
let difficulty = 1; // 1: Easy, 2: Medium, 3: Hard

// Shuffle function to randomize card deck
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Initialize game
function initGame() {
    shuffle(cardDeck);
    const board = document.getElementById('game-board');
    board.innerHTML = '';
    cardDeck.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.index = index;
        card.innerText = '❓';
        card.addEventListener('click', flipCard);
        board.appendChild(card);
    });
}

// Card flip function
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.innerText = cardDeck[this.dataset.index];
    this.classList.add('flipped');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

// Check for matches
function checkForMatch() {
    let isMatch = firstCard.innerText === secondCard.innerText;
    isMatch ? disableCards() : unflipCards();
}

// Disable matched cards
function disableCards() {
    score += 1;
    resetBoard();
    alert(`Score: ${score}`);
}

// Unflip cards if not matched
function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.innerText = '❓';
        secondCard.innerText = '❓';
        resetBoard();
    }, 1500);
}

// Reset board variables
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// Start the game
initGame();

// Difficulty settings (not implemented)
function setDifficulty(level) {
    difficulty = level;
    // Adjust card pairs based on difficulty level
    // Add logic here to change the number of pairs
}
