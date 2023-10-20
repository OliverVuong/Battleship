import { 
    shipGridFactory
} from '../shipGridFactory';

describe('gameboard', () => {
    
    let myBoard;

    beforeAll(() => {
        myBoard = shipGridFactory();
        myBoard.initDefaultShips();
        myBoard.receiveAttack(0, 4);
        myBoard.receiveAttack(0, 5);
        myBoard.receiveAttack(0, 6);
        myBoard.receiveAttack(0, 7);

        myBoard.receiveAttack(0, 9);
        myBoard.receiveAttack(1, 9);

        myBoard.receiveAttack(2, 0);
        myBoard.receiveAttack(2, 1);

        myBoard.receiveAttack(3, 4);
        myBoard.receiveAttack(4, 4);
        myBoard.receiveAttack(5, 4);

        myBoard.receiveAttack(3, 6);

        myBoard.receiveAttack(4, 9);
        myBoard.receiveAttack(5, 9);
        myBoard.receiveAttack(6, 9);

        myBoard.receiveAttack(5, 0);
        myBoard.receiveAttack(5, 1);

        myBoard.receiveAttack(8, 0);

        myBoard.receiveAttack(9, 5);

        myBoard.receiveAttack(9, 9);
    });

    it('valid attack on empty space', () => {
        expect(myBoard.isDefeated()).toBe(true);
    })
})