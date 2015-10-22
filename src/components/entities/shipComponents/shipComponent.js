
import materials from 'world/materials'

export default class ShipComponent {
    constructor( opts ) {
        this.id = opts.id || '_defaultID'
        this.type = null
        this.radius = opts.radius || 10
        this.material = opts.material || materials.get( 'metal' )

        /**
         * The p2.Shape associated with this component
         */
        this.shape = null

        /**
         * The parent this component is mounted to, null if unmounted
         * @TODO not sure I'm a fan of passing through the parent like this, feels
         * very dangerous, but some components need to know ship world position
         * and velocity. p2.vec2.toGlobalFrame might do position, but velocity
         * is trickier—e.g. turrets need velocity to add the velocity to bullets
         * they create
         */
        this.parent = null
    }

    setRadius( r ) {
        this.radius = r
        if ( this.shape ) {
            this.shape.radius = this.radius
        }
    }
}
