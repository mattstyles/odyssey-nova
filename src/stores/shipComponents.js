
import toMap from 'to-map'

import Hull from 'entities/components/hull'
import materials from 'world/materials'

const _comps = Symbol( '_components' )

/**
 * Holds all the data regarding the different components that can be added to
 * ship entities
 * @class
 */
class ShipComponents {
    constructor() {
        this[ _comps ] = new toMap({
            'userHull': new Hull({
                id: 'userHull',
                radius: 10,
                material: materials.get( 'metal' )
            })
        })
    }

    get( id ) {
        return this[ _comps ].get( id )
    }
}

export default new ShipComponents()
