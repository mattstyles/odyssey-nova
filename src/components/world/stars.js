
import Pixi from 'pixi.js'
import Bezier from 'bezier-easing'
import Starfield from 'pixi-starfield'

import config from 'stores/config'
import resources from 'stores/resources'

/**
 * Holds the various bits that make up the background.
 * Dust, clouds and stars all form layers, the dust moving quicker than everything
 * else to represent the local environment whereas clouds, nebulae, stars etc all
 * form the distant background.
 */
export default class Stars {
    constructor() {

        this.container = new Pixi.Container

        this.layer = []
        this.layer.push({
            speed: .1,
            field: new Starfield({
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
        })

        this.layer.push({
            speed: .2,
            field: new Starfield({
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
                    color: {
                        from: [ 0x02, 0x88, 0xd1 ],
                        to: [ 0xb3, 0xe5, 0xfc ]
                    },
                    tempCurve: new Bezier( .75, .1, .85, 1 ),
                    threshold: .1
                },
                density: .00025 * config.get( 'width' ) * config.get( 'height' ),
                size: {
                    width: config.get( 'width' ),
                    height: config.get( 'height' )
                }
            })
        })

        this.layer.forEach( layer => {
            this.container.addChild( layer.field.container )
        })
    }

    update() {
        this.layer.forEach( layer => layer.field.update() )
    }

    setPosition( x, y ) {
        this.layer.forEach( layer => layer.field.setPosition( x * layer.speed, y * layer.speed ) )
    }

}
