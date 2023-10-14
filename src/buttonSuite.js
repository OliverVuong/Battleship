const getDropDown = () => {
    const dropDownContainer = document.createElement('div');
    dropDownContainer.classList.add('dropDownContainer');
    const myLabel = document.createElement('label');
    myLabel.for = 'ship-selector';
    myLabel.textContent = 'Chose a ship';
    const mySelect = document.createElement('select');
    mySelect.name = 'ship-selector';
    mySelect.id = 'ship-selector';
    for(let i = 1; i <= 10; i++){
      const option = document.createElement('option');
      option.value = `Ship${i}`;
      option.textContent = `Ship ${i}`;
      mySelect.appendChild(option);
    }
  
    dropDownContainer.appendChild(myLabel);
    dropDownContainer.appendChild(mySelect);
  
    return dropDownContainer
  }
  
  const getButtons = () => {
    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('buttonsContainer');
    const button_up = document.createElement('button');
    button_up.textContent = 'Up';
    button_up.classList.add('up');
    const button_left = document.createElement('button');
    button_left.textContent = 'Left';
    button_left.classList.add('left');
    const button_down = document.createElement('button');
    button_down.textContent = 'Down';
    button_down.classList.add('down');
    const button_right = document.createElement('button');
    button_right.textContent = 'Right';
    button_right.classList.add('right');
    const button_rotate = document.createElement('button');
    button_rotate.textContent = 'Rotate';
    button_rotate.classList.add('rotate');
    const button_start = document.createElement('button');
    button_start.textContent = 'Start';
    button_start.classList.add('start');
  
    buttonsContainer.appendChild(button_up);
    buttonsContainer.appendChild(button_left);
    buttonsContainer.appendChild(button_down);
    buttonsContainer.appendChild(button_right);
    buttonsContainer.appendChild(button_rotate);
    buttonsContainer.appendChild(button_start);
  
    return buttonsContainer
  }
  
  const getErrorDisplay = () => {
    const errorContainer = document.createElement('div');
    errorContainer.classList.add('errorContainer');
    const errorText = document.createElement('p');
    errorText.classList.add('errorText');
    errorText.textContent = 'Error goes here, otherwise blank';
  
    errorContainer.appendChild(errorText);
  
    return errorContainer;
  }
  
  const setupButtonSuite = (parent) => {
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('buttonContainer');
  
    buttonContainer.appendChild(getDropDown());
    buttonContainer.appendChild(getButtons());
    buttonContainer.appendChild(getErrorDisplay());
  
    parent.appendChild(buttonContainer);
  }

export {
    setupButtonSuite
}