import { 
    shipGridFactory
} from './shipGridFactory';

import { 
    attackGridFactory
} from './attackGridFactory';

import { 
    computerTargetingAIFactory
} from './computerTargeting';

const gameMasterFactory = () => {

    const board_player_ships = shipGridFactory();
    const board_computer_ships = shipGridFactory();

    const board_player_attacks = attackGridFactory();
    const board_computer_attacks = attackGridFactory();

    let playerTurnResult = '';
    let computerTurnResult = '';

    board_player_ships.initDefaultShips();
    board_computer_ships.initDefaultShips();
    const computerTargetingAI = computerTargetingAIFactory(board_computer_attacks);
    let attackLocation;
    
    const getShipGrid = () => {
        return board_player_ships.getShipGrid();
    }

    const processUserInput = (row , col) => {
        //console.log(`Valid player attack (${row}, ${col}): ${board_player_attacks.isValidAttack(row, col)}`);
        if(!board_player_attacks.isValidAttack(row, col)){
            return;
        }
        board_computer_ships.receiveAttack(row, col);
        playerTurnResult = board_computer_ships.getOutcome();
        board_player_attacks.recordAttack(row, col);
    }

    const isAttackableByPlayer = (row, col) => {
        return board_player_attacks.isValidAttack(row, col);
    }

    const winCheckPlayer = () => {
        return board_computer_ships.isDefeated();
    }

    const winCheckComputer = () => {
        return board_player_ships.isDefeated();
    }

    const isShipPresentAt = (row, col, target) => {
        let board = target === 'computer' ? board_computer_ships : board_player_ships;
        return board.isShipPresentAt(row, col);
    }

    const processComputerAttack = () => {
        let target = computerTargetingAI.pickTargetSimple();
        //console.log(`Valid computer attack (${target.row}, ${target.col}): ${board_computer_attacks.isValidAttack(target.row, target.col)}`);
        if(!board_computer_attacks.isValidAttack(target.row, target.col)){
            console.log('game master: processComputerAttackError');
            return;
        }
        board_player_ships.receiveAttack(target.row, target.col);
        computerTurnResult = board_player_ships.getOutcome();
        board_computer_attacks.recordAttack(target.row, target.col);
        return target;
    }

    const getPlayerTurnResult = () => {
        return playerTurnResult;
    }

    const getComputerTurnResult = () => {
        return computerTurnResult;
    }

    return { 
        getShipGrid, 
        processUserInput, 
        isAttackableByPlayer, 
        winCheckPlayer, 
        winCheckComputer, 
        isShipPresentAt,
        processComputerAttack,
        getPlayerTurnResult,
        getComputerTurnResult
    };
}


export { 
    gameMasterFactory
};