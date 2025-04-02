const c = document.getElementById('canvas');
const ctx = c.getContext('2d');
class Maze {
    constructor (n) {
        this.maze = this.Generate_maze(n, n)
        this.easyer_make(n)
        // console.log(this.maze)
    }
    Generate_maze(width, height){
        let vis = [];
        let maze = [];
        let queue = [];
        for(let i = 0;i<height;i++){
            let temp = [];
            let temp2 = [];
            for(let j = 0;j<width;j++){
                temp.push(false);
                temp2.push(false);
            }
            vis.push(temp);
            maze.push(temp2);
        }
        queue.push([1, 1]);
        maze[0][1] = true;
        //kiinduló cella rajzolása
        let tick = 0;
        let lastcell;
        while(queue.length){
            
            tick++;
            let i = Math.floor(Math.random() * (queue.length-1))
            let curr = queue[i];
            const index = queue.indexOf(curr);
            if (index > -1) {
                queue.splice(index, 1);
            }
            try {
                while(vis[curr[0]][curr[1]]){
                    curr = queue[Math.floor(Math.random() * (queue.length-1))];
                    const index = queue.indexOf(curr);
                    if (index > -1) {
                        queue.splice(index, 1);
                    }
                }
            }
            catch {
                console.log(curr, i, queue)
                break;
            }
            

            
            let neighbours = 0;
            if(curr[0]+1 < width-1 && vis[curr[0]+1][curr[1]]){
                neighbours++;
            }
            if(curr[0]-1 > 0 && vis[curr[0]-1][curr[1]]){
                neighbours++;
            }
            if(curr[1]+1 < height-1 && vis[curr[0]][curr[1]+1]){
                neighbours++;
            }
            if(curr[1]-1 > 0 && vis[curr[0]][curr[1]-1]){
                neighbours++;
            }
            
            /*if(curr[0]+1 < width-1 && curr[1]+1 < height-1 && vis[curr[0]+1][curr[1]+1]){
                neighbours++;
            }
            if(curr[0]+1 < width-1 && curr[1]-1 > 0 && vis[curr[0]+1][curr[1]-1]){
                neighbours++;
            }
            if(curr[0]-1 > 0 && curr[1]+1 < height-1 && vis[curr[0]-1][curr[0]+1]){
                neighbours++;
            }
            if(curr[0]-1 > 0 && curr[1]-1 < height-1 && vis[curr[0]-1][curr[1]-1]){
                neighbours++;
            }*/
                           
            if(neighbours <= 1){
                vis[curr[0]][curr[1]] = true;
                maze[curr[0]][curr[1]] = true;
                if(curr[0]+1 < width-1){
                    queue.push([curr[0]+1, curr[1]]);
                }
                if(curr[0]-1 > 0){
                    queue.push([curr[0]-1, curr[1]]);
                }
                if(curr[1]+1 < height-1){
                    queue.push([curr[0], curr[1]+1]);
                }
                if(curr[1]-1 > 0){
                    queue.push([curr[0], curr[1]-1]);
                }
    
                if(curr[0] == width-2){
                    
                    lastcell = curr;
                }
            }
        }
        //utolsó cella (cél) kirajzolása:   
        maze[lastcell[0]][lastcell[1]] = true;  
        maze[0][1] = false
        return maze;
    }

    easyer_make(n) {
        let rem = n
        while (rem) {
            let x = Math.floor(Math.random()*(n-2))+1
            let y = Math.floor(Math.random()*(n-2))+1
            // console.log(x, y, this.maze)
            if (!this.maze[x][y]) {
                this.maze[x][y] = true;
                rem--;
            }
            // else rem++
        }
    }
}
let n = 30; 
let maze = new Maze(n)
let score = 0;
let time_started = 0;
let can_win = 0;
let tileSize = c.width/n;
class Player {
    constructor () {
        this.x = 1;
        this.y = 1
        this.img = cat1;
        this.oriant = 'right'
        this.move_counter = 0
    }
}
let player = new Player


