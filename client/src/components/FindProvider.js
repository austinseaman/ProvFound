import React, { Component } from "react";

class FindProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="form">
        <h1>Find your next excellent healthcare provider!</h1>
        <form action="">
          <select name="specialist" id="specialist">
            <option value="gp">General Practitioner</option>
            <option value="pediatric">Pediatric</option>
            <option value="cardio">Cardiology</option>
            <option value="feet">Podiatry</option>
          </select>
        </form>
      </div>
    );
  }
}

export default FindProvider;
