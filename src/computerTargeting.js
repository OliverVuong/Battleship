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

export { 
    computerTargetingAIFactory
};