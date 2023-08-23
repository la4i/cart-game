import '../static/css/style.css';

let selectedLevel: string | null = null;
export let totalCards: number | null = null;

function startGame() {
    if (selectedLevel) {
        localStorage.setItem('level', selectedLevel);
        window.location.href = '/game.html';
    }
}

let start = document.getElementById('start');

if (start !== null) {

    start.addEventListener('click', startGame);
}


export function selectLevel(level: string | null) {
    selectedLevel = level;

    switch (level) {
        case 'easy':
            totalCards = 6;
            break;

        case 'medium':
            totalCards = 12;
            break;

        default:
            totalCards = 18;
            break;
    }
    
    return totalCards
}

let easy = document.getElementById('easy');
let medium = document.getElementById('medium');
let hard = document.getElementById('hard');

if (easy !== null && medium !== null && hard !== null) { 
    
   
    easy.addEventListener('click', () => selectLevel('easy'));  
    
    medium.addEventListener('click', () => selectLevel('medium'));

    hard.addEventListener('click', () => selectLevel('hard'));
}


