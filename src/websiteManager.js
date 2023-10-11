import { 
    viewController,
    setUpView,
    markAttack
} from './viewController';

import { 
    gameMasterFactory,
} from './gameMaster';

//manages the game and the viewcontroller
const websiteManagerFactory = () => {
    let game = gameMasterFactory();
    let myViewController = viewController();
    const getShipGrid = () => {
        return game.getShipGrid();
    }
    const processUserInput = (row, col, click) => {
        
        if(!game.isAttackableByPlayer(row, col)){
            return;
        }

        markAttack(click);
/* 
        if(game.isShipPresentAt(row, col, 'computer')){
            console.log('SCUCESS');
            //update console
        } */

        game.processUserInput(row, col);

        //display outcome
        //console.log(`You fire at (${row}, ${col}) and ${game.getPlayerTurnResult()}`);
        myViewController.updateMsgOne(row, col, game.getPlayerTurnResult());

        //console.log(game.winCheckPlayer());
        if(game.winCheckPlayer()){
            //display victory message
            console.log('player wins');
            myViewController.updateMsgTwo(0, 0, 'win');
            return;
        }

        //get ai target
        //execute ai attack
        let target = game.processComputerAttack();
        //console.log(target);
        //update player ship grid to show attack
        myViewController.markComputerAttack(target.row, target.col);

        //display outcome
        console.log(`Your opponent fires at (${target.row}, ${target.col}) and ${game.getComputerTurnResult()}`);
        myViewController.updateMsgTwo(target.row, target.col, game.getComputerTurnResult());

        //win check
        if(game.winCheckComputer()){
            console.log('computer wins');
            myViewController.updateMsgTwo(0, 0, 'loss');
        }
        
    }
    const initiate = () => {
        myViewController.setUpView(game, processUserInput);
    }
    
    return { initiate, processUserInput, getShipGrid };
}

export { 
    websiteManagerFactory
};