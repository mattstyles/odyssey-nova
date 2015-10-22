
import P2 from 'p2'

import ShipComponent from 'entities/shipComponents/shipComponent'
import SC_TYPES from 'constants/shipComponentTypes'
import logger from 'utils/logger'
import materials from 'world/materials'

export default class Thruster extends ShipComponent {
    constructor( opts ) {
        super( opts )

        this.type = SC_TYPES.get( 'THRUSTER' )
        this.angle = Math.PI

        // @TODO magnitude should be calculated from angle and a value
        // so that the thruster can be rotated
        this.magnitude = opts.magnitude || [ 0, 150 ]
        // this.offset = opts.offset || [ 0, 0 ]

        this.shape = new P2.Circle({
            radius: this.radius,
            material: this.material
        })
    }
}
