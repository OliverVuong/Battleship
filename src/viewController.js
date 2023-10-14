const displayShips = (shipGrid, table) => {
    for(let row = 0; row < 10; row++){
        for(let col = 0; col < 10; col++){
            //console.log(shipGrid[row][col]);
            if(shipGrid[row][col]){
                let tableRow = table.children[row + 1];
                //console.log('hello');
                //console.log(tableRow);
                let cell = tableRow.children[col + 1];
                let myDiv = document.createElement("div");
                myDiv.classList.add("ship")
                //myDiv.textContent = "s";
                //cell.textContent = "asdfas";
                cell.appendChild(myDiv);
            }
        }
    }
}

const makeAttackGridClickable = (tbody, processUserInput) => {
  for(let row = 0; row < 10; row++){
      for(let col = 0; col < 10; col++){
          let tableRow = tbody.children[row + 1];
          let cell = tableRow.children[col + 1];
          cell.onclick = (click) => {
            processUserInput(row, col, click);
            //console.log(`marking this from onclick ${this}`);
          }
      }
  }
}

const markAttack = (click, shipPresent) => {
  console.log(click.target);
  let myDiv = document.createElement('div');
  myDiv.classList.add('hit');
  myDiv.classList.add('animate');
  if(shipPresent){
    myDiv.classList.add('ship');
  }
  click.target.appendChild(myDiv);
}

const viewController = () => {
  let shipTBody;
  let msgOne;
  let msgTwo;

  const updateMsgOne = (row, col, result) => {
    let msg;
    if(result === 'miss'){
      msg = `You fire at (${row}, ${col}) but hit nothing.`;
    } else if (result === 'hit'){
      msg = `You fire at (${row}, ${col}) and score a hit.`;
    } else if (result === 'sunk'){
      msg = `You fire at (${row}, ${col}), score a hit, and sink a ship.`;
    } else if (result === 'loss'){
      msg = `Your opponent has sunk all your ships. You lose the match.`;
    }
    msgOne.textContent = msg;
  }

  const updateMsgTwo = (row, col, result) => {
    let msg;
    if(result === 'miss'){
      msg = `Your opponent fires at (${row}, ${col}) but hits nothing.`;
    } else if (result === 'hit'){
      msg = `Your opponent fires at (${row}, ${col}) and scores a hit.`;
    } else if (result === 'sunk'){
      msg = `Your opponent fires at (${row}, ${col}), scores a hit, and sinks a ship.`;
    } else if (result === 'win'){
      msg = `You have sunk all your opponent's ships and won!`;
    }
    msgTwo.textContent = msg;
  }

  const setUpMain = (container, game, processUserInput) => {
    shipTBody = document.querySelector('.shipGrid');
    let attackGrid = document.querySelector('.attackGrid');
    displayShips(game.getShipGrid(), shipTBody)
    makeAttackGridClickable(attackGrid, processUserInput);
  }

  const setUpView = (game, processUserInput) => {
    const container = document.querySelector("#content");
    msgOne = document.querySelector('.msgOne');
    msgTwo = document.querySelector('.msgTwo');
    
    setUpMain(container, game, processUserInput);
  }
  const getShipGridCell = (row, col) => {
    let tableRow = shipTBody.children[row + 1];
    let cell = tableRow.children[col + 1];
    return cell;
  }
  const markComputerAttack = (row, col) => {
    let myTD = getShipGridCell(row, col);

    if(myTD.firstChild){
      myTD.firstChild.classList.add('hit');
      myTD.firstChild.classList.add('animate');
    } else {
      let myDiv = document.createElement('div');
      myDiv.classList.add('hit');
      myDiv.classList.add('animate');
      myTD.appendChild(myDiv);
    }
  }
  return { setUpView, markComputerAttack, updateMsgOne, updateMsgTwo };
}

export { 
    viewController,
    markAttack,
};
