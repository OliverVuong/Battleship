console.log('hello world')

const shipFactory = (len, dir = 'south') => {
    const length = len;
    const direction = dir;
    let hitsSustained = 0;
    let sunk = false;
    const getHitsSustained = () => {
        return hitsSustained;
    }
    const hit = () => {
        hitsSustained++;
        if(hitsSustained === length){
            sunk = true;
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
    return { getHitsSustained, hit, isSunk, getLength, getDirection };
}

const gameBoardFactory = () => {
    const shipGrid = Array(10).fill().map(() => Array(10).fill(null));
    const attacks = Array(10).fill().map(() => Array(10).fill(null));
    const shipArr = [];

    const isValidShipPlacement = (ship, row, col) => {
        let rowMod = ship.getDirection() === 'south' ? -1 : 0;
        let colMod = ship.getDirection() === 'east' ? 0 : 1;
        for(let i = 0; i < ship.getLength(); i++){
            let row = row + (rowMod * i);
            let col = col (colMod * i);
            if(row < 0 || col < 0 || row > 9 || col > 9){
                return false;
            }
            if (shipGrid[row][col] != null){
                return false;
            }
        }
        return true;
    }

    const placeShip = (ship, row, col) => {
        if(!isValidShipPlacement(ship, row, col)){
            throw new Error('Invalid Default Initiation');
        }
        shipArr.push(ship);
        let rowMod = ship.getDirection() === 'south' ? -1 : 0;
        let colMod = ship.getDirection() === 'east' ? 0 : 1;
        for(let i = 0; i < ship.getLength(); i++){
            shipGrid[row + (rowMod * i)][col (colMod * i)] = ship;
        }
        
    }
    const receiveAttack = (row, col) => {
        attacks[row][col] = 'hit';
    }

    const isValidAttack = (row, col) => {
        return attacks[row][col] === null;
    }
    const isDefeated = (shipArray) => {
        for(let ship of shipArray){
            if(!ship.isSunk()){
                return false;
            }
        }
        return true;
    }

    const initDefaultShips = () => {
        let ship_1 = shipFactory(4, 'east');
        placeShip(ship_1, 0, 4);
        shipArr.push(ship_1);

        let ship_2 = shipFactory(2, 'south');
        placeShip(ship_2, 0, 9);
        shipArr.push(ship_2);

        let ship_3 = shipFactory(2, 'east');
        placeShip(ship_3, 2, 0);
        shipArr.push(ship_3);

        let ship_4 = shipFactory(3, 'south');
        placeShip(ship_4, 3, 4);
        shipArr.push(ship_4);

        let ship_5 = shipFactory(1, 'south');
        placeShip(ship_5, 3, 6);
        shipArr.push(ship_5);

        let ship_6 = shipFactory(3, 'south');
        placeShip(ship_6, 4, 9);
        shipArr.push(ship_6);

        let ship_7 = shipFactory(2, 'east');
        placeShip(ship_7, 5, 0);
        shipArr.push(ship_7);

        let ship_8 = shipFactory(1);
        placeShip(ship_8, 8, 0);
        shipArr.push(ship_8);

        let ship_9 = shipFactory(1);
        placeShip(ship_9, 9, 5);
        shipArr.push(ship_9);

        let ship_10 = shipFactory(1);
        placeShip(ship_10, 9, 9);
        shipArr.push(ship_10);
    }

    return { receiveAttack, isValidAttack, isDefeated, initDefaultShips };
}


export { 
    shipFactory
};