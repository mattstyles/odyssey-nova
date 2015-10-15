
import React from 'react'

import Bootstrap from 'bootstrap/bootstrap'
import Main from 'main/main'


/**
 * State factory
 * Creates the various high level application states and default data to accompany them
 * Creating data within each component is preferable (as this.state does), however,
 * to diff between states and use pure render functions everything needs to be passed
 * down as props so components can not create their own data as it must be passed.
 * @class
 */
export default class StateFactory {
    /**
     * @constructs
     * @param appState <Immreact.State> immutable centralised state object
     * Needs a ref to the appState object to pass high-level keys through to states
     */
    constructor( appState ) {
        this.appState = appState
    }

    /**
     * Returns a state if it exists by invoking a creation function
     * @param id <String> id's are referenced by string
     * @param opts <Object> options to pass to creation functions
     */
    get( id, opts ) {
        if ( this[ id ] ) {
            return this[ id ]( opts )
        }
    }

    /*-----------------------------------------------------------*
     *
     *  Creation functions
     *  ---
     *  Creates default data trees in the immutable state object
     *  if necessary and returns the state component
     *
     *-----------------------------------------------------------*/


    /**
     * The bootstrap state
     * Responsible for loading app resources and setting up the app
     */
    bootstrap( opts ) {
        let key = 'bootstrap'
        // Create default bootstrap data if none exists
        if ( !this.appState.get( key ) ) {
            this.appState.create( key, {
                progress: []
            })
        }

        return <Bootstrap key={ key } state={ this.appState.cursor( key ) } />
    }

    /**
     * Main
     * Here be dragons!
     */
    main( opts ) {
        let key = 'main'
        // Create default data if none exists
        if ( !this.appState.get( key ) ) {
            this.appState.create( key, {
                debug: {}
            })
        }

        return <Main
            key={ key }
            state={ this.appState.cursor( key ) }
            canvas={ key }
        />
    }
}
