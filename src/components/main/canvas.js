
import config from 'stores/config'

/**
 * Creates and manages raw native canvas elements
 */
class CanvasManager {
    constructor() {
        this.canvases = new Map()
    }

    create( id = 'js-canvas', parent = document.body ) {
        if ( this.canvases.has( id ) ) {
            throw new Error( 'Canvas ID ' + id + ' already created' )
        }

        let canvas = parent.querySelector( '.' + id ) || document.createElement( 'canvas' )
        canvas.classList.add( id )
        canvas.width = config.get( 'width' ) * config.get( 'dp' )
        canvas.height = config.get( 'height' ) * config.get( 'dp' )
        Object.assign( canvas.style, {
            'width': config.get( 'width' ) + 'px',
            'height': config.get( 'height' ) + 'px',
            'z-index': 0
        })

        parent.appendChild( canvas )

        this.canvases.set( id, canvas )
        return canvas
    }

    get( id ) {
        if ( !this.canvases.has( id ) ) {
            return this.create()
        }

        return this.canvases.get( id )
    }
}

export default new CanvasManager()
