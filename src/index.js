let selectedLevel = null;

function startGame() {
    if (selectedLevel !== null) {
        localStorage.setItem('level', selectedLevel);
        window.location = '/game.html';
    }
}

document.getElementById('start').addEventListener('click', startGame);

function selectLevel(level) {
    selectedLevel = level;
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
