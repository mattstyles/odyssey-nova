

import React from 'react'
import ReactDOM from 'react-dom'

import logger from 'utils/logger'
import dispatcher from 'dispatchers/appDispatcher'


function render() {
    ReactDOM.render( <App />, document.querySelector( '.js-app' ) )
}


class App extends React.Component {
    constructor( props ) {
        super( props )
    }

    render() {
        return (
            <div className="container u-fit">
                <h1>Odyssey Nova</h1>
            </div>
        )
    }
}

logger.info( 'Bootstrapping...' )
render()
