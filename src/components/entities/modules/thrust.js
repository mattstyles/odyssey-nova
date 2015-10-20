

export default Base => class ThrustModule extends Base {
    applyMainThruster = () => {
        this.linearThrust.forEach( thruster => {
            this.body.applyForceLocal( thruster.magnitude, thruster.offset )
        })
    }

    applyTurnLeft = () => {
        this.body.angularVelocity = -this.turnThrust
    }

    applyTurnRight = () => {
        this.body.angularVelocity = this.turnThrust
    }

    // Banking is almost like strafing, but results in a slight opposite turn as well
    // The slight offset implies the banking thrusters are located behind the
    // center of gravity, which accounts for the slight turn imparted
    applyBankLeft = () => {
        this.body.applyForceLocal( [ this.bankThrust, 0 ], [ 0, -1 ] )
    }

    applyBankRight = () => {
        this.body.applyForceLocal( [ -this.bankThrust, 0 ], [ 0, -1 ] )
    }
}
