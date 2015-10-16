
import Pixi from 'pixi.js'
import P2 from 'p2'

import Bullet from 'entities/bullet'
import materials from 'entities/materials'
import config from 'stores/config'

import { XOR } from 'utils/logical'

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

        // Play with detecting collisions
        this.engine.on( 'impact', event => {
            // XNOR
            if ( !XOR( event.bodyA instanceof Bullet, event.bodyB instanceof Bullet ) ) {
                // Not a bullet involved, ignore for now
                return
            }

            let bullet = event.bodyA instanceof Bullet ? event.bodyA : event.bodyB

            this.engine.removeBody( bullet )
            this.container.removeChild( bullet.container )

            // Need a way to get an entity from the entities array by searching through
            // the bodies, need a good way and then can effectively remove an entity
            // from both the engine and the render container
        })
    }

    addEntity( entity ) {
        this.engine.addBody( entity )
        this.container.addChild( entity.container )
        this.entities.push( entity )
    }

    update( dt ) {
        this.engine.step( dt )
        this.entities.forEach( entity => entity.update() )
    }

}
