import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import './App.css'
import React from 'react';
import Covid19Dashboard from './Components/Covid19Dashboard'
class App extends React.Component {

  
  render() {
    return (
      <Covid19Dashboard />
    );
  }
}

export default App;