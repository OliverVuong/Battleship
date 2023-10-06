import { 
    gameBoardFactory, shipFactory
} from '../index';

describe('place single ship', () => {
    let myBoard = gameBoardFactory();
    let myShip = shipFactory(1, 'testShip', 'south');
    myBoard.placeShip(myShip, 0, 0);

    test('single ship is alive when not hit', () => {
        expect(myBoard.isDefeated()).toBe(false);
    })
})

describe('destroy single ship', () => {
    let myBoard = gameBoardFactory();
    let myShip = shipFactory(1, 'testShip', 'south');
    myBoard.placeShip(myShip, 0, 0);
    myBoard.receiveAttack(0, 0);

    test('single ship is hit leading to defeat', () => {
        expect(myBoard.isDefeated()).toBe(true);
    })
})

describe('place double ship', () => {
    let myBoard = gameBoardFactory();
    let myShip = shipFactory(2, 'testShip', 'south');
    myBoard.placeShip(myShip, 3, 1);

    test('single ship is alive when not hit', () => {
        expect(myBoard.isDefeated()).toBe(false);
    })
})

describe('hit double ship once', () => {
    let myBoard = gameBoardFactory();
    let myShip = shipFactory(2, 'testShip', 'south');
    myBoard.placeShip(myShip, 3, 1);
    myBoard.receiveAttack(3, 1);

    test('double ship is only once player is not defeated', () => {
        expect(myBoard.isDefeated()).toBe(false);
    })
})

describe('sink double ship', () => {
    let myBoard = gameBoardFactory();
    let myShip = shipFactory(2, 'testShip', 'south');
    myBoard.placeShip(myShip, 3, 1);
    myBoard.receiveAttack(3, 1);
    myBoard.receiveAttack(4, 1);

    test('double ship sinks and player is defeated', () => {
        expect(myBoard.isDefeated()).toBe(true);
    })
})

describe('placing a ship eastwards/horizontally', () => {
    describe('place triple ship', () => {
        let myBoard = gameBoardFactory();
        let myShip = shipFactory(3, 'testShip', 'east');
        myBoard.placeShip(myShip, 7, 3);
        test('ship is not hit and player is not defeated', () => {
            expect(myBoard.isDefeated()).toBe(false);
        })
    })

    describe('hit triple ship once', () => {
        let myBoard = gameBoardFactory();
        let myShip = shipFactory(3, 'testShip', 'east');
        myBoard.placeShip(myShip, 7, 3);
        myBoard.receiveAttack(7, 3);
        test('ship is hit once and player is not defeated', () => {
            expect(myBoard.isDefeated()).toBe(false);
        })
    })

    describe('hit triple ship twice', () => {
        let myBoard = gameBoardFactory();
        let myShip = shipFactory(3, 'testShip', 'east');
        myBoard.placeShip(myShip, 7, 3);
        myBoard.receiveAttack(7, 3);
        myBoard.receiveAttack(7, 4);
        test('ship is hit twice and player is not defeated', () => {
            expect(myBoard.isDefeated()).toBe(false);
        })
    })

    describe('sink triple ship', () => {
        let myBoard = gameBoardFactory();
        let myShip = shipFactory(3, 'testShip', 'east');
        myBoard.placeShip(myShip, 7, 3);
        myBoard.receiveAttack(7, 3);
        myBoard.receiveAttack(7, 4);
        myBoard.receiveAttack(7, 5);
        test('ship is hit twice and player is not defeated', () => {
            expect(myBoard.isDefeated()).toBe(true);
        })
    })
})