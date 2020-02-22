import React from 'react'

function Doctor(props) {
    let {doctorName, city, specialty, insuranceAccepted} = props
    return (
        <div className="doctor-container">
            <h1>{doctorName}</h1>
            <h2>{city}</h2>
            <h2>{specialty}</h2>
            <h3>Insurance Accepted: {insuranceAccepted}</h3>
        </div>
    )
}

export default Doctor
