
import Pixi from 'pixi.js'
import Bezier from 'bezier-easing'
import Starfield from 'pixi-starfield'

import config from 'stores/config'

/**
 * Holds the various bits that make up the background.
 * Dust, clouds and stars all form layers, the dust moving quicker than everything
 * else to represent the local environment whereas clouds, nebulae, stars etc all
 * form the distant background.
 */
export default class Stars {
    constructor() {

        this.container = new Pixi.Container

        this.starfield = new Starfield({
            schema: {
                tex: [ resources.getTexture( 'circle4.png' ) ],
                rotation: false,
                alpha: {
                    min: .1,
                    max: 1
                },
                scale: {
                    min: .25,
                    max: .8
                },
                tempCurve: new Bezier( .75, .1, .85, 1 ),
                threshold: .05
            },
            density: .0005 * config.get( 'width' ) * config.get( 'height' ),
            size: {
                width: config.get( 'width' ),
                height: config.get( 'height' )
            }
        })

        this.container.addChild( this.starfield.container )
    }

    update() {
        this.starfield.update()
    }

    setPosition( x, y ) {
        this.starfield.setPosition( x / 10, y / 10 )
    }

}
