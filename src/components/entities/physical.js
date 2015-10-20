
import Pixi from 'pixi.js'
import P2 from 'p2'

import Entity from 'entities/entity'
import mixin from 'utils/mixin'

/**
 * A physical entity has both a renderable and a physics body.
 * In theory it should inherit from both Ghost and Shell but, JS being what it
 * is, its worth taking the risk of a clean implementation.
 * @class
 */
export default class PhysicalEntity extends Entity {
    /**
     * @constructs
     * @return this
     */
    constructor( options = {} ) {
        super( options )

        // Extend with defaults, then with instantiation parameter override
        let opts = Object.assign({
            velocity: [ 0, 0 ],
            angle: 0
        }, options )


        // Create the body, it has super mass until shapes are assigned
        // Using 0 mass would change the body type, which is just a pain later on
        this.body = new P2.Body({
            mass: Number.MAX_VALUE,
            position: opts.position || this.position,
            velocity: opts.velocity,
            angle: opts.angle,
        })

        if ( opts.position ) {
            this.setPosition( ...opts.position )
        }

        //this.body.interpolatedPosition = [ this.position[ 0 ], this.position[ 1 ] ]

        this.position = this.body.interpolatedPosition
        this.angle = this.body.interpolatedAngle

        if ( opts.mass ) {
            this.setMass( opts.mass )
            this.isMassLocked = true
        }

        // For now hard-code these, although might be nice if they were calculated
        // somehow based on the materials used to build the entity.
        this.body.damping = .05
        this.body.angularDamping = .01

        // Renderable—this is stuck as a sprite for now, but can be changed
        // after instantiation. It may end up as multiple sprites etc etc
        this.sprite = new Pixi.Sprite()

        // Renderables need a main container. This could effectively make other
        // renderable properties private, probably should do
        this.container = new Pixi.Container()

        // For now add sprite and debug sprite to the container, should probably
        // be a bit smarter about this when optimisations start happening
        this.container.addChild( this.sprite )

        return this
    }

    /**
     * Wrapper around p2.Body.shape which also sets mass and provides an
     * extendable method for subclasses
     * @param shape <P2.Shape>
     * @param offset <Float32Array || Array> position relative to entity center
     * @param angle <Number> rotational angle
     * @return this
     */
    addShape( shape, offset, angle ) {
        this.body.addShape( shape, offset, angle )

        this.setMass()
        this.body.updateBoundingRadius()

        return this
    }

    /**
     * Apply position to all the various position attributes
     * @param x <Number>
     * @param y <Number>
     * @return this
     */
    setPosition( x, y ) {
        this.position = this.body.interpolatedPosition = this.body.position = [ x, y ]
        return this
    }

    /**
     * If mass is supplied then it’ll just use it to set the body.mass, otherwise
     * it’ll work it out from the shapes and shape materials attributed to
     * this entity
     * @param mass <Number> _optional_ if omitted will calculate mass from components
     * @return this
     */
    setMass( mass ) {
        if ( mass ) {
            this.body.mass = mass
            this.body.updateMassProperties()
            return this
        }

        // If trying to auto set mass (no mass param supplied) but is mass
        // locked then bail
        if ( this.isMassLocked ) {
            return this
        }

        if ( !this.body.shapes.length ) {
            throw new Error( 'Can not set mass on physical entity ' + this.id + ' with no shapes attached' )
        }

        this.body.mass = this.body.shapes.reduce( ( total, shape ) => {
            // Just use area for now, should multiple by material.density to
            // give final mass of the shape
            return total + ( shape.area * .006 )
        }, 0 )
        this.body.updateMassProperties()

        return this
    }

    /**
     * Actual render of entity
     */
    render() {
        // nothing at present. abstract.
    }

    /**
     * Called every tick, although most of the physics calculations are handled
     * by P2.World.step
     * Should probably accept a delta time
     */
    update() {
        this.angle = this.body.interpolatedAngle

        // this._debugSprite.position.set( ...this.position )
        // this._debugSprite.rotation = this.angle

        this.sprite.position.set( ...this.position )
        this.sprite.rotation = this.angle
    }
}

/**
 * Use as a mixin
 */
export function physicalEntityMixin( base ) {
    return PhysicalEntity
}
