

import React from 'react'
import ReactDOM from 'react-dom'
import classify from 'underscore.string/classify'

import logger from 'utils/logger'
import appDispatcher from 'dispatchers/appDispatcher'
import EVENTS from 'constants/events'
import appState from 'stores/appState'

import Main from 'main/main'
import Bootstrap from 'bootstrap/bootstrap'


// function rootRender() {
//     ReactDOM.render( <App />, document.querySelector( '.js-app' ) )
// }


class App extends React.Component {
    constructor( props ) {
        super( props )

        //this.currentState = appState.get()
    }

    componentWillMount() {
        appDispatcher.register( dispatch => {
            // Convert to get function to execute on dispatch
            let method = 'on' + classify( dispatch.type
                .replace( ':', '-' )
                .replace( /^app/, '' ) )

            if ( this[ method ] ) {
                this[ method ]( dispatch.payload )
                return
            }

            logger.warn( 'App Dispatch not recognised ::', dispatch.type )
        })
    }

    /**
     * Transitions from the app loading state to the main app state
     */
    onBootstrapComplete() {
        this.currentState = appState.get( 'MAIN' )
        rootRender()
    }

    /**
     * Careful calling update, calling it multiple times in a render makes
     * bad times™ happen. As custodian of the root render function an update
     * requires a force flag to make sure you really know what you're doing.
     */
    onUpdate( payload ) {
        if ( !payload || !payload.force ) {
            logger.warn( 'Manually attempting to hit an update' )
            try {
                throw new Error( 'manual update triggered' )
            } catch( err ) {
                logger.info( err.stack )
            }
        }
        rootRender()
    }

    /**
     * Simple passthrough to render the current state
     */
    render() {
        // Return the current state
        return this.props.appState.get([ 'app', 'states', 'current' ]).toJS()
    }
}

// Let's go
appState.run( App, document.querySelector( '.js-app' ) )
