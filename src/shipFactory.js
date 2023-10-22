const shipFactory = (len, shipID ='noID', dir = 'south') => {
    const id = shipID;
    const length = len;
    let direction = dir;
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
    const setDirection = (newDirection) => {
        direction = newDirection;
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
    return { 
        getHitsSustained,
        hit,
        setDirection,
        isSunk,
        getLength,
        getDirection,
        getID 
    };
}

export {
    shipFactory
}