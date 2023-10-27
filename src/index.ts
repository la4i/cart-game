import { selectLevel } from '../functiontest';
import '../static/css/style.css';

export let selectedLevel: string | null = null;
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

let easy = document.getElementById('easy');
let medium = document.getElementById('medium');
let hard = document.getElementById('hard');

if (easy !== null && medium !== null && hard !== null) {
    easy.addEventListener('click', () => {
        selectedLevel = 'easy';
        totalCards = selectLevel('easy');
    });

    medium.addEventListener('click', () => {
        selectedLevel = 'medium';
        totalCards = selectLevel('medium');
    });

    hard.addEventListener('click', () => {
        selectedLevel = 'hard';
        totalCards = selectLevel('hard');
    });
}
