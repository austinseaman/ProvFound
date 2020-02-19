import React, { Component } from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";

const getDoctorsQuery = gql`
  {
    doctors {
      doctorName
      city
      specialty
      insuranceAccepted {
        insName
        usualCoPay
      }
    }
  }
`;

class DoctorList extends Component {
  displayDocs() {
    let data = this.props.data;
    if (data.loading) {
      return <div>Loading physicians...</div>;
    } else {
      return data.doctors.map(doctor => {
        return <li key={doctor.id}>{doctor.doctorName}</li>;
      });
    }
  }
  render() {
      console.log(this.props.data.doctors)
    return (
      <div>
        <ul>{this.displayDocs()}</ul>
      </div>
    );
  }
}

export default graphql(getDoctorsQuery)(DoctorList);
