
import toMap from 'to-map'

const conf = Symbol( 'conf' )


/**
 * @class
 * Wrapper around a native map
 * Holds app-level config in a flat map, dont get fancy and use a nested structure,
 * its more trouble than its worth here
 */
class Config {
    constructor() {
        this[ conf ] = toMap({
            width: window.innerWidth,
            height: window.innerHeight,
            dp: window.devicePixelRatio,

            worldTime: 0
        })
    }

    set( key, value ) {
        this[ conf ].set( key, value )
        return this
    }

    has( key ) {
        return this[ conf ].has( key )
    }

    get( key ) {
        return this[ conf ].get( key )
    }
}

export default new Config()
