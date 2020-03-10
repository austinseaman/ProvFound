import React, { Component } from "react";

class FindProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div class="form-container">
        <form id="contact" action="" method="post">
          <h3>Provider Search</h3>
          <h4>Find your next excellent healthcare provider, today!</h4>
          <select name="specialist" id="specialist" tabindex="1">
             <option value="neuro">Neurology</option>
             <option value="patho">Pathology</option>
             <option value="biotech">Biotechnology</option>
          </select>

          <select name="plan" id="plan" tabindex="2">
            <option value="united">United Healthcare</option>
            <option value="squid">SquidMed</option>
            <option value="muert">MuertAssist</option>
            <option value="transorb">Transorbital</option>
          </select>

          <input
            placeholder="City"
            type="text"
            tabindex="3"
            required
          ></input>

          <button
            name="submit"
            type="submit"
            id="contact-submit"
            data-submit="...Sending"
          >
            Submit
          </button>
        </form>
      </div>
      // <div className="form">
      //   <h1>Find your next excellent healthcare provider!</h1>
      //   <form action="">
      //     <select name="specialist" id="specialist">
      //       <option value="gp">General Practitioner</option>
      //       <option value="pediatric">Pediatric</option>
      //       <option value="cardio">Cardiology</option>
      //       <option value="feet">Podiatry</option>
      //     </select>
      //   </form>
      // </div>
    );
  }
}

export default FindProvider;
