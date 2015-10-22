
import SC_TYPES from 'constants/shipComponentTypes'

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
