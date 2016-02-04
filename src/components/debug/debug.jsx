
import React from 'react'


const Section = props => {
    // Same deal, use a sequence and convert into a list ready to render
    let fields = props.fields.toSeq().map( ( value, key ) => {
        return (
            <li key={ key } className="Debug-sectionField">
                <span>{ key + ' : ' + value }</span>
            </li>
        )
    }).toList()
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
    // Convert map into a list and pass through with the section title key
    let info = props.data.toSeq().map( ( value, key ) => {
        return <Section key={ key } id={ key } fields={ value } />
    }).toList()

    return <ul className="Debug u-nakedList">{ info }</ul>
}
