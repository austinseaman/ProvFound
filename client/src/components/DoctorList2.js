import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getDoctorsQuery } from "../queries/queries";
import Doctor from "./Doctor";

class DoctorList2 extends Component {
  displayDocs() {
    let data = this.props.data;
    if (data.loading) {
      return <div className="loading">Loading physicians...</div>;
    } else {
      return data.doctors.map(doctor => {
        return (
          <Doctor
            key={doctor.doctorName}
            doctorName={doctor.doctorName}
            specialty={doctor.specialty}
            city={doctor.city}
          />
        );
      });
    }
  }
  render() {
    console.log(this.props.data.doctors);
    return (
      <div className="doctorList-container">
        <ul>{this.displayDocs()}</ul>
      </div>
    );
  }
}

export default graphql(getDoctorsQuery)(DoctorList2);
