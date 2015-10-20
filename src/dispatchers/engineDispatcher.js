
import { Dispatcher } from 'flux'
import { DispatchError } from 'constants/err'

/**
 * Handles dispatches related to the world engine
 * ---
 * @class
 */
class EngineDispatcher extends Dispatcher {
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
            console.error( 'Trying to call EngineDispatcher.dispatch without payload type' )
            throw new DispatchError( 'missing payload type' )
        }

        if ( !/^engine/.test( payload.type ) ) {
            console.error( 'Invalid payload type for EngineDispatcher' )
            throw new DispatchError( 'invalid payload type' )
        }

        super( payload )
    }
}

// Export singleton
export default new EngineDispatcher()
