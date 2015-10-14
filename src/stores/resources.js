
import path from 'path'

import Preloader from 'preload.io'
import PixiLoader from 'preload.io-pixi'


class Resources {
    constructor() {
        this.preloader = new Preloader()
        this.preloader.register( new PixiLoader() )
    }

    loadTextures() {
        return new Promise( ( resolve, reject ) => {
            this.textures = new Map()

            let toLoad = [ 'circle4.png' ]
            toLoad.forEach( url => {
                this.preloader.load({
                    id: url,
                    resource: path.join( '/assets', url )
                })
            })

            this.preloader.on( 'load', resource => this.textures.set( resource.id, resource.texture ) )
            this.preloader.on( 'preload:complete', resources => resolve( resources ) )
        })
    }

    getTexture( id ) {
        return this.textures.get( id )
    }

}

export default new Resources()
