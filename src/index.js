console.log('hello world')

let shipFactory = (len) => {
    let length = len;
    let hitsSustained = 0;
    let sunk = false;
    let getHitsSustained = () => {
        return hitsSustained;
    }
    let hit = () => {
        hitsSustained++;
        if(hitsSustained === length){
            sunk = true;
        }
    }
    let isSunk = () => {
        return sunk;
    }
    return { getHitsSustained, hit, isSunk };
}


export { 
    shipFactory
};