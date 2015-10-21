
import P2 from 'p2'

import ShipComponent from 'entities/shipComponents/shipComponent'
import materials from 'world/materials'
import SC_TYPES from 'constants/shipComponentTypes'

export default class Hull extends ShipComponent {
    constructor( opts ) {
        super( opts )
        
        this.type = SC_TYPES.get( 'HULL' )

        this.shape = new P2.Circle({
            radius: this.radius,
            material: this.material
        })
    }
}
