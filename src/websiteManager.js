import { 
    viewController,
    setUpView,
    markAttack
} from './viewController';

import { 
    gameMasterFactory,
} from './index';

//manages the game and the viewcontroller
const websiteManagerFactory = () => {
    let game = gameMasterFactory();
    let myViewController = viewController();
    const getShipGrid = () => {
        return game.getShipGrid();
    }
    const processUserInput = (row, col, click) => {
        
        if(!game.isValidAttack(row, col)){
            return;
        }

        markAttack(click);

        if(game.isSuccessfulAttack(row, col, 'computer')){
            console.log('SCUCESS');
            //update console
        }

        game.processUserInput(row, col);

        //console.log(game.winCheckPlayer());
        if(game.winCheckPlayer()){
            //display victory message
            console.log('player wins');
            //disable user inputs
        }

        //get ai target
        //execute ai attack
        let target = game.processComputerAttack();
        console.log(target);
        //update player ship grid to show attack
        myViewController.markComputerAttack(target.row, target.col);
        //win check
    }
    const initiate = () => {
        myViewController.setUpView(game, processUserInput);
    }
    
    return { initiate, processUserInput, getShipGrid };
}

export { 
    websiteManagerFactory
};