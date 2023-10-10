import { 
    setUpView,
    markAttack
} from './viewController';
import './style.css';

const shipFactory = (len, shipID ='noID', dir = 'south') => {
    const id = shipID;
    const length = len;
    const direction = dir;
    let hitsSustained = 0;
    let sunk = false;

    const getHitsSustained = () => {
        return hitsSustained;
    }
    const hit = () => {
        //console.log('hit');
        hitsSustained++;
        if(hitsSustained === length){
            sunk = true;
            //console.log('sunk');
        }
    }
    const isSunk = () => {
        return sunk;
    }
    const getLength = () => {
        return length;
    }
    const getDirection = () => {
        return direction;
    }
    const getID = () => {
        return id;
    }
    return { getHitsSustained, hit, isSunk, getLength, 
        getDirection, getID };
}

const gameBoardFactory = () => {
    const shipGrid = Array(10).fill().map(() => Array(10).fill(null));
    const attacks = Array(10).fill().map(() => Array(10).fill(null));
    const shipArr = [];

    const inBounds = (row, col) => {
        return row >= 0 && row < 10 && col >= 0 && col < 10;
    }

    const isValidShipPlacement = (ship, row, col) => {
        let rowMod = ship.getDirection() === 'south' ? 1 : 0;
        let colMod = ship.getDirection() === 'east' ? 1 : 0;
        for(let i = 0; i < ship.getLength(); i++){
            if(!inBounds(row, col)){
                return false;
            }
            if (shipGrid[row][col] != null){
                return false;
            }
            row = row + (rowMod);
            col = col + (colMod);
        }
        return true;
    }

    const placeShip = (ship, row, col) => {

        if(!isValidShipPlacement(ship, row, col)){
            throw new Error(`Failed to place ship ${ship.getID()} at row: ${row}, col: ${col}`);
        }

        shipArr.push(ship);
        let rowMod = ship.getDirection() === 'south' ? 1 : 0;
        let colMod = ship.getDirection() === 'east' ? 1 : 0;
        for(let i = 0; i < ship.getLength(); i++){
            shipGrid[row][col] = ship;
            row = row + (rowMod);
            col = col + (colMod);
        }
        
    }
    const receiveAttack = (row, col) => {
        attacks[row][col] = 'hit';
        if(shipGrid[row][col]){
            shipGrid[row][col].hit();
            //console.log(shipGrid[row][col].getID() + " was hit " + 
            //shipGrid[row][col].getHitsSustained() + " times.");
        }
    }

    const isValidAttack = (row, col) => {
        return inBounds(row, col) && attacks[row][col] === null;
    }
    const isDefeated = () => {
        for(let ship of shipArr){
            if(!ship.isSunk()){
                return false;
            }
        }
        return true;
    }

    const initDefaultShips = () => {
        let ship_1 = shipFactory( 4,'a', 'east');
        placeShip(ship_1, 0, 4);
        shipArr.push(ship_1);

        let ship_2 = shipFactory( 2,'b', 'south');
        placeShip(ship_2, 0, 9);
        shipArr.push(ship_2);

        let ship_3 = shipFactory( 2,'c', 'east');
        placeShip(ship_3, 2, 0);
        shipArr.push(ship_3);

        let ship_4 = shipFactory( 3,'d', 'south');
        placeShip(ship_4, 3, 4);
        shipArr.push(ship_4);

        let ship_5 = shipFactory( 1,'e', 'south');
        placeShip(ship_5, 3, 6);
        shipArr.push(ship_5);

        let ship_6 = shipFactory( 3,'f', 'south');
        placeShip(ship_6, 4, 9);
        shipArr.push(ship_6);

        let ship_7 = shipFactory( 2,'g', 'east');
        placeShip(ship_7, 5, 0);
        shipArr.push(ship_7);

        let ship_8 = shipFactory(1, 'h');
        placeShip(ship_8, 8, 0);
        shipArr.push(ship_8);

        let ship_9 = shipFactory(1, 'i');
        placeShip(ship_9, 9, 5);
        shipArr.push(ship_9);

        let ship_10 = shipFactory(1, 'j');
        placeShip(ship_10, 9, 9);
        shipArr.push(ship_10);
    }

    const getShipGrid = () => {
        return shipGrid;
    }

    const isSuccessfulAttack = (row, col) => {
        return isValidAttack(row, col) && shipGrid[row][col] != null;
    }

    return { 
        placeShip, 
        receiveAttack, 
        isValidAttack, 
        isDefeated, 
        initDefaultShips, 
        getShipGrid,
        isSuccessfulAttack
    };
}

const computerTargetingAIFactory = (board) => {
    let lastCoordinatesHit;
    let hitShip = false;
    let getRand = () => {
        return Math.floor(Math.random() * 10);
    }
    let pickTargetSimple = () => {
        let row = getRand();
        let col = getRand();
        while(!board.isValidAttack(row, col)){
            row = getRand();
            col = getRand();
        }
        return {row, col};
    }

    return { pickTargetSimple };

}



const gameMasterFactory = () => {
    const board_player = gameBoardFactory();
    const board_computer = gameBoardFactory();
    board_player.initDefaultShips();
    board_computer.initDefaultShips();
    const computerTargetingAI = computerTargetingAIFactory(board_computer);
    let attackLocation;
    const runGameLoop = () => {
        while(true){
            
            attackLocation = getPlayerAttackCoordinates();
            board_computer.receiveAttack(attackLocation.row, attackLocation.col);
            if(board_computer.isDefeated()){
                //handle computer victory
                break;
            }

            attackLocation = computerTargetingAI.pickTargetSimple();
            board_player.receiveAttack(attackLocation.row, attackLocation.col);
            if(board_player.isDefeated()){
                //handle computer victory
                break;
            }
        }
    }
    const getShipGrid = () => {
        return board_player.getShipGrid();
    }

    const processUserInput = (row , col) => {
        console.log(`Valid attack (${row}, ${col}): ${board_computer.isValidAttack(row, col)}`);
        if(!board_computer.isValidAttack(row, col)){
            return;
        }
        board_computer.receiveAttack(row, col);
    }

    const isValidAttack = (row, col) => {
        return board_computer.isValidAttack(row, col);
    }

    const winCheckPlayer = () => {
        return board_computer.isDefeated();
    }

    const winCheckComputer = () => {
        return board_player.isDefeated();
    }

    const isSuccessfulAttack = (row, col, target) => {
        let board = target === 'computer' ? board_computer : board_player;
        return board.isSuccessfulAttack(row, col);
    }

    return { 
        runGameLoop, 
        getShipGrid, 
        processUserInput, 
        isValidAttack, 
        winCheckPlayer, 
        winCheckComputer, 
        isSuccessfulAttack 
    };
}

//manages the game and the viewcontroller
const websiteManagerFactory = () => {
    let game = gameMasterFactory();
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
        //update player ship grid to show attack
        //win check
    }
    const initiate = () => {
        setUpView(game, processUserInput);
    }
    
    return { initiate, processUserInput, getShipGrid };
}


const site = websiteManagerFactory();
site.initiate();



export { 
    shipFactory,
    gameBoardFactory,
    gameMasterFactory
};