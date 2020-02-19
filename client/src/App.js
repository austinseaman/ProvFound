import React from 'react';
import DoctorList from './components/DoctorList.js';
import './app.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';


const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql'
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>Hello World!</h1>
        <DoctorList />
      </div>
    </ApolloProvider>
  );
}

export default App;
