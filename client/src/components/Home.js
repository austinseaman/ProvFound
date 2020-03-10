import React from "react";
import Doc from "../photos/doctor.jpg";

function Home() {
  return (
    <div className="home">
      <img id="doctor" src={Doc} alt="doctor" />
        <h1 className="pf-intro">
        <br/>
        Welcome to ProvFound!
        <br />
        <br/>
        We've all struggled to find just the right doctor for ourselves or a loved one.
        <br />
        Getting care from someone that takes your precise insurance plan is difficult.
        <br />
        We've made it easier for you! Your provider is FOUND.
        </h1>
    </div>
  );
}

export default Home;
