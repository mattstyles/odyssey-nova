

import React from 'react'
import ReactDOM from 'react-dom'

import dispatcher from './dispatchers/appDispatcher'


function render() {
    ReactDOM.render( <App />, document.querySelector( '.js-main' ) )
}


class App extends React.Component {
    constructor( props ) {
        super( props )
    }

    render() {
        return (
            <div className="container">
                <h1>Odyssey Nova</h1>
            </div>
        )
    }
}

render()
