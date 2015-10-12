
import React from 'react'
import Stat from 'stats.js'

export default class Stats {
    constructor( stats ) {
        this.parent = document.createElement( 'div' )
        Object.assign( this.parent.style, {
            position: 'absolute',
            top: '2px',
            right: '2px',
            'z-index': 1000
        })

        document.body.appendChild( this.parent )

        this.stats = new Set()
        stats.forEach( statMode => {
            let s = new Stat()
            s.setMode( statMode )
            Object.assign( s.domElement.style, {
                float: 'left'
            })
            this.parent.appendChild( s.domElement )
            this.stats.add( s )
        })
    }

    begin() {
        this.stats.forEach( stat => {
            stat.begin()
        })
    }

    end() {
        this.stats.forEach( stat => {
            stat.end()
        })
    }
}
