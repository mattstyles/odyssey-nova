
import Pixi from 'pixi.js'

import mixin from 'utils/mixin'

export default Base => class DebugModule extends Base {
    constructor( opts ) {
        super( opts )

        this._debugSprite = new Pixi.Graphics()

        this.container.addChild( this._debugSprite )
    }

    render() {
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

        super()
    }

    update() {
        super()

        this._debugSprite.position.set( ...this.position )
        this._debugSprite.rotation = this.angle
    }
}
