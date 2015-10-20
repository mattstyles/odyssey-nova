
import toMap from 'to-map'

import Hull from 'entities/components/hull'
import materials from 'world/materials'

const _comps = Symbol( '_components' )

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
        this[ _comps ] = new toMap({
            'defaultHull': () => new Hull({
                id: 'defaultHull',
                radius: 15,
                material: materials.get( 'metal' )
            }),
            'userHull': () => new Hull({
                id: 'userHull',
                radius: 10,
                material: materials.get( 'metal' )
            }),
            'cruiserHull': () => new Hull({
                id: 'cruiserHull',
                radius: 40,
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
