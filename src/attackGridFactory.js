const attackGridFactory = () => {
    const attacks = Array(10).fill().map(() => Array(10).fill(null));

    const inBounds = (row, col) => {
        return row >= 0 && row < 10 && col >= 0 && col < 10;
    }

    const isValidAttack = (row, col) => {
        return inBounds(row, col) && attacks[row][col] === null;
    }

    const recordAttack = (row, col) => {
        attacks[row][col] = 'hit';
    }

    return { isValidAttack, recordAttack };
}

export{
    attackGridFactory
}