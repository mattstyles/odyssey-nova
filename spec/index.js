
import path from 'path'
import minimist from 'minimist'

let argv = minimist( process.argv.slice( 2 ) )

argv._.forEach( file => {
    require( path.resolve( file ) )
})
