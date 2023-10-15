import {
    shipFactory
} from './shipFactory';

const shipGridFactory = () => {
    const shipGrid = Array(10).fill().map(() => Array(10).fill(null));
    const shipArr = [];
    const shipLocations = {};
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
            throw new Error(`Failed to place ship ${ship.getID()} at row: ${row}, col: ${col}`);
        }

        shipArr.push(ship);
        shipLocations[ship.getID()] = [];

        let rowMod = ship.getDirection() === 'south' ? 1 : 0;
        let colMod = ship.getDirection() === 'east' ? 1 : 0;
        for(let i = 0; i < ship.getLength(); i++){
            shipGrid[row][col] = ship;
            shipLocations[ship.getID()].push({row, col});
            row = row + (rowMod);
            col = col + (colMod);
        }
        console.log(shipLocations[ship.getID()]);
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

    const initDefaultShips = () => {
        let ship_1 = shipFactory( 4,'1', 'east');
        placeShip(ship_1, 0, 4);
        shipArr.push(ship_1);

        let ship_2 = shipFactory( 2,'2', 'south');
        placeShip(ship_2, 0, 9);
        shipArr.push(ship_2);

        let ship_3 = shipFactory( 2,'3', 'east');
        placeShip(ship_3, 2, 0);
        shipArr.push(ship_3);

        let ship_4 = shipFactory( 3,'4', 'south');
        placeShip(ship_4, 3, 4);
        shipArr.push(ship_4);

        let ship_5 = shipFactory( 1,'5', 'south');
        placeShip(ship_5, 3, 6);
        shipArr.push(ship_5);

        let ship_6 = shipFactory( 3,'6', 'south');
        placeShip(ship_6, 4, 9);
        shipArr.push(ship_6);

        let ship_7 = shipFactory( 2,'7', 'east');
        placeShip(ship_7, 5, 0);
        shipArr.push(ship_7);

        let ship_8 = shipFactory(1, '8');
        placeShip(ship_8, 8, 0);
        shipArr.push(ship_8);

        let ship_9 = shipFactory(1, '9');
        placeShip(ship_9, 9, 5);
        shipArr.push(ship_9);

        let ship_10 = shipFactory(1, '10');
        placeShip(ship_10, 9, 9);
        shipArr.push(ship_10);
    }
    
    const getShipGrid = () => {
        return shipGrid;
    }
    
    const isShipPresentAt = (row, col) => {
        return shipGrid[row][col] != null;
    }

    return { 
        placeShip, 
        getShipLocation,
        receiveAttack,
        getOutcome,
        isDefeated, 
        initDefaultShips, 
        getShipGrid,
        isShipPresentAt
    };
}

export {
    shipGridFactory
}