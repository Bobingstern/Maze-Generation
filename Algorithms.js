//Recusrive Divison
let shw
async function RecursiveDivision(maze, top, bottom, left, right){
  
  let start_range = bottom + 2
  let end_range = top - 1
  let y = randomIntInSteps(start_range, end_range, 2)
  for (var i=left+1;i<right+1;i++){
    maze[y][i].obstacle = true
    //await sleep(0.1)
  }
  
  start_range = left + 2
  end_range = right - 1
  let x = randomIntInSteps(start_range, end_range, 2)
  for (var i=bottom+1;i<top+1;i++){
    maze[i][x].obstacle = true
    //await sleep(0.1)
  }
  await sleep(0.1)
  
  
  let wall = round(random(0, 4))
  if (wall != 0){
    let gap = randomIntInSteps(left+1, x, 2)
    maze[y][gap].obstacle = false
  }
  if (wall != 1){
    let gap = randomIntInSteps(x+1, right, 2)
    maze[y][gap].obstacle = false
  }
  
  if (wall != 2){
    let gap = randomIntInSteps(bottom+1, y, 2)
    maze[gap][x].obstacle = false
  }
  if (wall != 3){
    let gap = randomIntInSteps(y+1, top, 2)
    maze[gap][x].obstacle = false
  }
  
  if (top > y + 3 && x > left + 3){
    RecursiveDivision(maze, top, y, left, x)
  }
  if (top > y + 3 && x + 3 < right){
    RecursiveDivision(maze, top, y, x, right)
  }
  if (bottom + 3 < y && x + 3 < right){
    RecursiveDivision(maze, y, bottom, x, right)
  }
  if (bottom + 3 < y && x > left+3){
    RecursiveDivision(maze, y, bottom, left, x)
  }
}


function MakeMazeDivide(a, b, c, d){
  for (var row=0;row<cells.length;row++){
        cells[row][0].obstacle = true
        cells[row][cells[row].length-1].obstacle = true
  }

  for (var column=1;column<cells[0].length-1;column++){
      cells[0][column].obstacle = true
      cells[cells.length - 1][column].obstacle = true
  }
  RecursiveDivision(cells, a, b, c, d)
}

//Aldous

async function Aldous(maze){
  let unvisited = []
  for (var i=0;i<maze.length;i++){
    for (var n=0;n<maze[i].length;n++){
      if (i % 2 == 0 || n%2 == 0){
        maze[i][n].obstacle = true;
        unvisited.push(0)
      }
      
    }
  }
  let ia = 0
  let chosen = [1, 1]
  while (unvisited.includes(0)){
    
    cells[chosen[0]][chosen[1]].visited = true
    unvisited[unvisited.indexOf(chosen)] = 1
    let surrounding = []
    if (chosen[0] - 2 > -1){
      surrounding.push([chosen[0]-2, chosen[1]])
    }
    if (chosen[0] + 2 < cells.length-1){
      surrounding.push([chosen[0]+2, chosen[1]])
    }
    if (chosen[1] - 2 > -1){
      surrounding.push([chosen[0], chosen[1]-2])
    }
    if (chosen[1] + 2 < cells[0].length-1){

      surrounding.push([chosen[0], chosen[1]+2])

    }
    

    let x = round(random(surrounding.length-1))
    let r = surrounding[x]

    if (!cells[r[0]][r[1]].visited){

      cells[r[0]][r[1]].obstacle = false
      if (x == 0){
        cells[r[0]-1][r[1]].obstacle = false
      }
      if (x == 1){
        cells[r[0]+1][r[1]].obstacle = false
      }
      if (x == 2){
        cells[r[0]][r[1]-1].obstacle = false
      }
      if (x == 3){
        cells[r[0]][r[1]+1].obstacle = false
      }

      
      chosen = r
    
    }
    else{
      let cho = []
      for (var i=0;i<cells.length;i++){
        for (var n=0;n<cells[0].length;n++){
          if (i % 2==0 || n%2==0){
            surrounding = []
            if (chosen[0] - 2 > -1){
              surrounding.push([chosen[0]-2, chosen[1]])
            }
            if (chosen[0] + 2 < cells.length-1){
              surrounding.push([chosen[0]+2, chosen[1]])
            }
            if (chosen[1] - 2 > -1){
              surrounding.push([chosen[0], chosen[1]-2])
            }
            if (chosen[1] + 2 < cells[0].length-1){

              surrounding.push([chosen[0], chosen[1]+2])

            }
            for (x=0;x<surrounding.length;x++){
              let s = surrounding[x]
              if (cells[s[0]][s[1]].visited){
                cho.push(s)
              } 
            }

          }
        }
      }

      chosen = cho[round(random(cho.length-1))]
    }
    
    shw = cells[chosen[0]][chosen[1]]

    await sleep(1)
  }
  


  
}

