
import P2 from 'p2'

import logger from 'utils/logger'
import materials from 'world/materials'

export default class Thruster {
    constructor( opts ) {
        this.id = opts.id || '_default ID'
        this.type = SC_TYPES.get( 'THRUSTER' )
        this.material = opts.material || materials.get( 'metal' )
        this.radius = opts.radius || 10
        this.magnitude = opts.magnitude || [ 0, 150 ]
        this.offset = opts.offset || [ 0, 0 ]

        this.shape = new P2.Circle({
            radius: this.radius,
            material: this.material
        })
    }
}
