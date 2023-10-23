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

    const getNewRotationLocations = (oldLocations, newDirection) => {
        let anchorLocation = oldLocations[0];
        let newLocations = [];
        let rowMod = 0;
        let colMod = 0;
        let row = anchorLocation.row;
        let col = anchorLocation.col;
        switch(newDirection){
            case 'south':
                rowMod = 1;
                break;
            case 'east':
                colMod = 1;
                break;
        }
        newLocations.push({row, col});
        for(let len = 1; len < oldLocations.length; len++){
            row = row + rowMod;
            col = col + colMod;
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

    const printGrid = (shipGrid) => {
        for(let row = 0; row < 10; row++){
            let rowStr = row + ": ";
            for(let col = 0; col < 10; col++){
                if(shipGrid[row][col]){
                    rowStr += shipGrid[row][col].getID()
                } else {
                    rowStr += '_';
                }
                rowStr += " ";
            }
            console.log(rowStr);
        }
    }

    //check if another ship is too close to the proposed location
    //a ship is too close if it is adjacent, there should be one space
    const isSpaceViolationCell = (row, col, shipID) => {
        //console.log(`row: ${row}, col: ${col}, shipID: ${shipID}`);
        if( isOutOfBoundsCoord(row, col) ||
            shipGrid[row][col] === null ||
            shipGrid[row][col] === undefined
            ){
            return false;
        }
        //printGrid(shipGrid);//////////
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
        /* console.log('here in mark new location')
        for(let i = 0; i < shipArr.length; i++){
            console.log(`index: ${i}, shipID: ${shipArr[i].getID()}`);
        } */
        for(let location of newLocations){
            shipGrid[location.row][location.col] = shipArr[shipID - 1];

            shipLocations[shipID].push(structuredClone(location));
        }
    }

    const moveShip = (shipID, direction) => {

        let oldLocations = structuredClone(shipLocations[shipID]);
        let newLocations = structuredClone(getNewLocations(oldLocations, direction));

        if(isOutOfBounds(newLocations)){
            error = 'outOfBounds';
            resetLocationChange();
            possibleMove = false;
            return;
        }
        //console.log(isSpaceViolation(shipID, newLocations));
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

    /* const getNewRotationLocations = (anchorLocation, newDirection) => {
        return [];
    } */
    
    const rotateShip = (shipID) => {
        let ship = shipArr[shipID - 1];
        let oldDirection = ship.getDirection();
        let newDirection = oldDirection === 'south' ? 'east' : 'south';
        let oldLocations = shipLocations[shipID];
        let newLocations = getNewRotationLocations(oldLocations, newDirection);
        
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
        ship.setDirection(newDirection);
        removeOldLocation(shipID, oldLocations);
        markNewLocation(shipID, newLocations);
    }

    const getError = () => {
        return error;
    }

    const getPossibleMove = () => {
        return possibleMove;
    }

    const getLocationChange = () => {
        return locationChange;
    }

    const getProposedLocation = (ship, row, col) => {
        let proposedLocation = [];

        let rowMod = ship.getDirection() === 'south' ? 1 : 0;
        let colMod = ship.getDirection() === 'east' ? 1 : 0;
        for(let i = 0; i < ship.getLength(); i++){
            proposedLocation.push({row, col});
            row = row + (rowMod);
            col = col + (colMod);
        }
        return proposedLocation;
    }

    const getSurroundingLocations = (ship, row, col) => {
        let surroundingLocations = [];
        let dir = ship.getDirection();
        let len = ship.getLength();
        if(dir === 'south'){
            surroundingLocations.push({row: row - 1, col: col    });
            surroundingLocations.push({row: row - 1, col: col - 1});
            surroundingLocations.push({row: row - 1, col: col + 1});
            for(let mod = 0; mod < len; mod++){
                surroundingLocations.push({row: row + mod, col: col - 1});
                surroundingLocations.push({row: row + mod, col: col + 1});
            }
            surroundingLocations.push({row: row + len, col: col});
            surroundingLocations.push({row: row + len, col: col - 1});
            surroundingLocations.push({row: row + len, col: col + 1});
        } else { //'east'
            surroundingLocations.push({row: row    , col: col - 1});
            surroundingLocations.push({row: row + 1, col: col - 1});
            surroundingLocations.push({row: row - 1, col: col - 1});
            for(let mod = 0; mod < len; mod++){
                surroundingLocations.push({row: row - 1, col: col + mod});
                surroundingLocations.push({row: row + 1, col: col + mod});
            }
            surroundingLocations.push({row: row    , col: col + len});
            surroundingLocations.push({row: row - 1, col: col + len});
            surroundingLocations.push({row: row + 1, col: col + len});
        }
        console.log('surroundsing of ship ' + ship.getID());
        console.log(surroundingLocations);
        return surroundingLocations;
    }

    const hasSpaceConflictFromLocations = (surroundingLocations) => {
        for(let location of surroundingLocations){
            if(isOutOfBoundsCoord(location.row, location.col)) continue;
            if(shipGrid[location.row][location.col] === null) continue;
            if(shipGrid[location.row][location.col] === undefined) continue;
            
            console.log('conflict ');
            console.log(shipGrid[location.row][location.col]);
            console.log(shipGrid[location.row][location.col].getID());
            console.log(location);
            return true;
        }
    }

    const hasSpaceConflict = (ship, row, col) => {
        return hasSpaceConflictFromLocations(getSurroundingLocations(ship, row, col));
    }

    return { 
        moveShip,
        rotateShip,
        getError,
        getPossibleMove, 
        getLocationChange,
        hasSpaceConflict,
        printGrid////////
    }
}

export {
    trafficControllerFactory
}