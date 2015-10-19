
import mixin from 'utils/mixin'

export default Base => class AttackModule extends Base {
    fire() {
        console.log( 'firing' )
    }
}
