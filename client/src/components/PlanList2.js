import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getPlansQuery } from "../queries/queries";
import Plan from "./Plan";
import Doctor from './Doctor';

class PlanList2 extends Component {
  displayPlans() {
    let data = this.props.data;
    if (data.loading) {
      return <div className="loading">Loading insurance plans...</div>;
    } else {
      return data.plans.map((plan) => {
        return (
          <Plan
            key={plan.insName}
            insName={plan.insName}
            usualCoPay={plan.usualCoPay}
          />
        );
      });
    }
  }

  render() {
    console.log(this.props.data);
    return (
        <div className="plansList-container">
            <ul>{this.displayPlans()}</ul>
        </div>
    );
  }
}
export default graphql(getPlansQuery)(PlanList2);
