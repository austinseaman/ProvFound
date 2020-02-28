import React from "react";
import { Switch, Route } from "react-router-dom";
// import DoctorList from "./components/DoctorList.js";
import "./app.css";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Navigation from './components/Nav';
import Home from './components/Home';
import FindProvider from './components/FindProvider'

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Navigation />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/search" component={FindProvider} />
          {/* <Route path="/services" component={} /> */}
        </Switch>
        {/* <DoctorList /> */}
      </div>
    </ApolloProvider>
  );
}

export default App;
