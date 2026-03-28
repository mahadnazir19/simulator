const car = document.getElementById('myCar');
const gameArea = document.querySelector('.gameArea');
const leftBtn = document.getElementById('leftBtn');
const rightBtn = document.getElementById('rightBtn');

let score = 0;
let carPos = 175;

// Function to Move Car
function moveLeft() { if (carPos > 10) { carPos -= 30; car.style.left = carPos + 'px'; } }
function moveRight() { if (carPos < 340) { carPos += 30; car.style.left = carPos + 'px'; } }

// Keyboard Controls
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') moveLeft();
    if (e.key === 'ArrowRight') moveRight();
});

// Mobile Touch Controls
leftBtn.addEventListener('touchstart', (e) => { e.preventDefault(); moveLeft(); });
rightBtn.addEventListener('touchstart', (e) => { e.preventDefault(); moveRight(); });

// Enemy Cars & Collision
function createEnemy() {
    let enemy = document.createElement('div');
    enemy.classList.add('enemy');
    enemy.style.left = Math.floor(Math.random() * (gameArea.clientWidth - 60)) + 'px';
    enemy.style.top = '-100px';
    gameArea.appendChild(enemy);

    let moveEnemy = setInterval(() => {
        let top = parseInt(enemy.style.top);
        enemy.style.top = (top + 7) + 'px';

        if (top > window.innerHeight) {
            clearInterval(moveEnemy);
            gameArea.removeChild(enemy);
            score++;
            document.getElementById('gameScore').innerText = "Score: " + score;
        }

        let carRect = car.getBoundingClientRect();
        let enemyRect = enemy.getBoundingClientRect();
        if (!(carRect.right < enemyRect.left || carRect.left > enemyRect.right || carRect.bottom < enemyRect.top || carRect.top > enemyRect.bottom)) {
            alert("Game Over! Score: " + score);
            location.reload();
        }
    }, 20);
}
setInterval(createEnemy, 1200);