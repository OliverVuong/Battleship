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
            console.log(`(${row}, ${col}) is invalid. Rerolling`)
            row = getRand();
            col = getRand();
        }
        console.log(`AI final target (${row}, ${col})`);
        return {row, col};
    }

    return { pickTargetSimple };
}

export { 
    computerTargetingAIFactory
};