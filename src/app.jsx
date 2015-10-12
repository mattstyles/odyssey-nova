

import React from 'react'
import ReactDOM from 'react-dom'

import logger from 'utils/logger'
import dispatcher from 'dispatchers/appDispatcher'

import Main from 'main/main'


function render() {
    ReactDOM.render( <App />, document.querySelector( '.js-app' ) )
}


class App extends React.Component {
    constructor( props ) {
        super( props )
    }

    render() {

        // @TODO switch game state here

        return (
            <div className="container u-fit">
                <Main canvas="main" />
            </div>
        )
    }
}

logger.info( 'Bootstrapping...' )
render()
