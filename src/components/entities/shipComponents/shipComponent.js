
import materials from 'world/materials'

/**
 * Components hold most of the functional aspects of a ship
 * This is an abstract base class for components
 * @class
 */
export default class ShipComponent {
    constructor( opts ) {
        /**
         * Make it identifiable
         */
        this.id = opts.id || '_defaultID'

        /**
         * The component type, found at `constants/shipComponentTypes`
         */
        this.type = null

        /**
         * Most components have a physical location, this is the overall radius,
         * @TODO it should probably be calculated from the shape, which would also
         * account for non-circular components
         */
        this.radius = opts.radius || 10

        /**
         * Everything is made of something right? Unless its made of some nothing
         */
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
         * @TODO a proxy might be a good solution to monitor what the parent is
         * doing without any actual control over it
         */
        this.parent = null
    }

    /**
     * @TODO this should be unnecessary when this.radius disappears, just manipulate
     * the shape directly
     */
    setRadius( r ) {
        this.radius = r
        if ( this.shape ) {
            this.shape.radius = this.radius
        }
    }
}
