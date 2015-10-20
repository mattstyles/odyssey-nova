
import P2 from 'p2'
import Pixi from 'pixi.js'

import compose from 'utils/compose'
import PhysicalEntity from 'entities/physical'
import DebugModule from 'entities/modules/debug'


/**
 * @class
 */
export default class Projectile extends compose(
    PhysicalEntity.compose,
    DebugModule ) {

    /**
     * @constructs
     */
    constructor( opts = {} ) {
        super( opts )

        // Setting body.damping to 0 isnt as effective as a fully kinematic body
        // but it is a perf boost and allows mass-based collision response to
        // occur which is probably desirable
        this.body.damping = 0

        // Turning off angular damping also gives a perf boost (damping and
        // angular damping at 0 is a good fps gain) but there is a consideration:
        // Currently bullet velocity is worked out by taking ship angle and
        // velocity and simply increasing it, meaning that the bullets own angle
        // doesnt matter, therefore it can spin (some visual effects could rely
        // on this spinning), this should be ok even if a large force is added to
        // it when it fires (like a real gun). However, if the bullet adds force
        // during its lifetime, like a rocket, then it'll need some angular damping.
        // Thats probably cool though as rocket-type projectiles wont fire as
        // often (they might also need targeting or tracking AI depending on the
        // type of rocket)
        this.body.angularDamping = 0

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

        // Set up a shape and a debug level, will this get overwritten by mixin?
        this.addShape( new P2.Circle({
            radius: .75
        }))

        this._debug = true
        this.render()

    }

    update() {
        super()
    }
}
