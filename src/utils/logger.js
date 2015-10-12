
import toMap from 'to-map'
import noop from 'utils/noop'

/**
 * Wrapper for collecting logs
 */

/**
 * @const
 * Map log levels to console logging
 */
const logMethods = toMap({
    'fatal': { console: 'error', level: 60 },
    'error': { console: 'error', level: 50 },
    'warn': { console: 'warn', level: 40 },
    'info': { console: 'log', level: 30 },
    'debug': { console: 'info', level: 20 },
    'trace': { console: 'info', level: 10 }
})


/**
 * Wrapper for console
 * Tolerates IE9 by providing noops
 * @TODO manually set level to emit, or just use bunyan for structure
 * @TODO punt to an external log file or indexeddb/localstorage
 * @class
 */
class Logger {
    /**
     * @constructs
     */
    constructor( opts ) {
        opts = Object.assign({
            level: 'error'
        }, opts )

        // Grab the loglevel from the log method map for the specified level
        let logLevel = logMethods.get( opts.level ).level

        // Attach log methods only if they exist
        logMethods.forEach( ( value, key ) => {
            // Set a noop if specified level is higher than allowed
            if ( value.level < logLevel ) {
                this[ key ] = noop
                return
            }

            // Otherwise assign console methods if they exist
            this[ key ] = console[ value.console ]
                ? Function.prototype.bind.call( console[ value.console ], console )
                : noop
        }, this )
    }
}

export default new Logger({
    level: process.env.DEBUG ? 'debug' : 'error'
})
