import React, { Component } from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";
import Doctor from "./Doctor";
import Plan from "./Plan";

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
      return <div className="doctor-loading">Loading physicians...</div>;
    } else {
      return data.doctors.map((doctor) => {
        return <Doctor key={doctor.doctorName}
                doctorName={doctor.doctorName}
                specialty={doctor.specialty}
                city={doctor.city}
                insuranceAccepted={doctor.insuranceAccepted.map((ins) => <Plan key={ins.insName}
                                                                          insName={ins.insName}
                                                                          usualCoPay={ins.usualCoPay}/>)}/>
                                                                        });
    }
  }
  render() {
      console.log(this.props.data.doctors)
    return (
      <div className="doctorList-container">
        <ul>{this.displayDocs()}</ul>
      </div>
    );
  }
}

export default graphql(getDoctorsQuery)(DoctorList);
