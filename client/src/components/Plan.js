import React from 'react'

function Plan(props) {
    let {insName, usualCoPay} = props
    return (
        <div>
            <p>{insName}</p>
            <p>{usualCoPay}</p>
        </div>
    )
}

export default Plan
