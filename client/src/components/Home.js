import React from 'react'
import Doc from '../photos/doctor.jpg'

function Home() {
    return (
        <div className="home">
            <img id="doctor" src={Doc} alt="doctor"/>
        </div>
    )
}

export default Home
