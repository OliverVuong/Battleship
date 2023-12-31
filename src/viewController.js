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
  let errorContainer;
  let errorMessage;
  let msgOne;
  let msgTwo;
  let shipSelector;
  let buttonSuite;
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

  const disableMovementBtns = () => {
    buttonSuite.up.disabled = true;
    buttonSuite.left.disabled = true;
    buttonSuite.down.disabled = true;
    buttonSuite.right.disabled = true;
    buttonSuite.rotate.disabled = true;
    buttonSuite.randomize.disabled = true;
    buttonSuite.start.disabled = true;
    shipSelector.disabled = true;
  }

  const clearShipDisplay = () => {
    for(let row = 0; row < 10; row++){
      for(let col = 0; col < 10; col++){
        let cell = getTableCell(row, col);
        cell.classList.remove('ship');
        cell.classList.remove('selected');
      }
    }
  }

  const lockoutAttackGrid = () => {
    for(let row = 0; row < 10; row++){
        let tableRow = attackGrid.children[row + 1];
        for(let col = 0; col < 10; col++){
            let cell = tableRow.children[col + 1];
            cell.onclick = null;
        }
    }
  }

  const makeAttackGridClickable = (processUserInput) => {
    for(let row = 0; row < 10; row++){
        for(let col = 0; col < 10; col++){
            let tableRow = attackGrid.children[row + 1];
            let cell = tableRow.children[col + 1];
            cell.onclick = (click) => {
              processUserInput(row, col, click);
              //console.log(`marking this from onclick ${this}`);
            }
        }
    }
  }

  const clearShipSelector = () => {
    shipSelector.value = 'none';
  }

  const loadButtonFunctionality = (processUserInput, shipGrid) => {
    buttonSuite.start.onclick = () => {
      makeAttackGridClickable(processUserInput);
      disableMovementBtns();
      clearExistingHighlights();

      document.querySelector('.rightContainer').style.visibility = 'visible';
      document.querySelector('.buttonContainer').style.visibility = 'hidden';
      
      msgOne.textContent = 'Attack your opponent by clicking a cell on their grid.';
    }
    buttonSuite.randomize.onclick = () => {
      gameMaster.randomizePlayerBoard();
      clearShipDisplay();
      clearShipSelector();
      displayShips(gameMaster.getShipGrid(), shipTBody)
    }
    createHighlighting(shipGrid);
  }

  const updateShipView = () => {

    if(!gameMaster.getPossibleMove()){
      console.log('no move exectued- exiting out of update ship view');
      return;
    }
    let locationChange = gameMaster.getLocationChange();
    for(let location of locationChange.oldLocations){
      let cell = getTableCell(location.row, location.col);
      cell.classList.remove('ship');
      cell.classList.remove('selected');
    }
    
    for(let location of locationChange.newLocations){
      let cell = getTableCell(location.row, location.col);
      cell.classList.add('ship');
      cell.classList.add('selected');
    }
  }

  const updateErrorMsg = () => {
    let errorCode = gameMaster.getErrorMsg();
    console.log(errorCode);
    if(errorCode === 'outOfBounds'){
      errorMessage.textContent = 'Cannot move ships out of bounds.';
      errorContainer.style.visibility = 'visible';
    } else if(errorCode === 'spaceViolation'){
      errorMessage.textContent = 'Cannot move ships to close. A minimum of one empty space between ships is required.';
      errorContainer.style.visibility = 'visible';
    } else {
      errorMessage.textContent = '';
      errorContainer.style.visibility = 'hidden';
    }
    
  }

  const loadMovementButtonFunctionality = () => {
    buttonSuite.up.onclick = () => {
      gameMaster.moveShip(shipSelector.value, 'up');
      updateShipView();
      updateErrorMsg();
    }
    buttonSuite.down.onclick = () => {
      gameMaster.moveShip(shipSelector.value, 'down');
      updateShipView();
      updateErrorMsg();
    }
    buttonSuite.right.onclick = () => {
      gameMaster.moveShip(shipSelector.value, 'right');
      updateShipView();
      updateErrorMsg();
    }
    buttonSuite.left.onclick = () => {
      gameMaster.moveShip(shipSelector.value, 'left');
      updateShipView();
      updateErrorMsg();
    }
    buttonSuite.rotate.onclick = () => {
      gameMaster.rotateShip(shipSelector.value);
      updateShipView();
      updateErrorMsg();
    }
  }

  const loadButtonSuite = () => {
    buttonSuite = {};
    buttonSuite.up = document.querySelector('.up');
    buttonSuite.left = document.querySelector('.left');
    buttonSuite.down = document.querySelector('.down');
    buttonSuite.right = document.querySelector('.right');
    buttonSuite.rotate = document.querySelector('.rotate');
    buttonSuite.randomize = document.querySelector('.randomize');
    buttonSuite.start = document.querySelector('.start');
  }

  const loadElements = () => {
    shipTBody = document.querySelector('.shipGrid');
    attackGrid = document.querySelector('.attackGrid');
    errorMessage = document.querySelector('.errorText');
    errorContainer = document.querySelector('.errorContainer');
    msgOne = document.querySelector('.msgOne');
    msgTwo = document.querySelector('.msgTwo');
    shipSelector = document.querySelector('#ship-selector');
    loadButtonSuite();
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
    loadGameMaster(game);
    loadButtonFunctionality(processUserInput, game.getShipGridWrapper());
    loadMovementButtonFunctionality();
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

  return { 
    setUp, 
    setUpView, 
    markComputerAttack, 
    updateMsgOne, 
    updateMsgTwo,
    updateShipView,
    lockoutAttackGrid,
    makeAttackGridClickable
   };
}

export { 
    viewController,
    markAttack,
};
