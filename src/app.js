
import logger from 'utils/logger'
import appState from 'stores/appState'


// Let's go
appState.run( document.querySelector( '.js-app' ) )

if ( process.env.DEBUG ) {
    window.appState = appState
}
