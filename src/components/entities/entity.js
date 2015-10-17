
import Pixi from 'pixi.js'
import P2 from 'p2'
import random from 'lodash.random'

import materials from 'world/materials'


/**
 * Entity is a fairly abstract class, usually it’ll be instantiated with either
 * a body (ShellEntity), a renderable (GhostEntity) or both (PhysicalEntity).
 */
export default class Entity {
    constructor( opts = {} ) {
        // Id is assigned when the entity joins an engine
        this.id = null

        // All entities need a position
        this.position = opts.position || [ 0, 0 ]
    }

    /**
     * Each entity in the world should have the capacity to perform a debug
     * render for stuff like position, size, orientation, forces etc
     */
    _debugRender() {
        // abstract
    }

    /**
     * Render is called as infrequently as possible, usually at instantiation
     * but also after entity mutations which alter appearance
     */
    render() {
        // abstract
    }

    /**
     * Entities usually need to update themselves. A world update sorts out
     * the physics update but those values will need bouncing back to the
     * renderable
     */
    update() {

    }
}


// export default class Entity {
//     constructor( options = {} ) {
//         opts = Object.assign({
//             radius: random( 10, 30 ),
//             mass: random( 1, 3 ),
//             position: [ 0, 0 ],
//             velocity: [ 0, 0 ],
//             angle: 0
//         }, options )
//
//         super( opts )
//
//
//
//         this.radius = opts.radius
//         this.interpolatedPosition = this.position
//         this.interpolatedAngle = this.angle
//
//
//         this.body = new P2.Body( opts )
//         this.sprite = new Pixi.Sprite()
//
//         this.addShape( new P2.Circle({
//             radius: this.radius,
//             material: materials.get( '_default' ),
//             position: [ 0, 0 ],
//             angle: this.angle + Math.PI * .5
//         }))
//
//         //Play with the damping
//         this.damping = .05
//         this.angularDamping = .01
//
//         this.container = new Pixi.Container()
//         this.graphics = new Pixi.Graphics()
//
//         this.container.addChild( this.graphics )
//     }
//
//     // All movement values are relative to graphics.position, which is body.position
//     _drawDebug() {
//         this.graphics.clear()
//
//         var drawCircle = ( x, y, r, angle ) => {
//             this.graphics.moveTo( x, y )
//             this.graphics.beginFill( 0xffffff, .1 )
//             this.graphics.drawCircle(
//                 x,
//                 y,
//                 r
//             )
//             this.graphics.endFill()
//             this.graphics.lineStyle( 1, 0xffffff, .3 )
//             this.graphics.arc(
//                 x,
//                 y,
//                 r,
//                 angle + Math.PI * .5, angle + Math.PI * 2.5, false
//             )
//             this.graphics.lineTo( x, y )
//         }
//
//         this.shapes.forEach( shape => {
//             drawCircle( shape.position[ 0 ], shape.position[ 1 ], shape.radius, shape.angle )
//         })
//
//     }
//
//     /**
//      * Moves visuals in line with the underlying physics body
//      */
//     update() {
//         this.graphics.position.set( ...this.interpolatedPosition )
//         this.graphics.rotation = this.interpolatedAngle
//
//         this.sprite.position.set( ...this.interpolatedPosition )
//         this.sprite.rotation = this.interpolatedAngle
//     }
// }
