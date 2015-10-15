
import React from 'react'
import Pixi from 'pixi.js'
import Tick from '@mattstyles/tick'
import Bezier from 'bezier-easing'
import Starfield from 'pixi-starfield'
import Quay from 'quay'
import P2 from 'p2'

import canvas from './canvas'
import renderer from './renderer'
import Stats from './stats'

import User from 'user/user'
import Debug from 'debug/debug'

import resources from 'stores/resources'
import config from 'stores/config'


/**
 * @class
 * Main class holds the main game canvas renderer
 */
export default class Main extends React.Component {
    static propTypes = {
        canvas: React.PropTypes.string
    }

    static defaultProps = {
        canvas: 'js-main'
    }

    constructor( props ) {
        super( props )

        this.renderer = null
        this.renderTick = null
    }

    componentWillMount() {
        this.stats = new Stats([ 0, 2 ])
    }

    componentDidMount() {
        // Set up the canvas & renderer
        let id = this.props.canvas
        canvas.create( id, this.refs.main )
        renderer.create( id, canvas.get( id ) )
        this.renderer = renderer.get( id )

        // Set up a user
        this.user = new User()

        // Set up input
        this.quay = new Quay()
        this.addHandlers()

        // Set up physics
        this.engine = new P2.World({
            gravity: [ 0, 0 ]
        })
        this.engine.addBody( this.user.body )

        // Master stage, renderer renders this
        this.stage = new Pixi.Container()

        // Set up the world - offset so 0,0 ends up screen center
        // @TODO extract offset to a camera class
        // @TODO extract this with this.engine, so adding an entity adds to both automatically
        this.world = new Pixi.Container()
        this.world.position.set( config.get( 'width' ) / 2, config.get( 'height' ) / 2 )

        // Set up the starfield object @TODO extract elsewhere
        // Dont add the starfield to the world, it sits outside and moves at
        // a different pace.
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
            },
            // offset: {
            //     x: 0,
            //     y: 0
            // },
            // static: true
        })

        // Add actors to the stage
        this.stage.addChild( this.starfield.container )
        this.stage.addChild( this.world )


        // @TODO debug user render
        this.world.addChild( this.user.graphics )
        window.stage = this.stage
        window.world = this.world
        window.user = this.user
        window.starfield = this.starfield
        window.config = config


        // Set up the render tick
        this.renderTick = new Tick()
            .on( 'data', this.onRender )
            .on( 'data', this.onUpdate )

        window.pause = () => {
            this.renderTick.pause()
        }
        window.resume = () => {
            this.renderTick.resume()
        }
    }

    addHandlers() {
        if ( !this.quay ) {
            logger.warn( 'Quay not instantiated' )
            return
        }
        this.quay.on( '<up>', this.user.forward )
        this.quay.on( '<down>', this.user.backward )
        this.quay.on( '<left>', this.user.left )
        this.quay.on( '<right>', this.user.right )

        this.quay.stream( '<shift>' )
            .on( 'keydown', () => {
                this.user.engineForce = .15
            })
            .on( 'keyup', () => {
                this.user.engineForce = .05
            })
    }

    onUpdate = dt => {
        this.engine.step( dt )
        this.user.update()

        // Dampen star movement
        this.starfield.setPosition( this.user.body.position[ 0 ] / 10, this.user.body.position[ 1 ] / 10 )

        // This translation effectively simulates the camera moving, although simple
        // it should still be extracted into a camera class
        this.world.position.set(
            ( config.get( 'width' ) / 2 ) - this.user.body.position[ 0 ],
            ( config.get( 'height' ) / 2 ) - this.user.body.position[ 1 ]
        )

        this.starfield.update()
    }

    onRender = dt => {
        this.stats.begin()

        this.renderer.render( this.stage )

        this.stats.end()
    }

    render() {
        console.log( 'main render' )

        // @TODO does the canvas want to be buried this deep in the DOM?
        // No problems with creating them from document.body and just reffing them
        return (
            <div ref="main" className="js-main u-fit">
                <Debug data={ this.props.state.cursor( 'debug' ) } />
            </div>
        )
    }
}
