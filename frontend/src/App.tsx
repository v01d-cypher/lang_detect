import * as React from "react";
import "./App.css";
import Form from "./Form";

class App extends React.Component {
  public render() {
    return (
      <div>
        <h1>Language Detector</h1>
        <Form />
      </div>
    );
  }
}

export default App;
