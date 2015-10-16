
import logger from 'utils/logger'
import appState from 'stores/appState'

import resources from 'stores/resources'

// Let's go
appState.run( document.querySelector( '.js-app' ) )

if ( process.env.DEBUG ) {
    window.appState = appState

    window.resources = resources

    window.Pixi = require( 'pixi.js' )
    window.P2 = require( 'p2' )
}
