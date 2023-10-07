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

const setUp = () => {
    const container = document.querySelector("#content");
    container.appendChild(createTable());
}

export { 
    setUp
};