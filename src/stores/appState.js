
import React from 'react'
import ReactDOM from 'react-dom'
import Immreact from 'immreact'
import toMap from 'to-map'

import logger from 'utils/logger'

import Bootstrap from 'bootstrap/bootstrap'
import Main from 'main/main'


const _state = Symbol( 'state' )
const _render = Symbol( 'render' )
const STATE_ID = 'app'


/**
 * State factory
 * Creates the various high level application states and default data to accompany them
 * Creating data within each component is preferable (as this.state does), however,
 * to diff between states and use pure render functions everything needs to be passed
 * down as props so components can not create their own data as it must be passed.
 * @class
 */
class StateFactory {
    constructor( appState ) {
        this.appState = appState
    }

    get( id, opts ) {
        if ( this[ id ] ) {
            return this[ id ]( opts )
        }
    }

    bootstrap( opts ) {
        // Create default bootstrap data if none exists
        if ( !this.appState.get( 'bootstrap' ) ) {
            this.appState.create( 'bootstrap', {
                progress: []
            })
        }

        return <Bootstrap key="bs" state={ this.appState.cursor( 'bootstrap' ) } />
    }
}


/**
 * Holds the centralised immutable state of the application
 * Renders are triggered only by mutations to the state object
 * @class
 */
class AppState {
    /**
     * @constructs
     * Registers a new immutable state object and sets up the main render function
     * Nothing too outrageous will happen until the app is called to run
     */
    constructor() {
        this.el = null
        this.Component = null

        /**
         * App states
         */
        // this[ _state ] = new Immreact.State( STATE_ID, {
        //     states: {
        //         'BOOTSTRAP': <Bootstrap key="bs" />,
        //         'MAIN': <Main key="main" canvas="main" />,
        //
        //         'current': null
        //     }
        // })
        this[ _state ] = new Immreact.State()

        /**
         * App state factory
         */
        this.factory = new StateFactory( this[ _state ] )

        // Set default app state to bootstrap
        this[ _state ].create( STATE_ID, {
            currentState: 'bootstrap'
        })

        /**
         * Main app render function, can only be accessed by state mutation
         */
        this[ _render ] = () => {
            // Pass entire appState through to main app component
            //ReactDOM.render( <this.Component appState={ this[ _state ] } />, this.el )
            ReactDOM.render( this.factory.get( this[ _state ].get([ STATE_ID, 'currentState' ]) ), this.el )

        }
    }

    /**
     * Returns state for stores to allow mutation
     * @TODO should this be clamped to only privileged classes?
     */
    get() {
        return this[ _state ]
    }


    /**
     * Registers the main component and element to render to and sets up the render listener
     * Akin to App.run in other frameworks
     * @param Component <React.Component> main app component
     * @param el <DOMElement> element to render into
     */
    run( Component, el ) {
        if ( !Component ) {
            throw new Error( 'Main AppState Component to render must be specified' )
        }

        this.el = el || document.querySelector( '.js-app' )
        this.Component = Component

        // Register render function
        this[ _state ].on( 'update', this[ _render ] )

        // Initial render
        this[ _render ]()
    }
}

export default new AppState()
