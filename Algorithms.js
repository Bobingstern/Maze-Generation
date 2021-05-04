//---
let solve = []
end = []

class AstarCell{
  constructor(x, y, end, ob){
    this.pos = createVector(x, y)
    this.obstacle = ob
    this.visited = false
    this.f = 0
    this.g = 0
    this.h = 0
    this.parent = []
    this.g = dist(x, y, end[0], end[1])
    this.h = dist(x, y, 0, 0)
    this.f = this.g+this.h

  }
  show(){
    push()
    fill(0, 255, 0, this.f/cellSize);
    rect(this.pos.x, this.pos.y, cellSize, cellSize)
    pop()
  }

}

async function SolveMaze(start){ 
  started = true
  let nodes = []
  end = [cells[0].length-2, cells.length-2]
  cells[end[1]][end[0]].obstacle = false
  ShowCells()
  for (var i=0;i<cells.length;i++){
    let temp = []
    for (var n=0;n<cells[0].length;n++){
      temp.push(new AstarCell(n*cellSize, i*cellSize, end, cells[i][n].obstacle))
    }
    nodes.push(temp)
  }


  let open = [start]
  let closed = []
  let curr = []
  while (open.length > 0){
    
    let best = 0
    let ch = 0
    for (var i=0;i<open.length;i++){
      let f = nodes[open[i][0]][open[i][1]].f
      if (f > best){
        best = f
        ch = i
        curr = open[i]
      }
    }
    open.splice(ch, 1)


    nodes[curr[0]][curr[1]].show()
    nodes[curr[0]][curr[1]].visited = true
    var neighbors = GetNeighborsSingular(curr)
    for (var i = 0, il = neighbors.length; i < il; ++i){
      var neighbor = neighbors[i]
      if (nodes[neighbor[0]][neighbor[1]].visited || nodes[neighbor[0]][neighbor[1]].obstacle){
        continue
      }

      var gScore = nodes[curr[0]][curr[1]].g + (nodes[neighbor[0]][neighbor[1]].h + dist(curr[0], curr[1], neighbor[0], neighbor[1]))
      var beenVisited = nodes[neighbor[0]][neighbor[1]].visited
      if (!beenVisited){
        nodes[neighbor[0]][neighbor[1]].parent = curr
        nodes[neighbor[0]][neighbor[1]].visited = true
        //nodes[neighbor[0]][neighbor[1]].g = gScore
      

      if (!beenVisited){
        open.push(neighbor)
      }
    }

    }
    if (curr[0] == end[1] && curr[1] == end[0]){
      console.log('done')
      break
    }




    
    await sleep(1)

  }
  let current = curr
  ShowCells()
  while (current[0] != start[0] || current[1] != start[1]){

    nodes[current[0]][current[1]].show()
    current = nodes[current[0]][current[1]].parent
  }
}


function GetNeighborsSingular(cell){
  let surrounding = []
  if (cell[0] - 1 > -1){
    surrounding.push([cell[0]-1, cell[1]])
  }
  if (cell[0] + 1 < cells.length){
    surrounding.push([cell[0]+1, cell[1]])
  }
  if (cell[1] - 1 > -1){
    surrounding.push([cell[0], cell[1]-1])
  }
  if (cell[1] + 1 < cells[0].length){

    surrounding.push([cell[0], cell[1]+1])

  }
  return surrounding
}


async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function randomIntInSteps(a, b, step) {
  function randomInt(a, b) {
    return Math.floor(Math.random() * (b - a + 1) + a);
  }

  if (a > b) {
    // Ensure a is smaller.
    var c = a;
    a = b;
    b = c;
  }

  step = Math.abs(step)

  return a + randomInt(0, Math.floor((b - a)/step)) * step;
}



function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i] === obj) {
            return [true, i];
        }
    }

    return false;
}


//

