
export default class Hardpoint {
    constructor( opts ) {
        this.id = opts.id || '_defaultHardpointID'
        /**
         * Holds a ref to the component currently mounted here
         */
        this.mounted = null

        this.offset = opts.offset || [ 0, 0 ]
    }

    mountComponent( component ) {
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
