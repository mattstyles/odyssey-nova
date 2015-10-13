
import React from 'react'
import toMap from 'to-map'

import Bootstrap from 'bootstrap/bootstrap'
import Main from 'main/main'

const _states = Symbol( 'states' )

class AppState {
    constructor() {
        this[ _states ] = toMap({
            'BOOTSTRAP': <Bootstrap key="bs" />,
            'MAIN': <Main key="main" canvas="main" />
        })
    }

    get( state ) {
        try {
            return this[ _states ].get( state )
        } catch( err ) {
            throw new Error( 'State ' + state + ' not recognised' )
        }
    }
}

export default new AppState()
