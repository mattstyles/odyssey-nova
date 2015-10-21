
import materials from 'world/materials'

export default class ShipComponent {
    constructor( opts ) {
        this.id = opts.id || '_defaultID'
        this.type = null
        this.radius = opts.radius || 10
        this.material = opts.material || materials.get( 'metal' )

        this.shape = null
    }

    setRadius( r ) {
        this.radius = r
        if ( this.shape ) {
            this.shape.radius = this.radius
        }        
    }
}
