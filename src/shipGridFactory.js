import {
    shipFactory
} from './shipFactory';
import {
    trafficControllerFactory
} from './trafficController';

const shipGridFactory = () => {
    const shipGrid = Array(10).fill().map(() => Array(10).fill(null));
    const shipArr = [];
    const shipLocations = {};
    const trafficController = trafficControllerFactory(shipGrid, shipLocations, shipArr);
    let outcome = '';

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
            trafficController.printGrid(shipGrid);
            console.log(`Direction: ${ship.getDirection()}`);
            throw new Error(`Failed to place ship ${ship.getID()} at row: ${row}, col: ${col}`);
        }

        //shipArr.push(ship);
        shipLocations[ship.getID()] = [];

        let rowMod = ship.getDirection() === 'south' ? 1 : 0;
        let colMod = ship.getDirection() === 'east' ? 1 : 0;
        for(let i = 0; i < ship.getLength(); i++){
            shipGrid[row][col] = ship;
            shipLocations[ship.getID()].push({row, col});
            row = row + (rowMod);
            col = col + (colMod);
        }
    }
    
    const getShipLocation = (shipID) => {
        return shipLocations[shipID];
    }
    
    const receiveAttack = (row, col) => {
        outcome = '';
        if(shipGrid[row][col]){
            shipGrid[row][col].hit();
            outcome = 'hit';
            if(shipGrid[row][col].isSunk()){
                outcome = 'sunk';
            }
        } else {
            outcome = 'miss'
        }
    }

    const getOutcome = () => {
        return outcome;
    }

    const isDefeated = () => {
        for(let ship of shipArr){
            if(!ship.isSunk()){
                return false;
            }
        }
        return true;
    }

    const createDefaultShips = () => {
        let ship_1 = shipFactory( 4,'1', 'east');
        let ship_2 = shipFactory( 2,'2', 'south');
        let ship_3 = shipFactory( 2,'3', 'east');
        let ship_4 = shipFactory( 3,'4', 'south');
        let ship_5 = shipFactory( 1,'5', 'south');
        let ship_6 = shipFactory( 3,'6', 'south');
        let ship_7 = shipFactory( 2,'7', 'east');
        let ship_8 = shipFactory(1, '8');
        let ship_9 = shipFactory(1, '9');
        let ship_10 = shipFactory(1, '10');

        shipArr.push(ship_1);
        shipArr.push(ship_2);
        shipArr.push(ship_3);
        shipArr.push(ship_4);
        shipArr.push(ship_5);
        shipArr.push(ship_6);
        shipArr.push(ship_7);
        shipArr.push(ship_8);
        shipArr.push(ship_9);
        shipArr.push(ship_10);
    }

    const placeDefaultStartingPos = () => {
        placeShip(shipArr[0], 0, 4);
        placeShip(shipArr[1], 0, 9);
        placeShip(shipArr[2], 2, 0);
        placeShip(shipArr[3], 3, 4);
        placeShip(shipArr[4], 3, 6);
        placeShip(shipArr[5], 4, 9);
        placeShip(shipArr[6], 5, 0);
        placeShip(shipArr[7], 8, 0);
        placeShip(shipArr[8], 9, 5);
        placeShip(shipArr[9], 9, 9);

    }

    const initDefaultShips = () => {
        createDefaultShips();
        placeDefaultStartingPos();
        /* 
        let ship_1 = shipFactory( 4,'1', 'east');
        placeShip(ship_1, 0, 4);
        //shipArr.push(ship_1);

        let ship_2 = shipFactory( 2,'2', 'south');
        placeShip(ship_2, 0, 9);
        //shipArr.push(ship_2);

        let ship_3 = shipFactory( 2,'3', 'east');
        placeShip(ship_3, 2, 0);
        //shipArr.push(ship_3);

        let ship_4 = shipFactory( 3,'4', 'south');
        placeShip(ship_4, 3, 4);
        //shipArr.push(ship_4);

        let ship_5 = shipFactory( 1,'5', 'south');
        placeShip(ship_5, 3, 6);
        //shipArr.push(ship_5);

        let ship_6 = shipFactory( 3,'6', 'south');
        placeShip(ship_6, 4, 9);
        //shipArr.push(ship_6);

        let ship_7 = shipFactory( 2,'7', 'east');
        placeShip(ship_7, 5, 0);
        //shipArr.push(ship_7);

        let ship_8 = shipFactory(1, '8');
        placeShip(ship_8, 8, 0);
        //shipArr.push(ship_8);

        let ship_9 = shipFactory(1, '9');
        placeShip(ship_9, 9, 5);
        //shipArr.push(ship_9);

        let ship_10 = shipFactory(1, '10');
        placeShip(ship_10, 9, 9);
        //shipArr.push(ship_10); */
    }

    const getRandomInt = (max) => {
        return Math.floor(Math.random() * max);
    }

    const clearGrid = () => {
        for(let row = 0; row < 10; row++){
            for(let col = 0; col < 10; col++){
                shipGrid[row][col] = null;
            }
        }
    }

    const clearShipLocations = () => {
        for(let member in shipLocations){
            delete shipLocations[member];
        }
    }

    const randomize = () => {
        clearGrid();
        clearShipLocations();
        for(let ship of shipArr){
            let row, col, dir;
            do {
                row = getRandomInt(10);
                col = getRandomInt(10);
                dir = getRandomInt(2) === 0 ? 'south' : 'east';
                ship.setDirection(dir);
            } while (
                !isValidShipPlacement(ship, row, col) || 
                trafficController.hasSpaceConflict(ship, row, col)
                );
            placeShip(ship, row, col);
        }
        console.log('reached');
        trafficController.printGrid(shipGrid);
    }
    
    const getShipGrid = () => {
        return shipGrid;
    }

    const getShipArr = () => {
        return shipArr;
    }

    const getShipLocations = () => {
        return shipLocations;
    }
    
    const isShipPresentAt = (row, col) => {
        return shipGrid[row][col] != null;
    }

    const moveShip = (shipID, direction) => {
        trafficController.moveShip(shipID, direction);
    }

    const rotateShip = (shipID) => {
        trafficController.rotateShip(shipID);
    }

    const getLocationChange = () => {
        return trafficController.getLocationChange();
    }

    const getErrorMsg = () => {
        return trafficController.getError();
    }

    const getPossibleMove = () => {
        return trafficController.getPossibleMove();
    }

    const printGrid = () => {
        trafficController.printGrid();
    }

    return { 
        placeShip, 
        getShipLocation,
        receiveAttack,
        getOutcome,
        isDefeated, 
        initDefaultShips, 
        randomize,
        getShipGrid,
        getShipArr,
        getShipLocations,
        isShipPresentAt,
        moveShip,
        rotateShip,
        getLocationChange,
        getErrorMsg,
        getPossibleMove,
        printGrid
    };
}

export {
    shipGridFactory
}