//Recusrive Divison
let shw
async function RecursiveDivision(maze, top, bottom, left, right){
  
  let start_range = bottom + 2
  let end_range = top - 1
  let y = randomIntInSteps(start_range, end_range, 2)
  //1, 5
  //3
  y = round((start_range+end_range)/2)
  if (y%2!=0){
    y-=1
  }
  for (var i=left+1;i<right+1;i++){
    maze[y][i].obstacle = true
    maze[y][i].show()
    await sleep(0.1)
  }
  
  start_range = left + 2
  end_range = right - 1

  let x = randomIntInSteps(start_range, end_range, 2)
  x = round((start_range+end_range)/2)
  if (x%2!=0){
    x-=1
  }
  for (var i=bottom+1;i<top+1;i++){
    maze[i][x].obstacle = true
    maze[i][x].show()
    await sleep(0.1)
  }
  // await sleep(1000)
  
  
  let wall = round(random(0, 4))
  if (wall != 0){
    let gap = randomIntInSteps(left+1, x, 2)
    maze[y][gap].obstacle = false
    maze[y][gap].show()
  }
  if (wall != 1){
    let gap = randomIntInSteps(x+1, right, 2)
    maze[y][gap].obstacle = false
    maze[y][gap].show()
  }
  
  if (wall != 2){
    let gap = randomIntInSteps(bottom+1, y, 2)
    maze[gap][x].obstacle = false
    maze[gap][x].show()
  }
  if (wall != 3){
    let gap = randomIntInSteps(y+1, top, 2)
    maze[gap][x].obstacle = false
    maze[gap][x].show()
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
  ShowCells()
  RecursiveDivision(cells, a, b, c, d)
}

//Aldous

async function Aldous(maze){
  ShowCells()
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
    cells[chosen[0]][chosen[1]].show()
    unvisited[unvisited.indexOf(chosen)] = 1
    let surrounding = GetNeighbors(chosen)
    
    

    let x = round(random(surrounding.length-1))
    let r = surrounding[x]

    if (!cells[r[0]][r[1]].visited){

      cells[r[0]][r[1]].obstacle = false
      cells[r[0]][r[1]].show()
      if (x == 0){
        cells[r[0]-1][r[1]].obstacle = false
        cells[r[0]-1][r[1]].show()
      }
      if (x == 1){
        cells[r[0]+1][r[1]].obstacle = false
        cells[r[0]+1][r[1]].show()
      }
      if (x == 2){
        cells[r[0]][r[1]-1].obstacle = false
        cells[r[0]][r[1]-1].show()
      }
      if (x == 3){
        cells[r[0]][r[1]+1].obstacle = false
        cells[r[0]][r[1]+1].show()
      }

      
      chosen = r
      cells[chosen[0]][chosen[1]].show()
    
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


//Recursive Backtracker

function GetNeighbors(cell){
  let surrounding = []
  if (cell[0] - 2 > -1){
    surrounding.push([cell[0]-2, cell[1]])
  }
  if (cell[0] + 2 < cells.length){
    surrounding.push([cell[0]+2, cell[1]])
  }
  if (cell[1] - 2 > -1){
    surrounding.push([cell[0], cell[1]-2])
  }
  if (cell[1] + 2 < cells[0].length){

    surrounding.push([cell[0], cell[1]+2])

  }
  return surrounding
}

async function RecursiveBacktrackerMaze(){
  for (var i=0;i<cells.length;i++){
    for (var n=0;n<cells[i].length;n++){
      if (1==1){
        cells[i][n].obstacle = true;
      }
      cells[i][n].visited = false
      
    }
  }
  //RecursiveBacktracker([1, 1])
  let backtrack = []
  ShowCells()
  BacktrackRecurse([1, 1], backtrack)

}

async function BacktrackRecurse(curr, back){

  let surrounding = GetNeighbors(curr)
  let possible = []
  let visited = []
  await sleep(1)

  cells[curr[0]][curr[1]].visited = true
  cells[curr[0]][curr[1]].show()
  for (var i=0;i<surrounding.length;i++){
    let re = surrounding[i]
    if (!cells[re[0]][re[1]].visited){
      possible.push(re)
    }
    else{
      visited.push(re)
    }
  }
  if (possible.length > 0){
    let x = round(random(possible.length-1))
    let chosen = possible[x]
    cells[chosen[0]][chosen[1]].visited = true
    //cells[curr[0]][curr[1]].obstacle = false
    if (curr[0] < chosen[0]){
      cells[curr[0]+1][curr[1]].obstacle = false
      cells[curr[0]+2][curr[1]].obstacle = false
      cells[curr[0]+1][curr[1]].show()

    }
    else if (curr[0] > chosen[0]){
      cells[curr[0]-1][curr[1]].obstacle = false
      cells[curr[0]-2][curr[1]].obstacle = false
      cells[curr[0]-1][curr[1]].show()
    }
    else if (curr[1] < chosen[1]){
      cells[curr[0]][curr[1]+1].obstacle = false
      cells[curr[0]][curr[1]+2].obstacle = false
      cells[curr[0]][curr[1]+1].show()
    }
    else if (curr[1] > chosen[1]){
      cells[curr[0]][curr[1]-1].obstacle = false
      cells[curr[0]][curr[1]-2].obstacle = false
      cells[curr[0]][curr[1]-1].show()
    }
    //await sleep(1)
    back.push(chosen)
    shw = cells[chosen[0]][chosen[1]]
    if (chosen == [1, 1]){
      return
    }
    await BacktrackRecurse(chosen, back)



  }
  else{
    if (back.length > 0){
      let e = back[back.length-1]
      back.splice(back.length-1, 1)
      shw = cells[e[0]][e[1]]
      await BacktrackRecurse(e, back)
    }
    else{
      return
    }
  }


}

async function RecursiveBacktracker(c){

  let stack = []
  let curr = c
  stack.push(c)


  while (stack.length > 0){
    let x = round(random(stack.length-1))
    curr = stack[x]
    cells[curr[0]][curr[1]].visited = true
    stack.splice(x, 1)
    let surrounding = GetNeighbors(curr)
    let unvisited = []
    for (var i=0;i<surrounding.length;i++){
      let re = surrounding[i]
      if (!cells[re[0]][re[1]].visited){
        unvisited.push(re)
      }
    }
    if (unvisited.length > 0){
      
      let e = round(random(unvisited.length-1))
      let chosen = unvisited[e]
      stack.push(curr)
      stack.push(chosen)
      cells[chosen[0]][chosen[1]].visited = true
      if (curr[0] < chosen[0]){
        cells[curr[0]+1][curr[1]].obstacle = false
      }
      else if (curr[0] > chosen[0]){
        cells[curr[0]-1][curr[1]].obstacle = false
      }
      else if (curr[1] < chosen[1]){
        cells[curr[0]][curr[1]+1].obstacle = false
      }
      else if (curr[1] > chosen[1]){
        cells[curr[0]][curr[1]-1].obstacle = false
      }

      shw = cells[chosen[0]][chosen[1]]

    }
    await sleep(1)

  }    


} 

//Prims


async function Prims(){

}
