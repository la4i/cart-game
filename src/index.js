const suits = ['черви', 'бубны', 'крести', 'пики'];
const ranks = ['6', '7', '8', '9', '10', 'Q', 'K', 'J', 'A'];

const levels = {
    easy: 6,
    medium: 12,
    hard: 18,
};

let selectedLevel = null;
let level = 'easy';
let cards = [];

function startGame() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';

    // Cоздание карточек
    for (let i = 0; i < totalCards; i++) {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.dataset.image = cardImages[i];
        cardElement.addEventListener('click', handleCardClick);
        gameBoard.appendChild(cardElement);
    }

    cards = document.querySelectorAll('.card');
}

// Функция для генерации карточек
function generateCards(level) {
    const numPairs = levels[level] / 2;
    cards = [];

    // Генерация карточек
    for (let i = 0; i < numPairs; i++) {
        const suit = suits[Math.floor(Math.random() * suits.length)];
        const rank = ranks[Math.floor(Math.random() * ranks.length)];

        const card1 = { suit, rank };
        const card2 = { suit, rank };

        cards.push(card1);
        cards.push(card2);
    }

    // Перетасовка карточек
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
}

// Функция для показа карт игроку
async function showCards() {
    for (let card of cards) {
        console.log(`Карта: ${card.suit} ${card.rank}`);
        await new Promise((resolve) => setTimeout(resolve, 5000));
    }
}

// Функция для переворота карт рубашкой вверх
function flipCards() {
    for (let card of cards) {
        card.face = 'рубашка';
    }
}
// Функция для отображения результатов игры
function showResults(message) {
    alert(message);
}
// Функция для предложения сыграть снова
function playAgain() {
    const response = confirm('Хотите сыграть снова?');
    if (response) {
        // Генерация новых карт и начало игры заново
        generateCards(level);
        showCards();
        flipCards();
    } else {
        // Игра завершена
        console.log('Игра завершена!');
    }
}

// Функция для обработки клика на карточку
function handleClick(cardIndex) {
    const card = cards[cardIndex];
    card.face = 'лицо';

    // Проверка на совпадение пары
    const flippedCards = cards.filter((card) => card.face === 'лицо');
    if (
        flippedCards.length === 2 &&
        flippedCards[0].rank === flippedCards[1].rank &&
        flippedCards[0].suit === flippedCards[1].suit
    ) {
        // Если пара совпала, продолжаем игру
        showResults('Пара совпала!');
    } else if (flippedCards.length === 2) {
        // Если пара не совпала, игра заканчивается
        showResults('Игра окончена!');
        playAgain();
    }

    // Проверка на завершение игры
    const matchedCards = cards.filter((card) => card.face === 'лицо');
    if (matchedCards.length === cards.length) {
        // Игрок победил
        showResults('Вы победили!');
        playAgain();
    }
}

function generateCardImages(totalCards) {
    const images = [
        'image1.jpg',
        'image2.jpg',
        'image3.jpg',
        'image4.jpg',
        'image5.jpg',
        'image6.jpg',
        'image7.jpg',
        'image8.jpg',
        'image9.jpg',
    ];

    let cardImages = [];

    for (let i = 0; i < totalCards / 2; i++) {
        const image = images[i];
        cardImages.push(image, image);
    }

    return cardImages;
}

document
    .getElementById('easy')
    .addEventListener('click', () => selectLevel('easy'));
document
    .getElementById('medium')
    .addEventListener('click', () => selectLevel('medium'));
document
    .getElementById('hard')
    .addEventListener('click', () => selectLevel('hard'));