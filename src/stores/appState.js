
import React from 'react'
import ReactDOM from 'react-dom'
import Immreact from 'immreact'
import toMap from 'to-map'

import logger from 'utils/logger'
import appDispatcher from 'dispatchers/appDispatcher'
import EVENTS from 'constants/events'

import StateFactory from 'stores/stateFactory'


const _state = Symbol( 'state' )
const _render = Symbol( 'render' )
const STATE_ID = 'app'



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
         * App state
         */
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
            ReactDOM.render( this.factory.get( this[ _state ].get([ STATE_ID, 'currentState' ]) ), this.el )
        }

        /**
         * Set up app dispatch listener
         */
        appDispatcher.register( dispatch => {
            // Convert to get function to execute on dispatch
            if ( dispatch.type === EVENTS.get( 'CHANGE_STATE' ) ) {
                this[ _state ].cursor([ STATE_ID, 'currentState' ] ).update( cursor => {
                    return dispatch.payload.requestedStateID
                })
            }
        })
    }

    /**
     * Returns state for stores to allow mutation
     * @TODO should this be clamped to only privileged classes?
     */
    get() {
        return this[ _state ]
    }


    /**
     * Sets up the render listener and starts things off
     * Akin to App.run in other frameworks
     * @param el <DOMElement> element to render into
     */
    run( el ) {
        this.el = el || document.querySelector( '.js-app' )

        // Register render function
        this[ _state ].on( 'update', this[ _render ] )

        // Initial render
        this[ _render ]()
    }
}

export default new AppState()
