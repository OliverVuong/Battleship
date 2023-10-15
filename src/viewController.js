const displayShips = (shipGrid, table) => {
    for(let row = 0; row < 10; row++){
        for(let col = 0; col < 10; col++){
            //console.log(shipGrid[row][col]);
            if(shipGrid[row][col]){
                let tableRow = table.children[row + 1];
                //console.log('hello');
                //console.log(tableRow);
                let cell = tableRow.children[col + 1];
                //cell = document.createElement("div");
                cell.classList.add("ship")
                //myDiv.textContent = "s";
                //cell.textContent = "asdfas";
                //cell.appendChild(myDiv);
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
  let myTD = click.target;
  /* let myDiv = document.createElement('div'); */
  myTD.classList.add('animate');
  if(shipPresent){
    myTD.classList.add('hit');
  } else {
    myTD.classList.add('miss');
  }
  /* click.target.appendChild(myDiv); */
}

const viewController = () => {
  let shipTBody;
  let attackGrid;
  let msgOne;
  let msgTwo;
  let shipSelector;
  let gameMaster;

  const clearExistingHighlights = () => {
    for(let row = 0; row < 10; row++){
      for(let col = 0; col < 10; col++){
        getTableCell(row, col).classList.remove('selected');
      }
    }
  }

  const createHighlighting = (shipGridWrapper) => {
    shipSelector.onchange = (event) => {
      clearExistingHighlights();


      let shipID = shipSelector.value;
      let coordinates = shipGridWrapper.getShipLocation(shipID);
      for(let coord of coordinates){
        console.log('coords:');
        console.log(coord);/////////
        let myTD = getTableCell(coord.row, coord.col);
        console.log('myTD');
        console.log(myTD);/////////
        myTD.classList.add('selected')
      }
      getTableCell
    }
  }

  const loadButtonFunctionality = (processUserInput, shipGrid) => {

    makeAttackGridClickable(attackGrid, processUserInput);
    createHighlighting(shipGrid);
  }

  const loadElements = () => {
    shipTBody = document.querySelector('.shipGrid');
    attackGrid = document.querySelector('.attackGrid');
    msgOne = document.querySelector('.msgOne');
    msgTwo = document.querySelector('.msgTwo');
    shipSelector = document.querySelector('#ship-selector');
    createHighlighting();
  }

  const loadGameMaster = (game) => {
    gameMaster = game;
  }

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
    /* shipTBody = document.querySelector('.shipGrid');
    attackGrid = document.querySelector('.attackGrid'); */
    displayShips(game.getShipGrid(), shipTBody)
    /* makeAttackGridClickable(attackGrid, processUserInput); */
  }

  const setUpView = (game, processUserInput) => {
    const container = document.querySelector("#content");
    
    setUpMain(container, game, processUserInput);
  }

  const setUp = (game, processUserInput) => {
    loadElements();
    loadButtonFunctionality(processUserInput, game.getShipGridWrapper());
    loadGameMaster(game);
    setUpView(game, processUserInput);
  }
  const getTableCell = (row, col) => {
    let tableRow = shipTBody.children[row + 1];
    let cell = tableRow.children[col + 1];
    return cell;
  }
  const markComputerAttack = (row, col) => {
    let myTD = getTableCell(row, col);

    if(gameMaster.isShipPresentAt(row, col, 'player')){
      myTD.classList.add('hit');
    } else {
      myTD.classList.add('miss');
    }
    myTD.classList.add('animate')
  }

  return { setUp, setUpView, markComputerAttack, updateMsgOne, updateMsgTwo };
}

export { 
    viewController,
    markAttack,
};
