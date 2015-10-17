
import Pixi from 'pixi.js'
import P2 from 'p2'

import Entity from './entity'

/**
 * A physical entity has both a renderable and a physics body.
 * In theory it should inherit from both Ghost and Shell but, JS being what it
 * is, its worth taking the risk of a clean implementation.
 * @class
 */
export default class PhysicalEntity extends Entity {
    /**
     * @constructs
     */
    constructor( options = {} ) {
        super( options )

        // Extend with defaults, then with instantiation parameter override
        let opts = Object.assign({
            angle: 0
        }, options )

        // Create the body, it has no mass until shapes are assigned
        this.body = new P2.Body({
            position: this.position,
            angle: opts.angle
        })

        this.position = this.body.interpolatedPosition
        this.angle = this.body.interpolatedAngle

        if ( opts.mass ) {
            this.setMass( opts.mass )
            this.isMassLocked = true
        }

        // For now hard-code these, although might be nice if they were calculated
        // somehow based on the materials used to build the entity.
        this.damping = .05
        this.angularDamping = .01

        // Renderable—this is stuck as a sprite for now, but can be changed
        // after instantiation. It may end up as multiple sprites etc etc
        this.sprite = new Pixi.Sprite()
        this._debugSprite = new Pixi.Graphics()

        // Renderables need a main container. This could effectively make other
        // renderable properties private, probably should do
        this.container = new Pixi.Container()

        // For now add sprite and debug sprite to the container, should probably
        // be a bit smarter about this when optimisations start happening
        this.container.addChild( this.sprite )
        this.container.addChild( this._debugSprite )
    }

    /**
     * Wrapper around p2.Body.shape which also sets mass and provides an
     * extendable method for subclasses
     */
    addShape( shape ) {
        this.body.addShape( shape )

        this.setMass()
    }

    /**
     * If mass is supplied then it’ll just use it to set the body.mass, otherwise
     * it’ll work it out from the shapes and shape materials attributed to
     * this entity
     */
    setMass( mass ) {
        if ( mass ) {
            this.body.mass = mass
            this.body.updateMassProperties()
            return
        }

        // If trying to auto set mass (no mass param supplied) but is mass
        // locked then bail
        if ( this.isMassLocked ) {
            return
        }

        if ( !this.body.shapes.length ) {
            throw new Error( 'Can not set mass on physical entity ' + this.id + ' with no shapes attached' )
        }

        this.body.mass = this.body.shapes.reduce( total, shape => {
            // Just use area for now, should multiple by material.density to
            // give final mass of the shape
            return total + shape.area
        }, 0 )
        this.body.updateMassProperties()
    }

    _debugRender() {
        this._debugSprite.clear()

        if ( !this.body.shapes.length ) {
            return
        }

        this.body.shapes.forEach( shape => {
            this._debugSprite.moveTo( ...shape.position )
            this._debugSprite.beginFill( 0xffffff, .1 )
            this._debugSprite.drawCircle( ...shape.position, shape.radius )
            this._debugSprite.endFill()
            this._debugSprite.lineStyle( 1, 0xffffff, .3 )
            this._debugSprite.arc(
                ...shape.position,
                shape.radius,
                shape.angle + Math.PI * .5, shape.angle + Math.PI * 2.5, false
            )
            this._debugSprite.lineTo( ...shape.position )
        })
    }

    render() {
        // nothing at the moment
    }

    update() {
        this._debugSprite.position.set( ...this.position )
        this._debugSprite.rotation = this.angle

        this.sprite.position.set( ...this.position )
        this.sprite.rotation = this.angle
    }
}
