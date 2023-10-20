import { 
    trafficControllerFactory
} from '../trafficController';
import { 
    shipFactory
} from '../shipFactory';
import { 
    shipGridFactory
} from '../shipGridFactory';

//let myShip = shipFactory(len, shipID ='noID', dir = 'south');
//const moveShip = (shipID, direction)

describe('unobstructed move', () => {
    let myShipGrid = shipGridFactory();

    let myShip = shipFactory(2, 1, 'east');
    myShipGrid.placeShip(myShip, 0, 5);

    let trafficController = trafficControllerFactory(
        myShipGrid.getShipGrid(),
        myShipGrid.getShipLocations(),
        myShipGrid.getShipArr());
        trafficController.moveShip(1, 'down');
    test('move down', () => {
        expect(trafficController.getError()).toEqual('');
        expect(trafficController.getLocationChange()).toEqual(
            {
                oldLocations: [{row: 0, col: 5}, {row: 0, col: 6}],
                newLocations: [{row: 1, col: 5}, {row: 1, col: 6}]
            }
        );
    })

})

describe('unobstructed move', () => {
    let myShipGrid = shipGridFactory();

    let myShip = shipFactory(2, 2, 'south');
    myShipGrid.placeShip(myShip, 7, 9);
    let trafficController = trafficControllerFactory(
        myShipGrid.getShipGrid(),
        myShipGrid.getShipLocations(),
        myShipGrid.getShipArr());
        trafficController.moveShip(2, 'down');
    test('move down', () => {
        expect(trafficController.getError()).toEqual('');
        expect(trafficController.getLocationChange()).toEqual(
            {
                oldLocations: [{row: 7, col: 9}, {row: 8, col: 9}],
                newLocations: [{row: 8, col: 9}, {row: 9, col: 9}]
            }
        );
    })
    
})

describe('unobstructed move', () => {
    let myShipGrid = shipGridFactory();

    let myShip = shipFactory(3, 3, 'south');
    myShipGrid.placeShip(myShip, 3, 4);
    let trafficController = trafficControllerFactory(
        myShipGrid.getShipGrid(),
        myShipGrid.getShipLocations(),
        myShipGrid.getShipArr());
        trafficController.moveShip(3, 'right');
    test('move right', () => {
        expect(trafficController.getError()).toEqual('');
        expect(trafficController.getLocationChange()).toEqual(
            {
                oldLocations: [{row: 3, col: 4}, {row: 4, col: 4}, {row: 5, col: 4}],
                newLocations: [{row: 3, col: 5}, {row: 4, col: 5}, {row: 5, col: 5}]
            }
        );
    })
    
})

describe('unobstructed move', () => {
    let myShipGrid = shipGridFactory();

    let myShip = shipFactory(1, 4, 'south');
    myShipGrid.placeShip(myShip, 6, 6);
    let trafficController = trafficControllerFactory(
        myShipGrid.getShipGrid(),
        myShipGrid.getShipLocations(),
        myShipGrid.getShipArr());
        trafficController.moveShip(4, 'left');
    test('move left', () => {
        expect(trafficController.getError()).toEqual('');
        expect(trafficController.getLocationChange()).toEqual(
            {
                oldLocations: [{row: 6, col: 6}],
                newLocations: [{row: 6, col: 5}]
            }
        );
    })
    
})

describe('out of bounds move', () => {
    let myShipGrid = shipGridFactory();

    let myShip = shipFactory(1, 5, 'south');
    myShipGrid.placeShip(myShip, 6, 0);
    let trafficController = trafficControllerFactory(
        myShipGrid.getShipGrid(),
        myShipGrid.getShipLocations(),
        myShipGrid.getShipArr());
        trafficController.moveShip(5, 'left');
    test('move left', () => {
        expect(trafficController.getError()).toEqual('outOfBounds');
        expect(trafficController.getLocationChange()).toEqual({});
    })
    
})

