const container = document.querySelector("#content");

const header = document.createElement("head");
const main = document.createElement("main");
const footer = document.createElement("footer");

container.appendChild(header);
container.appendChild(main);
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
  row.appendChild(createTableHeader("&nbsp;"));
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
                myDiv.textContent = "s";
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

const markAttack = (click) => {
  console.log(click.target);
  let myDiv = document.createElement('div');
  myDiv.classList.add('hit');
  myDiv.classList.add('animate');
  myDiv.textContent = 'hit';
  click.target.appendChild(myDiv);
}

const viewController = () => {
  let shipgridDisplay;
  const setUpView = (game, processUserInput) => {
    const container = document.querySelector("#content");
    shipgridDisplay = createTable();
    //console.log(shipgridDisplay.children);
    container.appendChild(shipgridDisplay);
    displayShips(game.getShipGrid(), shipgridDisplay);
    container.appendChild(attackGridFactory(processUserInput));
  }
  const getShipGridCell = (row, col) => {
    let tableRow = shipgridDisplay.children[row + 1];
    let cell = tableRow.children[col + 1];
    return cell;
  }
  const markComputerAttack = (row, col) => {
    let cell = getShipGridCell(row, col);
    cell.textContent = 'pch';
  }
  return { setUpView, markComputerAttack };
}

export { 
    viewController,
    setUpView,
    markAttack
};