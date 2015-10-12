
import React from 'react'

export default class MyComponent extends React.Component {
    constructor( props ) {
        super( props )
    }

    static stuff = {
        foo: 'foo'
    }

    myOnClick = () => {
        console.log( this )
    }

    render() {
        return (
            <div>
                <h2>{ MyComponent.stuff.foo }</h2>
                <button onClick={this.myOnClick}>Click me</button>
            </div>
        )
    }
}
