import './game-style.css/';

let level = localStorage.getItem('level');
let totalCards = null;
const board = document.querySelector('.carts');
const suits = ['chervi', 'bubi', 'kresti', 'piki'];
const ranks = ['6', '7', '8', '9', '10', 'Q', 'K', 'J', 'A'];
let selectedCards = [];
let gameIsStart = false;
let timer = document.querySelector('.time-time');
let modalWrapper = document.querySelector('.modalWrapper');

switch (level) {
    case 'easy':
        totalCards = 6;
        break;

    case 'medium':
        totalCards = 12;
        break;

    case 'hard':
        totalCards = 18;
        break;

    default:
        window.location = '/index.html';
        break;
}

const onCardClick = (elem, suit, rank, hiddenImg) => {
    elem.removeChild(hiddenImg);
    elem.classList.add('active');

    const cardSuit = document.createElement('img');
    cardSuit.classList.add('suit');
    cardSuit.src = `static/img/${suit}.svg`;
    cardSuit.alt = 'cardSuit';

    for (let index = 0; index < 2; index++) {
        const miniCardSuit = document.createElement('img');
        miniCardSuit.classList.add('suit-mini');
        miniCardSuit.src = `static/img/${suit}.svg`;
        miniCardSuit.alt = 'cardSuitMini';

        const rankNumber = document.createElement('div');
        rankNumber.textContent = rank;

        const cardTopRankContainer = document.createElement('div');
        const cardBottomRankContainer = document.createElement('div');

        if (index === 0) {
            cardTopRankContainer.classList.add('card-top-rank-container');
            cardTopRankContainer.append(rankNumber, miniCardSuit);
        } else {
            cardBottomRankContainer.classList.add('card-bottom-rank-container');
            cardBottomRankContainer.append(rankNumber, miniCardSuit);
        }

        elem.append(
            index === 0 ? cardTopRankContainer : cardBottomRankContainer,
            cardSuit,
        );
    }

    if (gameIsStart) {
        selectedCards = [...selectedCards, { suit, rank }];
        checkIsGameFinish();
    }
};

// функция таймера
const Timer = () => {
    let minutesAndSeconds = timer.innerHTML.split('.');

    if (parseInt(minutesAndSeconds[1]) >= 60) {
        minutesAndSeconds[0] = `${
            parseInt(minutesAndSeconds[0]) < 9 ? '0' : ''
        }${parseInt(minutesAndSeconds[0]) + 1}`;
        minutesAndSeconds[1] = '00';
    } else {
        minutesAndSeconds[1] = `${
            parseInt(minutesAndSeconds[1]) < 9 ? '0' : ''
        }${parseInt(minutesAndSeconds[1]) + 1}`;
    }

    timer.innerHTML = minutesAndSeconds.join('.');
};

// функция запуска таймера
const startTimer = () => {
    window.TimerId = window.setInterval(Timer, 1000);
};

const startGame = () => {
    if (gameIsStart) {
        modalWrapper.replaceChildren();
        gameIsStart = false;
        selectedCards = [];
        board.replaceChildren();
        window.clearInterval(window.TimerId);
        timer.innerHTML = '00.00';
    }

    setTimeout(() => {
        startTimer();
    }, 5000);

    const numPairs = totalCards / 2;

    for (let index = 0; index < numPairs; index++) {
        const suit = suits[Math.floor(Math.random() * suits.length)];
        const rank = ranks[Math.floor(Math.random() * ranks.length)];

        for (let index = 0; index < 2; index++) {
            const card = document.createElement('p');
            card.classList.add('card-background');

            const hiddenImg = document.createElement('img');
            hiddenImg.classList.add('cart');
            hiddenImg.src = 'dist/static/img/rubashka.jpg';
            hiddenImg.alt = 'rubashka';

            card.addEventListener('click', () =>
                onCardClick(card, suit, rank, hiddenImg),
            );

            card.append(hiddenImg);
            board.append(card);

            onCardClick(card, suit, rank, hiddenImg);

            setTimeout(() => {
                card.replaceChildren(hiddenImg);
                card.classList.remove('active');
                gameIsStart = true;
            }, 5000);
        }
    }

    // Перетасовка карт
    for (let index = board.children.length; index >= 0; index--) {
        board.appendChild(board.children[(Math.random() * index) | 0]);
    }
};

startGame();

// Кнока рестарта игры
document.getElementById('start-over').addEventListener('click', () => {
    board.replaceChildren();
    startGame();
    window.clearInterval(window.TimerId);
    gameIsStart = false;
    selectedCards = [];
    timer.innerHTML = '00.00';
});

const checkIsGameFinish = () => {
    if (selectedCards.length >= 2 && gameIsStart) {
        if (
            selectedCards[0].suit === selectedCards[1].suit &&
            selectedCards[0].rank === selectedCards[1].rank
        ) {
            window.clearInterval(window.TimerId);
            modalWrapper.innerHTML += `
                <div class="modal-bg">
                    <div class="modal">
                        <img src="/static/img/win.png" alt="win">
                        <h2 class="modal-title">Вы выиграли!</h2>
                        <p class="timer-title">Затраченное время:</p>
                        <h1 class="timer-count">${timer.innerHTML}</h1>
                        <button class="btn playAgain">Играть снова</button>
                    </div>
                </div>
            `;
        } else {
            window.clearInterval(window.TimerId);
            modalWrapper.innerHTML += `
                <div class="modal-bg">
                    <div class="modal">
                        <img src="/static/img/lose.png" alt="lose">
                        <h2 class="modal-title">Вы проиграли!</h2>
                        <p class="timer-title">Затраченное время:</p>
                        <h1 class="timer-count">${timer.innerHTML}</h1>
                        <button class="btn playAgain">Играть снова</button>
                    </div>
                </div>
            `;
        }
        document
            .querySelector('.playAgain')
            .addEventListener('click', () => startGame());
    }
};
