const car = document.getElementById('myCar');
const gameArea = document.querySelector('.gameArea');
let score = 0;
let carPos = 175;

// Movement
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && carPos > 10) carPos -= 15;
    if (e.key === 'ArrowRight' && carPos < 340) carPos += 15;
    car.style.left = carPos + 'px';
});

// Create Enemy Cars
function createEnemy() {
    let enemy = document.createElement('div');
    enemy.classList.add('enemy');
    enemy.style.left = Math.floor(Math.random() * 340) + 'px';
    enemy.style.top = '-100px';
    gameArea.appendChild(enemy);

    let moveEnemy = setInterval(() => {
        let top = parseInt(enemy.style.top);
        enemy.style.top = (top + 5) + 'px';

        // Score Update
        if (top > window.innerHeight) {
            clearInterval(moveEnemy);
            gameArea.removeChild(enemy);
            score++;
            document.getElementById('gameScore').innerText = "Score: " + score;
        }

        // Collision Detection (Game Over)
        let carRect = car.getBoundingClientRect();
        let enemyRect = enemy.getBoundingClientRect();
        if (!(carRect.right < enemyRect.left || carRect.left > enemyRect.right || carRect.bottom < enemyRect.top || carRect.top > enemyRect.bottom)) {
            alert("Game Over! Score: " + score);
            location.reload();
        }
    }, 20);
}
setInterval(createEnemy, 1500);