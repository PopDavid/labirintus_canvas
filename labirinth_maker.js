function DrawMaze(width, height){
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
    setTimeout(() => {                
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.fillRect(0, 10, 10, 10);
        ctx.stroke();
    },1000);
    
    let lastcell;
    while(queue.length){
        console.log(queue);
        
        tick++;
        let curr = queue[Math.floor(Math.random() * (queue.length-1))];
        const index = queue.indexOf(curr);
        if (index > -1) {
            queue.splice(index, 1);
        }
        while(vis[curr[0]][curr[1]]){
            curr = queue[Math.floor(Math.random() * (queue.length-1))];
            const index = queue.indexOf(curr);
            if (index > -1) {
                queue.splice(index, 1);
            }
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
            setTimeout(() => {                
                ctx.beginPath();
                ctx.fillStyle = "white";
                ctx.fillRect(curr[0]*10, curr[1]*10, 10, 10);
                ctx.stroke();
            },1000);

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
    setTimeout(() => {                
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.fillRect((lastcell[0]+1)*10, lastcell[1]*10,  10, 10);
        ctx.stroke();
    },1000);

    return maze;
    
}