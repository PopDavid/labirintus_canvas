const c = document.getElementById('canvas');
const ctx = c.getContext('2d');
const maze = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 1, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 1, 0, 1, 0, 0, 0, 1],
    [1, 1, 0, 1, 1, 1, 0, 1, 1, 1],
    [1, 1, 0, 0, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]
let score = 0;
let time_started = false;
let can_win = false;

const apple_pic = document.getElementById('apple');

cat1 = document.getElementById('cat1');
cat2 = document.getElementById('cat2');
portal = document.getElementById('portal');
bush = document.getElementById('bush');

let apple = {
    x: 0,
    y: -10
}
window.onload = () => {
    drawMaze();
    drawPlayer();
    draw_apple();
    do {
        apple.x = Math.floor(Math.random() * maze.length);
        apple.y = Math.floor(Math.random() * maze.length);
    } while (maze[apple.y][apple.x] === 1 || (apple.x === player.x && apple.y === player.y));
}
const tileSize = c.width /maze.length;

let player = {
    x: 0,
    y: 1,
    img: cat1,
    oriant: 'right'
}


function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(updateTime, 10); // Update every second
}

function updateTime() {
    elapsedTime = (Date.now() - startTime) / 1000; 
    document.getElementById('timer').innerText = elapsedTime;
}

function stopTimer() {
    clearInterval(timerInterval);
}

// Start the timer


reachApple = () => {
    do {
        apple.x = Math.floor(Math.random() * maze.length);
        apple.y = Math.floor(Math.random() * maze.length);
    } while (maze[apple.y][apple.x] === 1 || (apple.x === player.x && apple.y === player.y));
    console.log(apple.x, apple.y);
    score++;
    document.getElementById('score').innerText = score;
    can_win = score > 9;
}


drawPlayer = () => {
    // ctx.scale(flip ? 0 : 1, 180);

    ctx.save();
    if (player.oriant === 'left') {
        console.log('flip');
        ctx.translate(player.x * tileSize + 25, player.y * tileSize + 25);
        ctx.scale(-1, 1);
        ctx.translate(-(player.x * tileSize + 25), -(player.y * tileSize + 25));
    }
    ctx.drawImage(player.img, player.x * tileSize, player.y * tileSize, tileSize, tileSize);
    ctx.restore();
    player.img = player.img === cat1 ? cat2 : cat1;
}

drawMaze = () => {
    for (let i = 0; i < maze.length; i++) {
        for (let j = 0; j < maze[i].length; j++) {
            if (maze[i][j] === 1) {
                ctx.drawImage(bush, j * tileSize, i * tileSize, tileSize, tileSize);

            }
        }
    }
    if (can_win) {
       ctx.drawImage(portal, 9 * tileSize, 8 * tileSize, tileSize, tileSize);
    }
    ctx.stroke();
}

draw_apple = () => {
    ctx.drawImage(apple_pic, apple.x * tileSize, apple.y * tileSize, tileSize, tileSize);
}

window.addEventListener('keydown', (e) => {
    
    switch (e.key) {
        case 'w':
        case 'ArrowUp':
            if (maze[player.y - 1][player.x] === 0) {
                player.y -= 1;
            }
            break;
        case 's':
        case 'ArrowDown':
            if (maze[player.y + 1][player.x] === 0) {
                player.y += 1;
            }
            break;
        case 'a':
        case 'ArrowLeft':
            if (maze[player.y][player.x - 1] === 0 ) {
                player.x -= 1;
            }
            player.oriant = 'left';
            break;
        case 'd':
        case 'ArrowRight':
            if (!time_started) {
                startTimer();
                time_started = true;
            }
            if ((can_win && player.x === 8 && player.y === 8)){
                alert('Time: ' + elapsedTime + 's\ns/Apple: ' + Math.floor(elapsedTime/score*10)/10 + ' s');
                location.reload();
            }
            if (maze[player.y][player.x + 1] === 0 ) {
                player.x += 1;
            }
            player.oriant = 'right';
            break;
    }
    if (player.x === apple.x && player.y === apple.y) {
        reachApple();
    }
    ctx.clearRect(0, 0, c.width, c.height);
    drawMaze();
    draw_apple();
    drawPlayer();
});