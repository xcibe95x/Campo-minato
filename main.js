/**
 *
 * Creare in JavaScript una griglia delle dimensioni impostate dall'utente attraverso una select.
 * Ogni casella conterrà un numero univoco da 1 alla dimensione impostata.
 * Ogni volta che clicco su una casella, questa si colora di verde se è di numero pari e di rosso se è di numero dispari.
 *
 */

const setButton = document.getElementById("set-difficulty");
const userinput = document.getElementById("difficulty");
const gameField = document.querySelector(".field");
let tries = 20;

function createGrid (cell) {
    const node = document.createElement("div");
    node.style.width = `calc(100% / ${cell})`;
    node.style.height = `calc(100% / ${cell})`;
    node.classList.add("square");
    return node;
}


setButton.addEventListener("click", () => {
    let gridDimension = userinput.value;
    let cellNumber;
    let cellPerRow;

    gameField.innerHTML = "";
    switch(gridDimension) {
        case "Hard":
            cellNumber = 100;
            cellPerRow = 10;
            break;
        case "Medium":
            cellNumber = 81;
            cellPerRow = 9;
            break;
        case "Easy":
            cellNumber = 49;
            cellPerRow = 7;
            break;
    }

    const grid = document.createElement("div");
    grid.classList.add("grid");
    gameField.append(grid);
    let numList = [];
    
    for (i = 1; i <= cellNumber; i++ ) {   
        const num = getUniqueRandomInt(numList, cellNumber, 1);
        numList.push(num); /* To Finish */ /* attaccare all'interno degli square, premere lo square se dispari o pari etc. */
        const square = createGrid(cellPerRow);
        grid.append(square);
        const span = document.createElement("span");
        square.append(span);
        span.append(num);
        span.classList.add("num");

        square.addEventListener("click", () => {
        cellClick(span, square)
        });
    }
});

function getUniqueRandomInt (list, max, min) {
    let num = 0;
    do {
        num = Math.floor(Math.random()*(max-min+1)+min)
        
    } while (list.includes(num));

    return num;
}

function cellClick(element, square) {
    element.style.display = "block";
    if (element.innerText % 2 == 0) {
        square.classList.add("green");
    } else {
        square.classList.add("red");
        element.style.display = "none";
        tries--;
        triesListener(element, square);
    }
}

function triesListener () {
    document.getElementById('tries').innerText = tries;
    if (tries <= 0) {
        alert("You lose.");
        location.reload(); 
    }
}