import { 
    shipFactory
} from '../index';

let testShipA;
let testShipB;
let testShipC;

describe('creating battleships', () => {

    beforeAll(() => {
        testShipA = shipFactory(1);
        testShipB = shipFactory(2);
        testShipC = shipFactory(4);
    });

    test('hits sustained on new shipA is 0', () => {
        expect(testShipA.getHitsSustained()).toBe(0);
    });
    test('hits sustained on new shipB is 0', () => {
        expect(testShipB.getHitsSustained()).toBe(0);
    });
    test('hits sustained on new shipC is 0', () => {
        expect(testShipC.getHitsSustained()).toBe(0);
    });

    test('new shipA is not sunk', () => {
        expect(testShipA.isSunk()).toBe(false);
    });
    test('new shipB is not sunk', () => {
        expect(testShipB.isSunk()).toBe(false);
    });
    test('new shipC is not sunk', () => {
        expect(testShipC.isSunk()).toBe(false);
    });
    
})


describe('battleships of length 1 sink after 1 hit', () => {

    beforeAll(() => {
        testShipA = shipFactory(1);
        testShipA.hit();
    }); 

    test('battleship of length 1 sinks after 1 hit', () => {
        expect(testShipA.getHitsSustained()).toBe(1);
        expect(testShipA.isSunk()).toBe(true);
    });
})


describe('battleships of length 2 survives up to 1 hit', () => {

    beforeAll(() => {
        testShipB = shipFactory(2);
    }); 
    beforeEach(() => {
        testShipB.hit();
    });

    test('length 2 ship survives 1 hit', () => {
        expect(testShipB.getHitsSustained()).toBe(1);
        expect(testShipB.isSunk()).toBe(false);
    });

    test('length 2 ship sinks after 2 hits', () => {
        expect(testShipB.getHitsSustained()).toBe(2);
        expect(testShipB.isSunk()).toBe(true);
    });
})


describe('battleships of length 4 survives up to 3 hits', () => {

    beforeAll(() => {
        testShipC = shipFactory(4);
    }); 
    beforeEach(() => {
        testShipC.hit();
    });

    test('length 4 ship survives 1 hit', () => {
        expect(testShipC.getHitsSustained()).toBe(1);
        expect(testShipC.isSunk()).toBe(false);
    });

    test('length 4 ship survives 2 hit', () => {
        expect(testShipC.getHitsSustained()).toBe(2);
        expect(testShipC.isSunk()).toBe(false);
    });

    test('length 4 ship survives 3 hit', () => {
        expect(testShipC.getHitsSustained()).toBe(3);
        expect(testShipC.isSunk()).toBe(false);
    });

    test('length 4 ship sinks after 4 hits', () => {
        expect(testShipC.getHitsSustained()).toBe(4);
        expect(testShipC.isSunk()).toBe(true);
    });
})