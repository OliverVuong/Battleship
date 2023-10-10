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
    return { 
        getHitsSustained,
        hit,
        isSunk,
        getLength,
        getDirection,
        getID 
    };
}

export {
    shipFactory
}