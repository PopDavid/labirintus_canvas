const apple_pic = document.getElementById('apple');
cat1 = document.getElementById('cat1');
cat2 = document.getElementById('cat2');
portal = document.getElementById('portal');
bush = document.getElementById('bush');
x = document.getElementById('x');
const c = document.getElementById('canvas');
const ctx = c.getContext('2d');
class Maze {
    constructor (n) {
        this.maze = this.Generate_maze(n, n)
        this.easyer_make(n)
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
        let tick = 0;
        let lastcell;
        while(queue.length){
            tick++;
            let i = Math.floor(Math.random() * (queue.length-1));
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
        maze[0][1] = false;
        return maze;
    }

    easyer_make(n) {
        let rem = n
        while (rem) {
            let x = Math.floor(Math.random()*(n-2))+1
            let y = Math.floor(Math.random()*(n-2))+1
            if (!this.maze[x][y]) {
                this.maze[x][y] = true;
                rem--;
            }
            // else rem++
        }
    }

    Give_help(length){
        let queue = [];
        let vis = [];
        let parents = [];
        for(let i = 0;i<n;i++){
            let temp = [];
            let temp2 = [];
            for(let j = 0;j<n;j++){
                temp.push(false);
                temp2.push({x: -1, y: -1});
            }
            vis.push(temp);
            parents.push(temp2);
        }
        parents[player.y][player.x] = {x: player.y, y: player.x};

        queue.push([player.y, player.x]);
        vis[player.y][player.x] = true;
        while(queue.length){
            let curr = queue[0];
            let x = curr[0];
            let y = curr[1];
            queue.splice(0, 1);
            if(this.maze[x+1][y] && !vis[x+1][y]){
                queue.push([x+1, y]);
                parents[x+1][y] = {x: x, y: y};
                vis[x+1][y] = true;
            }
            if(this.maze[x-1][y] && !vis[x-1][y]){
                queue.push([x-1, y]);
                parents[x-1][y] = {x: x, y: y};
                vis[x-1][y] = true;
            }
            if(this.maze[x][y+1] && !vis[x][y+1]){
                queue.push([x, y+1]);
                parents[x][y+1] = {x: x, y: y};
                vis[x][y+1] = true;
            }
            if(this.maze[x][y-1] && !vis[x][y-1]){
                queue.push([x, y-1]);
                parents[x][y-1] = {x: x, y: y};
                vis[x][y-1] = true;
            }
        }
        let ans_array = []
        let ans = {x: apple.y,y: apple.x}
        while((parents[ans.x][ans.y].x != player.y || parents[ans.x][ans.y].y != player.x)){
            ans = parents[ans.x][ans.y];
            ans_array.push(ans);
        }
        ans_array = ans_array.reverse();
        let tartok = 0;
        while(tartok < length && ans_array.length-tartok) {
            ans = ans_array[tartok]
            drawTile(ans.x, ans.y, false, x)
            tartok++;
        }
    }
}

class Player {
    constructor () {
        this.x = 1;
        this.y = 1
        this.img = cat1;
        this.oriant = 'right'
        this.move_counter = 0
    }
}
let n = 100; 
let maze = new Maze(n)
let score = 0;
let time_started = 0;
let can_win = 0;
let tileSize = c.width/n;
let player = new Player


function change_size(Myn) {
    n = Myn;
    maze = new Maze(n)
    score = 0;
    time_started = 0;
    can_win = 0;
    apple.total_distance = 0;
    player.move_counter = 0;
    tileSize = c.width/n;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMaze(n, true);
    score = 0;
    document.getElementById('score').innerText = score;
    elapsedTime = 0; 
    document.getElementById('timer').innerText = elapsedTime;
    document.getElementById('move_counter').innerText = player.move_counter
    time_started = 0
    player.x = 1
    player.y = 1
    do {
        apple.x = Math.floor(Math.random() * n);
        apple.y = Math.floor(Math.random() * n);
    } while (maze.maze[apple.y][apple.x] == false || (apple.x === player.x && apple.y === player.y));
    apple.dis()
    
    draw_apple();
    drawPlayer();
    stopTimer();
}
class Apple {
    constructor () {
        this.x = 0;
        this.y = -10
        this.distance = 0;
        this.total_distance = 0;
        this.moved_since_last = 0;
    }
    dis () {
        apple.moved_since_last = 0
        let vis = [];
        let queue = [];
        let distances = [];
        for(let i = 0;i<n;i++){
            let temp = [];
            let temp2 = [];
            for(let j = 0;j<n;j++){
                temp.push(false);
                temp2.push(-1);
            }
            vis.push(temp);
            distances.push(temp2);
        }

        queue.push([player.y, player.x]);
        vis[player.y][player.x] = true;
        distances[player.x][player.y] = 0; 
        while(queue.length){
            let curr = queue[0];
            let x = curr[0];
            let y = curr[1];
            queue.splice(0, 1);
            if(maze.maze[x+1][y] && !vis[x+1][y]){
                queue.push([x+1, y]);
                vis[x+1][y] = true;
                distances[x+1][y] = distances[x][y]+1;
            }
            if(maze.maze[x-1][y] && !vis[x-1][y]){
                queue.push([x-1, y]);
                vis[x-1][y] = true;
                distances[x-1][y] = distances[x][y]+1;
            }
            if(maze.maze[x][y+1] && !vis[x][y+1]){
                queue.push([x, y+1]);
                vis[x][y+1] = true;
                distances[x][y+1] = distances[x][y]+1;
            }
            if(maze.maze[x][y-1] && !vis[x][y-1]){
                queue.push([x, y-1]);
                vis[x][y-1] = true;
                distances[x][y-1] = distances[x][y]+1;
            }
        }
        let ans = distances[apple.y][apple.x];
        
        apple.total_distance += ans
        apple.distance = ans;

        document.getElementById('moves_until').innerText = Math.floor(apple.distance*1.35) - apple.moved_since_last;

        
    }
}
let apple = new Apple();
window.onload = () => {
    drawMaze(n, true);
    drawPlayer();
    do {
        apple.x = Math.floor(Math.random() * n);
        apple.y = Math.floor(Math.random() * n);
    } while (maze.maze[apple.y][apple.x] == false || (apple.x === player.x && apple.y === player.y));
    draw_apple()
    apple.dis()
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
    if (!time_started) return;
    clearInterval(timerInterval);
}

function reachApple ()  {
    do {
        apple.x = Math.floor(Math.random() * n);
        apple.y = Math.floor(Math.random() * n);
    } while (maze.maze[apple.y][apple.x] == false || (apple.x === player.x && apple.y === player.y));
    score++;
    document.getElementById('score').innerText = score;
    apple.dis()
    can_win = score > 9;
    apple.moved_since_last = 0
}

function drawPlayer () {
    if (player.oriant === 'left') ctx.drawImage(player.img, player.x * tileSize, player.y * tileSize, tileSize, tileSize);     
    else ctx.drawImage(player.img, player.x * tileSize, player.y * tileSize, tileSize, tileSize);     
    player.img = player.img === cat1 ? cat2 : cat1;
}

function drawTile(x, y, wait, img = bush) {
    setTimeout(() => {
        ctx.drawImage(img, y * tileSize, x * tileSize, tileSize, tileSize);
    }, 20 + wait*50);
}

function drawMaze(num = n, firstdraw = false) {
    if(firstdraw){

        if(num == 1){
            drawTile(0, 0)
            return 0
        }
        drawMaze(num-1, true);
        
        for (let i = 0; i < num; i++) {
            try {
                if (maze.maze[i][num-1] == false) {
                    drawTile(i, num-1, num);
                }
                if (maze.maze[num-1][i] == false) {
                    drawTile(num-1, i, num);
                }
            }
            catch (e) {
            }
        }
    }else{
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (maze.maze[i][j] == false) {
                    ctx.drawImage(bush, j * tileSize, i * tileSize, tileSize, tileSize);
                }
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
                if (!time_started) {
                    startTimer();
                    time_started = 1;
                }
                player.y -= 1;
                player.move_counter++;
                apple.moved_since_last++;
                document.getElementById('move_counter').innerText = player.move_counter
            }
            break;
        case 's':
        case 'ArrowDown':
            if (maze.maze[player.y + 1][player.x] == true) {
                if (!time_started) {
                    startTimer();
                    time_started = 1;
                }
                player.y += 1;
                player.move_counter++;
                apple.moved_since_last++;
                document.getElementById('move_counter').innerText = player.move_counter
            }
            break;
        case 'a':
        case 'ArrowLeft':
            if (maze.maze[player.y][player.x - 1] == true ) {
                if (!time_started) {
                    startTimer();
                    time_started = 1;
                }
                player.x -= 1;
                player.move_counter++;
                apple.moved_since_last++;
                document.getElementById('move_counter').innerText = player.move_counter
            }
            player.oriant = 'left';
            break;
        case 'd':
        case 'ArrowRight':
            if (maze.maze[player.y][player.x + 1] == true ) {
                if (!time_started) {
                    startTimer();
                    time_started = 1;
                }
                player.x += 1;
                player.move_counter++;
                apple.moved_since_last++;
                document.getElementById('move_counter').innerText = player.move_counter
            }
            player.oriant = 'right';
            break;
    }
    if (player.x === apple.x && player.y === apple.y) {
        reachApple();
    }
    if (can_win && player.x === 1 && player.y === 1){
        console.log(player.move_counter,apple.total_distance)
        alert('Time: ' + elapsedTime + 's\ns/Apple: '
            + Math.floor(elapsedTime/score*10)/10 + ' s\nMove/second: '
            + Math.floor(player.move_counter/elapsedTime*10)/10);
        location.reload();
    }
    document.getElementById('moves_until').innerText = Math.floor(apple.distance*1.35) - apple.moved_since_last ;
    if (Math.floor(apple.distance*1.35) - apple.moved_since_last < 0) {
        do {
            apple.x = Math.floor(Math.random() * n);
            apple.y = Math.floor(Math.random() * n);
        } while (maze.maze[apple.y][apple.x] == false || (apple.x === player.x && apple.y === player.y));
        apple.dis()
    }
    

    ctx.clearRect(0, 0, c.width, c.height);
    drawMaze();
    draw_apple();
    drawPlayer();
}, true);

document.getElementById('easy_BTN').addEventListener('click', () => change_size(50))
document.getElementById('medium_BTN').addEventListener('click', () => change_size(70))
document.getElementById('hard_BTN').addEventListener('click', () => change_size(100))
document.getElementById('custom_BTN').addEventListener('click', (e) => change_size(+document.getElementById('input1').value), true)
document.getElementById('help').addEventListener('click', () => {maze.Give_help(100000)})
document.getElementById('help_little').addEventListener('click', () => {maze.Give_help(+document.getElementById('input2').value)})
