const container = document.querySelector("#content");

const footer = document.createElement("footer");

container.appendChild(footer);

const createCell = (myRow, myCol) => {
  let output = document.createElement("td");
  output.classList.add("playerGrid");
  output.dataset.row = myRow;
  output.dataset.col = myCol;
  return output
}


const createTableHeader = (content) => {
  let output = document.createElement("th");
  output.textContent = content;
  return output;
}

const createTopRow = () => {
  let row = document.createElement("tr");
  row.appendChild(createTableHeader(""));
  row.appendChild(createTableHeader("A"));
  row.appendChild(createTableHeader("B"));
  row.appendChild(createTableHeader("C"));
  row.appendChild(createTableHeader("D"));
  row.appendChild(createTableHeader("E"));
  row.appendChild(createTableHeader("F"));
  row.appendChild(createTableHeader("G"));
  row.appendChild(createTableHeader("H"));
  row.appendChild(createTableHeader("I"));
  row.appendChild(createTableHeader("J"));
  return row;
}

const createRow = (rowNumber) => {
  let row = document.createElement("tr");
  row.dataset.row = rowNumber;
  row.appendChild(createTableHeader(rowNumber));
  for(let col = 0; col < 10; col++){
    row.appendChild(createCell(rowNumber, col));
  }
  return row;
}

const createTable = () => {
  const myTable = document.createElement("table");
  myTable.appendChild(createTopRow());
  for(let row = 0; row < 10; row++){
    myTable.appendChild(createRow(row));
  }

  return myTable;
}

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

const attackGridFactory = (processUserInput) => {
  let attackGrid = createTable();
  for(let row = 0; row < 10; row++){
      for(let col = 0; col < 10; col++){
          let tableRow = attackGrid.children[row + 1];
          let cell = tableRow.children[col + 1];
          //console.log(cell);
          cell.onclick = (click) => {
            processUserInput(row, col, click);
            //console.log(`marking this from onclick ${this}`);
          }
      }
  }
  return attackGrid;

}

const setUpView = (game, processUserInput) => {
    const container = document.querySelector("#content");
    let table = createTable();
    //console.log(table.children);
    container.appendChild(table);
    displayShips(game.getShipGrid(), table);
    container.appendChild(attackGridFactory(processUserInput));
}

const markAttack = (click, shipPresent) => {
  console.log(click.target);
  let myDiv = document.createElement('div');
  myDiv.classList.add('hit');
  myDiv.classList.add('animate');
  /* myDiv.textContent = 'hit'; */
  if(shipPresent){
    myDiv.classList.add('ship');
  }
  click.target.appendChild(myDiv);
}

const viewController = () => {
  let shipgridDisplay;
  let msgOne;
  let msgTwo;

  const setUpMsgDisplay = (parent) => {

    const container = document.createElement('p');
    container.classList.add('msgDisplay');
    container.classList.add('container');

    msgOne = document.createElement('p');
    msgOne.classList.add('msgOne');
    msgOne.textContent = 'Begin the game by clicking on the right board to select coordinates to fire at';

    msgTwo = document.createElement('p');
    msgTwo.classList.add('msgTwo');
    msgTwo.textContent = 'Have fun!'

    parent.appendChild(container);
    container.appendChild(msgOne);
    container.appendChild(msgTwo);
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
      msg = `Your opponent fires at (${row}, ${col} but hits nothing.)`;
    } else if (result === 'hit'){
      msg = `Your opponent fires at (${row}, ${col}) and scores a hit.`;
    } else if (result === 'sunk'){
      msg = `Your opponent fires at (${row}, ${col}), scores a hit, and sinks a ship.`;
    } else if (result === 'win'){
      msg = `You have sunk all your opponent's ships and won!`;
    }
    msgTwo.textContent = msg;
  }


  const setUpHeader = (parent) => {
    let header = document.createElement('header');
    let title = document.createElement('h1');
    title.textContent = 'Battleship';
    header.appendChild(title);
    parent.appendChild(header);
    return header;
  }

  const setUpView = (game, processUserInput) => {
    const container = document.querySelector("#content");
    setUpHeader(container);
    shipgridDisplay = createTable();
    //console.log(shipgridDisplay.children);
    container.appendChild(shipgridDisplay);
    displayShips(game.getShipGrid(), shipgridDisplay);
    container.appendChild(attackGridFactory(processUserInput));
    setUpMsgDisplay(container);
  }
  const getShipGridCell = (row, col) => {
    let tableRow = shipgridDisplay.children[row + 1];
    let cell = tableRow.children[col + 1];
    return cell;
  }
  const markComputerAttack = (row, col) => {
    let myTD = getShipGridCell(row, col);
    //myTD.textContent = 'pch';

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
    setUpView,
    markAttack,
};