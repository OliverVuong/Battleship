import { 
    gameBoardFactory,
    computerTargetingAIFactory
} from './index';

const gameMasterFactory = () => {

    const board_player = gameBoardFactory();
    const board_computer = gameBoardFactory();
    board_player.initDefaultShips();
    board_computer.initDefaultShips();
    const computerTargetingAI = computerTargetingAIFactory(board_computer);
    let attackLocation;
    
    const getShipGrid = () => {
        return board_player.getShipGrid();
    }

    const processUserInput = (row , col) => {
        console.log(`Valid player attack (${row}, ${col}): ${board_computer.isValidAttack(row, col)}`);
        if(!board_computer.isValidAttack(row, col)){
            return;
        }
        board_computer.receiveAttack(row, col);
    }

    const isValidAttack = (row, col) => {
        return board_computer.isValidAttack(row, col);
    }

    const winCheckPlayer = () => {
        return board_computer.isDefeated();
    }

    const winCheckComputer = () => {
        return board_player.isDefeated();
    }

    const isSuccessfulAttack = (row, col, target) => {
        let board = target === 'computer' ? board_computer : board_player;
        return board.isSuccessfulAttack(row, col);
    }

    const processComputerAttack = () => {
        let target = computerTargetingAI.pickTargetSimple();
        console.log(`Valid computer attack (${target.row}, ${target.col}): ${board_player.isValidAttack(target.row, target.col)}`);
        if(!board_player.isValidAttack(target.row, target.col)){
            console.log('game master: processComputerAttackError');
            return;
        }
        board_player.receiveAttack(target.row, target.col);
        return target;
    }

    return { 
        getShipGrid, 
        processUserInput, 
        isValidAttack, 
        winCheckPlayer, 
        winCheckComputer, 
        isSuccessfulAttack,
        processComputerAttack
    };
}


export { 
    gameMasterFactory
};