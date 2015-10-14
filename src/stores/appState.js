
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
 * @class
 *
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
        this[ _state ] = new Immreact.State( STATE_ID, {
            states: {
                'BOOTSTRAP': <Bootstrap key="bs" />,
                'MAIN': <Main key="main" canvas="main" />,

                'current': <Bootstrap key="bs" />
            }
        })

        /**
         * Main app render function, can only be accessed by state mutation
         */
        this[ _render ] = function() {
            // Pass entire appState through to main app component
            ReactDOM.render( <this.Component appState={ this[ _state ] } />, this.el )
        }
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
