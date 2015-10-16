
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

        // Keep as an array for now -is it even needed? We can grab bodies and containers
        // from their own lists to remove them, no need for more splicing
        // The engine.bodies list becomes the entity list
        //this.entities = []
        this.entities = this.engine.bodies

        // Play with detecting collisions
        this.engine.on( 'impact', event => {
            if ( !XOR( event.bodyA instanceof Bullet, event.bodyB instanceof Bullet ) ) {
                // Not a bullet involved, ignore for now
                // Or maybe 2 bullets? I've gone cross-eyed
                return
            }

            let bullet = event.bodyA instanceof Bullet ? event.bodyA : event.bodyB

            // If perf becomes an issue consider pooling rather than GC and create
            this.engine.removeBody( bullet )
            this.container.removeChild( bullet.container )
        })
    }

    addEntity( entity ) {
        this.engine.addBody( entity )
        this.container.addChild( entity.container )
        // this.entities.push( entity )
    }

    update( dt ) {
        this.engine.bodies.forEach( entity => entity.update() )
        this.engine.step( dt )
    }

}
