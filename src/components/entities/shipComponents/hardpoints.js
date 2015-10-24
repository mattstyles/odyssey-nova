
import SC_TYPES from 'constants/shipComponentTypes'

/**
 * Hard points hold reference points on ships that can mount ship components
 * Hardpoints accept only certain types of components, eventually they should
 * probably also only accept certain component levels i.e. a low-level hardpoint
 * can only accept low-level components etc etc
 * Some hard-points can add extra hardpoints i.e. the hull is critical as defines
 * the shape of the ship and the hardpoints it has
 */
export default class Hardpoint {
    constructor( opts ) {
        this.id = opts.id || '_defaultHardpointID'
        /**
         * Holds a ref to the component currently mounted here
         */
        this.mounted = null

        /**
         * Holds a set of the component types viable for mounting
         */
        this.viableMounts = new Set()

        /**
         * Offset from the center of the ship
         */
        this.offset = opts.offset || [ 0, 0 ]
    }

    mountComponent( component ) {
        if ( !this.viableMounts.has( component.type ) ) {
            throw new Error( 'Component ' + component.id + ' can not be mounted to hardpoint ' + this.id + '. Incorrect mount type' )
        }

        this.mounted = component
    }

    unmountComponent() {
        let component = this.mounted
        this.mounted = null
        return component
    }

    setOffset( x, y ) {
        this.offset = [ x, y ]
    }
}

export class HullHardpoint extends Hardpoint {
    constructor( opts ) {
        super( opts )
        this.viableMounts.add( SC_TYPES.get( 'HULL' ) )
    }
}

export class ThrusterHardpoint extends Hardpoint {
    constructor( opts ) {
        super( opts )
        this.viableMounts.add( SC_TYPES.get( 'THRUSTER' ) )
    }
}

export class TurretHardpoint extends Hardpoint {
    constructor( opts ) {
        super( opts )
        this.viableMounts.add( SC_TYPES.get( 'TURRET' ) )
    }
}
