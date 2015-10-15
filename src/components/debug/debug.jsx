
import React from 'react'


const Section = props => {
    let fields = props.fields.map( ( value, key ) => {
        return (
            <li key={ key } className="Debug-sectionField">
                <span>{ key + ' : ' + value }</span>
            </li>
        )
    })
    return (
        <li className="Debug-section">
            <h3 className="Debug-title">{ props.id }</h3>
            <ul className="Debug-sectionFields u-nakedList">
                { fields }
            </ul>
        </li>
    )
}


/**
 * Pure stateless function FTW!
 */
export default props => {
    let info = props.data.map( ( value, key ) => {
        return <Section key={ key } id={ key } fields={ value } />
    })
    return <ul className="Debug u-nakedList">{ info }</ul>
}
