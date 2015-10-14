
import React from 'react'
import random from 'lodash.random'

import logger from 'utils/logger'
import appDispatcher from 'dispatchers/appDispatcher'
import EVENTS from 'constants/events'
import { wait } from 'utils/timing'

export default class Bootstrap extends React.Component {
    constructor( props ) {
        super( props )
    }

    state = {
        progress: []
    }

    componentWillMount() {
        logger.info( 'Bootstrapping...' )
    }

    /**
     * Do some fake loading to test the state transitioning
     */
    async componentDidMount() {
        let count = 5
        let time = 2000 / count
        while( count-- ) {
            await wait( time + random( -time * .75, time * .75 ) )
            this.setState( state => {
                progress: state.progress.push( true )
            })
        }

        this.onComplete()
    }

    onComplete() {
        logger.info( 'Bootstrap complete' )
        // appDispatcher.dispatch({
        //     type: EVENTS.get( 'BOOTSTRAP_COMPLETE' )
        // })
    }

    render() {
        let progress = 'Loading' + this.state.progress.reduce( prev => {
            return prev + '.'
        }, '' )

        return (
            <div className="BS u-fit">
                <span className="BS-loading">{ progress }</span>
            </div>
        )
    }
}
