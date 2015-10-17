
import Pixi from 'pixi.js'
import P2 from 'p2'

import Bullet from 'entities/bullet'
import materials from 'entities/materials'
import config from 'stores/config'

import { XOR } from 'utils/logical'

const FRAMERATE = 1 / 60
const FRAME_SUBSTEPS = 10

function updateDebug( obj ) {
    // These are expensive for cycles, not sure its going to work like this
    appState.get().cursor([ 'main', 'debug', 'world' ]).update( cursor => {
        return cursor.merge( obj )
    })
}

export default class Engine {
    constructor() {
        this.world = new P2.World({
            gravity: [ 0, 0 ]
        })

        this.lastTime = null

        this.world.addContactMaterial( materials.get( '_defaultContact' ) )

        this.container = new Pixi.Container()
        this.container.position.set( config.get( 'width' ) / 2, config.get( 'height' ) / 2 )

        // Keep as an array for now -is it even needed? We can grab bodies and containers
        // from their own lists to remove them, no need for more splicing
        // The engine.bodies list becomes the entity list
        //this.entities = []
        this.entities = this.world.bodies

        // Play with detecting collisions
        this.world.on( 'impact', event => {
            if ( !XOR( event.bodyA instanceof Bullet, event.bodyB instanceof Bullet ) ) {
                // Not a bullet involved, ignore for now
                // Or maybe 2 bullets? I've gone cross-eyed
                return
            }

            let bullet = event.bodyA instanceof Bullet ? event.bodyA : event.bodyB

            // If perf becomes an issue consider pooling rather than GC and create
            this.world.removeBody( bullet )
            this.container.removeChild( bullet.container )
        })

        // Add a world debug prop
        appState.get().cursor([ 'main', 'debug' ]).update( cursor => {
            return cursor.merge({
                'world': {}
            })
        })
    }

    addEntity( entity ) {
        // @TODO draw the entity into the world container here
        this.world.addBody( entity )
        this.container.addChild( entity.container )
        // this.entities.push( entity )
    }

    update( dt ) {
        this.entities.forEach( entity => entity.update() )

        var t = performance.now() / 1000
        this.lastTime = this.lastTime || t

        this.world.step( FRAMERATE, t - this.lastTime, FRAME_SUBSTEPS )

        updateDebug({
            'entities': this.entities.length
        })
    }

}
