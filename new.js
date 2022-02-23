console.log('this is tik tak toe game');
let xClass = 'x';
let oClass = 'o';
let cell = document.querySelectorAll('[data-cell]');
let turn=true;
let win=true;
let infoDiv = document.querySelector('.infoDiv');
let Text = document.querySelector('[data-winning-message-text]');

let music = new Audio('./audio/music.mp3');
let turnAudio = new Audio('./audio/ting.mp3');
let gameoverAudio = new Audio('./audio/gameover.mp3');

// winning Combinations
let combinations = [
    // rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
 
    // columns
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
 
    // diagonals
    [0, 4, 8],
    [2, 4, 6]
 
 ]



//  Game Code Started form here
startGame();
function startGame(){
    Array.from(cell).forEach((e)=>{
        e.addEventListener('click',handleClick,{once:true});
    })
    boardHover();
    music.play();
}


function handleClick(cell){
    let targetedCell = cell.target;
    let currentMark = turn? xClass: oClass;
        placeMark(targetedCell,currentMark);
        turnAudio.play();
        checkWinOrDraw();
        // console.log(Draw());
        changeTurn();
        boardHover();
}

// Place mark
function placeMark(targetedCell,currentMark){
    targetedCell.classList.add(currentMark);
}
//changeturn
function changeTurn(){
turn = !turn;
}
// hoveron Board
function boardHover(){
    currentMark = turn? xClass: oClass;
    let board = document.getElementById('board');
    board.classList.remove(xClass);
    board.classList.remove(oClass);
    board.classList.add(currentMark);
}
// checkWinor lose function
function checkWinOrDraw(){
    // console.log('this is lose win condition');
         if(checkWin()===true){
            currentMark = turn? xClass: oClass;
            console.log('win '+ currentMark);
            infoDiv.classList.add('show');
            Text.innerText = `${currentMark} Win!`;
            gameoverAudio.play();
         }else if(Draw()===true){
            //  console.log('Draw is now true')
            infoDiv.classList.add('show');
            Text.innerText = `Draw!`;
            gameoverAudio.play();
         }

      //restart button
      let reset = document.getElementById('reset');
      reset.addEventListener('click',()=>{
          Array.from(cell).forEach((e)=>{
              e.classList.remove(xClass)
              e.classList.remove(oClass)
          });
          infoDiv.classList.remove('show');
          turn=true;
          startGame();
          gameoverAudio.play();
          
      });
}

// Draw Function
function Draw(){
   let drawis = Array.from(cell).every(function (e) {
        return e.classList.contains(xClass)||e.classList.contains(oClass)
    });
    return drawis;
}

//win function
function checkWin(){
    let winis= combinations.some(function(subarr){
        return subarr.every(function(subarrelement){
            return cell[subarrelement].classList.contains(currentMark)
        });
    });
    return winis;
        // 1. in some function it targeting all sub arrays of winningcombingations
    // like:- [0,1,2] , [3,4,5] etc.

    // 2. in Every function it targeting everyelement of every single sub array
    //   like :- 0,1,2  3,4,5 etc. and check if all elements of a sub element have
    //                             currentMark then it return true otherwise false;
}
