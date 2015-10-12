
import React from 'react'
import Pixi from 'pixi.js'
import Tick from '@mattstyles/tick'

import canvas from './canvas'
import renderer from './renderer'
import Stats from './stats'

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

        // Set up the stage
        this.stage = new Pixi.Container()

        // Set up the render tick
        this.renderTick = new Tick()
            .on( 'data', this.onRender )
    }

    onRender = dt => {
        this.stats.begin()
        this.renderer.render( this.stage )
        this.stats.end()
    }

    render() {
        // @TODO does the canvas want to be buried this deep in the DOM?
        // No problems with creating them from document.body and just reffing them
        return (
            <div ref="main" className="js-main u-fit"></div>
        )
    }
}
