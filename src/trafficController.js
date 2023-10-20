const trafficControllerFactory = (shipGridIn, shipLocationsIn, shipArrIn) => {
    let shipGrid = shipGridIn;
    let shipLocations = shipLocationsIn;
    let shipArr = shipArrIn;

    let error = 'none';
    let locationChange = {};
    let possibleMove = false;

    const getNewLocations = (oldLocations, direction) => {
        let newLocations = [];
        let rowMod = 0;
        let colMod = 0;
        switch(direction){
            case 'up':
                rowMod = -1;
                break;
            case 'down':
                rowMod = 1;
                break;
            case 'left':
                colMod = -1;
                break;
            case 'right':
                colMod = 1;
                break;
        }
        for(let location of oldLocations){
            let row = location.row + rowMod;
            let col = location.col + colMod;
            newLocations.push({row, col});
        }
        return newLocations;
    }

    const isOutOfBoundsCoord = (row, col) => {
        return row < 0 || row >= 10 || col < 0 || col >= 10;
    }

    const isOutOfBounds = (newLocations) => {
        for(let location of newLocations){
            if(isOutOfBoundsCoord(location.row, location.col)){
                return true;
            }
        }
        return false;
    }

    const resetLocationChange = () => {
        locationChange = {};
    }

    //check if another ship is too close to the proposed location
    //a ship is too close if it is adjacent, there should be one space
    const isSpaceViolationCell = (row, col, shipID) => {
        if( isOutOfBoundsCoord(row, col) ||
            shipGrid[row][col] === null){
            return false;
        }
        return shipGrid[row][col].getID() !== shipID;
    }

    const isSpaceViolation = (shipID, newLocations) => {
        for(let location of newLocations){
            let row = location.row;
            let col = location.col;
            if(isSpaceViolationCell(row - 1, col + 1, shipID)) return true;
            if(isSpaceViolationCell(row    , col + 1, shipID)) return true;
            if(isSpaceViolationCell(row + 1, col + 1, shipID)) return true;
            if(isSpaceViolationCell(row + 1, col    , shipID)) return true;
            if(isSpaceViolationCell(row + 1, col - 1, shipID)) return true;
            if(isSpaceViolationCell(row    , col - 1, shipID)) return true;
            if(isSpaceViolationCell(row - 1, col - 1, shipID)) return true;
            if(isSpaceViolationCell(row - 1, col    , shipID)) return true;
        }
        return false;
    }

    const removeOldLocation = (shipID, oldLocations) => {
        for(let location of oldLocations){
            shipGrid[location.row][location.col] = null;
        }
        shipLocations[shipID] = [];
    }

    const markNewLocation = (shipID, newLocations) => {
        for(let location of newLocations){
            shipGrid[location.row][location.col] = shipArr[shipID - 1];

            shipLocations[shipID].push(structuredClone(location));
        }
    }

    const moveShip = (shipID, direction) => {

        let oldLocations = shipLocations[shipID];
        let newLocations = getNewLocations(oldLocations, direction);

        if(isOutOfBounds(newLocations)){
            error = 'outOfBounds';
            resetLocationChange();
            possibleMove = false;
            return;
        }
        if(isSpaceViolation(shipID, newLocations)){
            error = 'spaceViolation';
            resetLocationChange();
            possibleMove = false;
            return;
        }

        error = '';
        possibleMove = true;
        locationChange = {oldLocations, newLocations};
        removeOldLocation(shipID, oldLocations);
        markNewLocation(shipID, newLocations);
    }

    const getNewRotationLocations = (anchorLocation, newDirection) => {
        return [];
    }
    
    const rotateShip = (shipID) => {
        let ship = shipArr.get(shipID - 1);
        let oldDirection = ship.getDirection();
        let newDirection = oldDirection === 'south' ? 'east' : 'south';
        let oldLocations = shipLocations[shipID - 1];
        let newLocations = getNewRotationLocations(oldLocations[0], newDirection);
        
        if(isOutOfBounds(newLocations)){
            error = 'outOfBounds';
            resetLocationChange();
            possibleMove = false;
            return;
        }
        if(isSpaceViolation(shipID, newLocations)){
            error = 'spaceViolation';
            resetLocationChange();
            possibleMove = false;
            return;
        }

        error = '';
        possibleMove = true;
        ship.setDirection(newDirection);/////////need to implement
        removeOldLocation(shipID, oldLocations);
        markNewLocation(shipID, newLocations);
    }

    const getError = () => {
        return error;
    }

    const getLocationChange = () => {
        return locationChange;
    }

    return { moveShip, rotateShip, getError, getLocationChange }
}

export {
    trafficControllerFactory
}