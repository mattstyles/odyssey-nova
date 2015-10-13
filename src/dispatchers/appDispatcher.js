
import { Dispatcher } from 'flux'
import { DispatchError } from 'constants/err'

/**
 * Main dispatcher class
 * ---
 * @class
 */
class AppDispatcher extends Dispatcher {
    /**
     * @constructs
     */
    constructor() {
        super( arguments )
    }

    /**
     * AppDispatcher should only dispatch app events
     * @param payload <Object> type field is mandatory and should be an app event type
     */
    dispatch( payload ) {
        if ( !payload || !payload.type ) {
            console.error( 'Trying to call AppDispatcher.dispatch without payload type' )
            throw new DispatchError( 'missing payload type' )
        }

        if ( !/^app/.test( payload.type ) ) {
            console.error( 'Invalid payload type for AppDispatcher' )
            throw new DispatchError( 'invalid payload type' )
        }

        super.dispatch( payload )
    }
}

// Export singleton
export default new AppDispatcher()
