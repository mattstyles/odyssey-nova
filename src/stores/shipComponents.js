
import toMap from 'to-map'

import Hull from 'entities/shipComponents/hull'
import Thruster from 'entities/shipComponents/thruster'
import Turret from 'entities/shipComponents/turret'
import materials from 'world/materials'

const _comps = Symbol( '_components' )

var uuid = 0
function getUuid() {
    return ++uuid
}

/**
 * Holds all the data regarding the different components that can be added to
 * ship entities.
 * All ids for components return functions which can be used to instantiate
 * new components. Creating new ones is important as p2.body.addShape requires
 * unique shapes to be added, so we can’t reuse components, which isn’t ideal
 * but should be fine.
 * @class
 */
class ShipComponents {
    constructor() {
        /**
         * @TODO this should be gathered from data stored externally
         */
        this[ _comps ] = new toMap({
            /**
             * Hulls
             */
            'defaultHull': () => new Hull({
                id: 'defaultHull' + getUuid(),
                radius: 15,
                material: materials.get( 'metal' )
            }),
            'userHull': () => new Hull({
                id: 'userHull' + getUuid(),
                radius: 10,
                material: materials.get( 'metal' )
            }),
            'cruiserHull': () => new Hull({
                id: 'cruiserHull' + getUuid(),
                radius: 40,
                material: materials.get( 'metal' )
            }),

            /**
             * Thrusters
             */
            'defaultThruster': () => new Thruster({
                id: 'defaultThruster' + getUuid(),
                radius: 5,
                magnitude: [ 0, 150 ],
                offset: [ 0, -1 ],
                material: materials.get( 'metal' )
            }),
            'megaThruster': () => new Thruster({
                id: 'megaThruster' + getUuid(),
                radius: 20,
                magnitude: [ 0, 350 ],
                offset: [ 0, -1 ],
                material: materials.get( 'metal' )
            }),

            /**
             * Turrets
             */
            'defaultTurret': () => new Turret({
                id: 'defaultTurret' + getUuid(),
                radius: 2,
                offset: [ 0, -1 ],
                material: materials.get( 'metal' )
            }),
            'peaShooter': () => new Turret({
                id: 'peaShooter' + getUuid(),
                radius: 2,
                offset: [ 0, -1 ],
                material: materials.get( 'metal' )
            })
        })
    }

    /**
     * Returns a new instance of the component
     * @param id <String> grabbing a new instance of component is done via name
     */
    get( id ) {
        return this[ _comps ].get( id )()
    }
}

export default new ShipComponents()