function change_size(Myn) {
    n = Myn;
    console.log(n)
    maze = new Maze(n)
    score = 0;
    time_started = 0;
    can_win = 0;
    tileSize = c.width/n;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMaze();
    drawPlayer();
    draw_apple();
    stopTimer()
    score = 0;
    document.getElementById('score').innerText = score;
    elapsedTime = 0; 
    document.getElementById('timer').innerText = elapsedTime;
    time_started = 0
    do {
        apple.x = Math.floor(Math.random() * n);
        apple.y = Math.floor(Math.random() * n);
    } while (maze.maze[apple.y][apple.x] == false || (apple.x === player.x && apple.y === player.y));
}

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
        apple.x = Math.floor(Math.random() * n);
        apple.y = Math.floor(Math.random() * n);
    } while (maze.maze[apple.y][apple.x] == false || (apple.x === player.x && apple.y === player.y));
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

function reachApple ()  {
    do {
        apple.x = Math.floor(Math.random() * n);
        apple.y = Math.floor(Math.random() * n);
    } while (maze.maze[apple.y][apple.x] == false || (apple.x === player.x && apple.y === player.y));
    score++;
    document.getElementById('score').innerText = score;
    can_win = score > 9;
}

function drawPlayer () {
    // ctx.scale(flip ? 0 : 1, 180);

    if (player.oriant === 'left') {
        ctx.drawImage(player.img, player.x * tileSize, player.y * tileSize, tileSize, tileSize);     
    }
    else {
        ctx.drawImage(player.img, player.x * tileSize, player.y * tileSize, tileSize, tileSize);     
    }
    player.img = player.img === cat1 ? cat2 : cat1;
}

function drawMaze() {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (maze.maze[i][j] == false) {
                ctx.drawImage(bush, j * tileSize, i * tileSize, tileSize, tileSize);
            }
        }
    }
    if (can_win) {
       ctx.drawImage(portal, tileSize, tileSize, tileSize, tileSize);
    }
    ctx.stroke();
}

function draw_apple () {
    ctx.drawImage(apple_pic, apple.x * tileSize, apple.y * tileSize, tileSize, tileSize);
}

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w':
        case 'ArrowUp':
            if (maze.maze[player.y - 1][player.x] == true) {
                player.y -= 1;
                player.move_counter++;
                document.getElementById('move_counter').innerText = player.move_counter
            }
            break;
        case 's':
        case 'ArrowDown':
            if (maze.maze[player.y + 1][player.x] == true) {
                player.y += 1;
                player.move_counter++;
                document.getElementById('move_counter').innerText = player.move_counter
            }
            break;
        case 'a':
        case 'ArrowLeft':
            if (maze.maze[player.y][player.x - 1] == true ) {
                player.x -= 1;
                player.move_counter++;
                document.getElementById('move_counter').innerText = player.move_counter
            }
            player.oriant = 'left';
            break;
        case 'd':
        case 'ArrowRight':
            if (!time_started) {
                startTimer();
                time_started = 1;
            }
            
            if (maze.maze[player.y][player.x + 1] == true ) {
                player.x += 1;
                player.move_counter++;
                document.getElementById('move_counter').innerText = player.move_counter
            }
            player.oriant = 'right';
            break;
    }
    if (player.x === apple.x && player.y === apple.y) {
        reachApple();
    }
    if (can_win && player.x === 1 && player.y === 1){
        alert('Time: ' + elapsedTime + 's\ns/Apple: ' + Math.floor(elapsedTime/score*10)/10 + ' s\nMove/second' + Math.floor(player.move_counter/elapsedTime*10)/10);
        location.reload();
    }
    ctx.clearRect(0, 0, c.width, c.height);
    drawMaze();
    draw_apple();
    drawPlayer();
});

document.getElementById('easy_BTN').addEventListener('click', () => change_size(50))
document.getElementById('medium_BTN').addEventListener('click', () => change_size(70))
document.getElementById('hard_BTN').addEventListener('click', () => change_size(100))
document.getElementById('custom_BTN').addEventListener('click', (e) => change_size(document.getElementById('input1').value), true)