describe('out of bounds move', () => {
    let myShipGrid = shipGridFactory();

    let myShip = shipFactory(3, 6, 'east');
    myShipGrid.placeShip(myShip, 8, 7);
    let trafficController = trafficControllerFactory(
        myShipGrid.getShipGrid(),
        myShipGrid.getShipLocations(),
        myShipGrid.getShipArr());
        trafficController.moveShip(6, 'right');
    test('move right', () => {
        expect(trafficController.getError()).toEqual('outOfBounds');
        expect(trafficController.getLocationChange()).toEqual({});
    })
    
})

describe('out of bounds move', () => {
    let myShipGrid = shipGridFactory();

    let myShip = shipFactory(2, 7, 'east');
    myShipGrid.placeShip(myShip, 0, 2);
    let trafficController = trafficControllerFactory(
        myShipGrid.getShipGrid(),
        myShipGrid.getShipLocations(),
        myShipGrid.getShipArr());
        trafficController.moveShip(7, 'up');
    test('move up', () => {
        expect(trafficController.getError()).toEqual('outOfBounds');
        expect(trafficController.getLocationChange()).toEqual({});
    })
    
})

describe('out of bounds move', () => {
    let myShipGrid = shipGridFactory();

    let myShip = shipFactory(4, 8, 'south');
    myShipGrid.placeShip(myShip, 6, 8);
    let trafficController = trafficControllerFactory(
        myShipGrid.getShipGrid(),
        myShipGrid.getShipLocations(),
        myShipGrid.getShipArr());
        trafficController.moveShip(8, 'down');
    test('move down', () => {
        expect(trafficController.getError()).toEqual('outOfBounds');
        expect(trafficController.getLocationChange()).toEqual({});
    })
    
})

describe('space violation move', () => {
    let myShipGrid = shipGridFactory();

    let myShip = shipFactory(4, 9, 'south');
    myShipGrid.placeShip(myShip, 6, 8);

    let myShip2 = shipFactory(1, 10, 'south');
    myShipGrid.placeShip(myShip2, 6, 7);

    let trafficController = trafficControllerFactory(
        myShipGrid.getShipGrid(),
        myShipGrid.getShipLocations(),
        myShipGrid.getShipArr());
        trafficController.moveShip(9, 'left');
    test('move left', () => {
        expect(trafficController.getError()).toEqual('spaceViolation');
        expect(trafficController.getLocationChange()).toEqual({});
    })
    
})

describe('space violation move', () => {
    let myShipGrid = shipGridFactory();

    let myShip = shipFactory(4, 9, 'south');
    myShipGrid.placeShip(myShip, 6, 8);

    let myShip2 = shipFactory(1, 10, 'south');
    myShipGrid.placeShip(myShip2, 6, 6);

    let trafficController = trafficControllerFactory(
        myShipGrid.getShipGrid(),
        myShipGrid.getShipLocations(),
        myShipGrid.getShipArr());
        trafficController.moveShip(9, 'left');
    test('move left', () => {
        expect(trafficController.getError()).toEqual('spaceViolation');
        expect(trafficController.getLocationChange()).toEqual({});
    })
    
})

describe('space violation move', () => {
    let myShipGrid = shipGridFactory();

    let myShip = shipFactory(3, 1, 'east');
    myShipGrid.placeShip(myShip, 5, 3);

    let myShip2 = shipFactory(1, 2, 'south');
    myShipGrid.placeShip(myShip2, 3, 6);

    let myShip3 = shipFactory(1, 3, 'south');
    myShipGrid.placeShip(myShip3, 7, 6);

    let trafficController = trafficControllerFactory(
        myShipGrid.getShipGrid(),
        myShipGrid.getShipLocations(),
        myShipGrid.getShipArr());
        trafficController.moveShip(1, 'right');
    test('sufficient space', () => {
        expect(trafficController.getError()).toEqual('');
        expect(trafficController.getLocationChange()).toEqual(
            {
                oldLocations: [{row: 5, col: 3}, {row: 5, col: 4}, {row: 5, col: 5}],
                newLocations: [{row: 5, col: 4}, {row: 5, col: 5}, {row: 5, col: 6}]
            }
        );
    })
    
})