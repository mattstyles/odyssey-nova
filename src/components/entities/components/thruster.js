
import P2 from 'p2'

import SC_TYPES from 'constants/shipComponentTypes'
import logger from 'utils/logger'
import materials from 'world/materials'

export default class Thruster {
    constructor( opts ) {
        this.id = opts.id || '_default ID'
        this.type = SC_TYPES.get( 'THRUSTER' )
        this.material = opts.material || materials.get( 'metal' )
        this.radius = opts.radius || 10
        this.angle = Math.PI

        // @TODO magnitude should be calculated from angle and a value
        // so that the thruster can be rotated
        this.magnitude = opts.magnitude || [ 0, 150 ]
        this.offset = opts.offset || [ 0, 0 ]

        this.shape = new P2.Circle({
            radius: this.radius,
            material: this.material
        })
    }

    setRadius( r ) {
        this.radius = r
        this.shape.radius = this.radius
    }
}
