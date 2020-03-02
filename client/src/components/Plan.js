import React from 'react'

function Plan(props) {
    let {insName, usualCoPay, doctorsAccepting} = props
    return (
        <div className="plan-container">
            <h1>{insName}</h1>
            <h2>{usualCoPay}</h2>
            <h2>Doctors Accepting: {doctorsAccepting}</h2>
        </div>
    )
}

export default Plan
