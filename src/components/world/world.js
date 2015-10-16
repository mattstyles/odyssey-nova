
import Pixi from 'pixi.js'
import P2 from 'p2'

import materials from 'entities/materials'
import config from 'stores/config'

export default class World {
    constructor() {
        this.engine = new P2.World({
            gravity: [ 0, 0 ]
        })
        
        this.engine.addContactMaterial( materials.get( '_defaultContact' ) )

        this.container = new Pixi.Container()
        this.container.position.set( config.get( 'width' ) / 2, config.get( 'height' ) / 2 )

        // Keep as an array for now
        this.entities = []
    }

    addEntity( entity ) {
        this.engine.addBody( entity.body )
        this.container.addChild( entity.container )
        this.entities.push( entity )
    }

    update( dt ) {
        this.engine.step( dt )
        this.entities.forEach( entity => entity.update() )
    }

}
