
import Pixi from 'pixi.js'
import canvas from './canvas'
import config from 'stores/config'


/**
 * Creates and manages a list of Pixi.renderers
 */
class RenderManager {
    constructor() {
        this.renderers = new Map()
    }

    create( id = 'js-main', view = null ) {
        let renderer = new Pixi.autoDetectRenderer( config.get( 'width' ), config.get( 'height' ), {
            antialiasing: false,
            transparency: false,
            resolution: config.get( 'dp' ),
            view: view || canvas.get()
        })
        this.renderers.set( id, renderer )
        return renderer
    }

    get( id ) {
        if ( !this.renderers.has( id ) ) {
            return this.create( id )
        }

        return this.renderers.get( id )
    }
}

export default new RenderManager()
