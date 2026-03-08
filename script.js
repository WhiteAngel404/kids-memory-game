// kids-memory-game: Game Logic for Memory Game

class MemoryGame {
    constructor(difficulty) {
        this.cards = this.createCards();
        this.shuffledCards = this.shuffleCards(this.cards);
        this.score = 0;
        this.difficulty = difficulty;
        this.matchedCards = [];
        this.selectedCards = [];
    }

    createCards() {
        const cardValues = []; 
        const cardCount = this.getCardCount();
        for (let i = 1; i <= cardCount; i++) {
            cardValues.push(i);
            cardValues.push(i); // Duplicate each card value
        }
        return cardValues;
    }

    getCardCount() {
        switch (this.difficulty) {
            case 'easy': return 6;
            case 'medium': return 12;
            case 'hard': return 18;
            default: return 6;
        }
    }

    shuffleCards(cards) {
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }
        return cards;
    }

    selectCard(cardIndex) {
        if (this.selectedCards.length < 2 && !this.selectedCards.includes(cardIndex)) {
            this.selectedCards.push(cardIndex);
            this.updateScore();
            if (this.selectedCards.length === 2) {
                this.checkForMatch();
            }
        }
    }

    updateScore() {
        this.score++; // Increase score when a pair is selected
    }

    checkForMatch() {
        const [firstCard, secondCard] = this.selectedCards;
        if (this.shuffledCards[firstCard] === this.shuffledCards[secondCard]) {
            this.matchedCards.push(firstCard, secondCard);
        }
        this.selectedCards = []; // Reset selected cards
    }

    getScore() {
        return this.score;
    }

    allCardsMatched() {
        return this.matchedCards.length === this.shuffledCards.length;
    }
}

// Example usage:
const game = new MemoryGame('medium');

// Let's assume the player selects the first card and second card
// game.selectCard(0);
// game.selectCard(1);