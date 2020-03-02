import { gql } from 'apollo-boost';


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

const getPlansQuery = gql`
  {
      plans {
        insName
        usualCoPay
        doctorsAccepting {
            doctorName
            city
            specialty
        }
      }
  }
`;

export { getDoctorsQuery, getPlansQuery }