
import P2 from 'p2'
import Pixi from 'pixi.js'

import PhysicalEntity from 'entities/physical'



export default class Bullet extends PhysicalEntity {
    constructor( opts = {} ) {
        super( opts )

        // Setting body.damping to 0 isnt as effective as a fully kinematic body
        // but it is a perf boost and allows mass-based collision response to
        // occur which is probably desirable
        this.body.damping = 0

        // Kinematic might work with no collision response, certainly see a massive
        // fps boost with kinematic over dynamic bodies. The problem with kinematic
        // bodies is the massive mass
        // this.body.type = P2.Body.KINEMATIC

        // Turning off collision response actually doesnt save fps, in a quick
        // test fps was actually worse, but thats probably only indicative that
        // nuking response isnt going to help. When combined with a kinematic
        // body type it could work though as bullets/projectiles generally dont
        // require damping to be exerted (setting world damping off gives a big
        // perf boost, its damping thats expensive)
        // this.body.collisionResponse = false

        // @TODO set velocity to match that of firer
        // Easy enough, extract this into a craft class and use it on
        // craft.fire to create the bullet particle, then add velocity and
        // finally add a little more retro thrust to kick it out from the craft.
        // Can not just add force because acceleration is proportionate to force
        // over mass and the mass of the projectile will not match that of the
        // craft, resulting is massively higher acceleration.


        // Force is linked to mass, but this should all be controlled somewhere
        // else. To negate mass manually set velocity, but thats a bit shit.
        // This should probably be set by the firer based on some properties.
        //this.applyForceLocal( [ 0, .1 ] )

        // An option for bullets is to turn off collision response (body.collisionResponse)
        // which would fire events so kill bullet on event, but save
        // cycles on collision physics
        // Bullets should probably also be kinematic to save cycles, but
        // only if kinematic emit collision events - nope, they emit but they also
        // provide collisions, they just dont have force or damping and max mass
        // Bullets should almost certainly not collide with each other
    }

    update() {
        super()
    }
}
