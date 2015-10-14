
import React from 'react'
import random from 'lodash.random'

import logger from 'utils/logger'
import appDispatcher from 'dispatchers/appDispatcher'
import EVENTS from 'constants/events'
import { wait } from 'utils/timing'

import appState from 'stores/appState'

const ID = 'bootstrap'

/**
 * Handles a loading progress indicator, albeit a fake one at present
 */
class Loading extends React.Component {
    constructor( props ) {
        super( props )
    }

    /**
     * Do some fake loading, should probably be done in the Bootstrap component
     */
    async componentDidMount() {
        let count = 5
        let time = 2000 / count
        while( count-- ) {
            await wait( time + random( -time * .75, time * .75 ) )

            logger.info( 'Bootstrap event' )

            this.props.progress.update( cursor => {
                cursor = this.props.progress.push( true )
                return cursor
            })
        }

        this.onComplete()
    }

    onComplete() {
        logger.info( 'Bootstrap complete' )

        // Change app state to the main frame
        appDispatcher.dispatch({
            type: EVENTS.get( 'CHANGE_STATE' ),
            payload: {
                requestedStateID: 'main'
            }
        })
    }

    render() {
        let progress = 'Loading' + this.props.progress.reduce( prev => {
            return prev + '.'
        }, '' )

        return <span className="BS-loading">{ progress }</span>
    }
}

/**
 * Master component
 * Passes cursors down to children to actually do the work
 */
export default class Bootstrap extends React.Component {
    constructor( props ) {
        super( props )
    }

    componentWillMount() {
        logger.info( 'Bootstrapping...' )
    }

    render() {
        // Pass cursors to child components
        return (
            <div className="BS u-fit">
                <Loading progress={ this.props.state.cursor( 'progress' ) } />
            </div>
        )
    }
}
