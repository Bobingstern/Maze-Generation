let cellSize = 20
let cells = []
let st = [1, 1]
let end = []
let e = 0
let selection;
let runButton;
let w, h


function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  w = floor(width/cellSize)
  h = floor(height/cellSize)
  noStroke()
  console.log(w, h)
  for (let y=0;y<h;y++){
    let temp = []
    for (let x=0;x<w;x++){
      temp.push(new Cell(x*cellSize, y*cellSize, false, cells.length, temp.length))
    }
    cells.push(temp)
  }
  

  selection = createSelect();
  selection.position(10, 10);
  selection.option('Aldous Broder');
  selection.option('Recursive Division')
  selection.option('Recursive Backtracker')
  selection.selected('Recursive Backtracker');

  

  runButton = createButton("Start")
  runButton.position(10, 30)
  runButton.mousePressed(Run)


  //Aldous(cells)

  
  
}

function Run() {
  let item = selection.value();
  if (true){
    if (item == "Aldous Broder"){
      Aldous(cells)
    }
    if (item == "Recursive Division"){
      MakeMazeDivide(h-1, 0, 0, w-1)
    }
    if (item == "Recursive Backtracker"){
      RecursiveBacktrackerMaze()
    }
    if (item == "Prims Algorithm"){
      Prims()
    }
    

  }

}


function ShowCells(){
  for (var i=0;i<cells.length;i++){
    for (var n=0;n<cells[i].length;n++){
      cells[i][n].show()
    }
  }
}




function draw() {
  background(220);
  ShowCells()
  try{
    push()
    fill(0, 255, 0);
    rect(shw.pos.x, shw.pos.y, cellSize, cellSize)
    pop()
  }
  catch{

  }
}


class Cell{
  constructor(x, y, isOb, a, b){
    this.pos = createVector(x, y)
    this.obstacle = isOb
    this.visited = false
    this.expanded = false
    this.ind = [a, b]
    this.f = dist(0, 0, this.pos.x, this.pos.y) + dist(this.pos.x, this.pos.y, floor(width/cellSize), floor(height/cellSize))
  }
  show(){
    if (this.obstacle){
      push()
      fill(0);
      rect(this.pos.x, this.pos.y, cellSize, cellSize)
      pop()

    }
    else{
      push()
      fill(255);
      rect(this.pos.x, this.pos.y, cellSize, cellSize)
      pop()
    }

  }
}
