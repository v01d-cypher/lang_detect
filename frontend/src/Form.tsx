import * as React from "react";
import Result from "./Result";

interface IFormState {
  confidence?: string;
  error?: string;
  language?: string;
  supportedLanguages: string[];
  text?: string;
  value?: string;
}

const defaultState = {
  confidence: "",
  error: "",
  language: "",
  supportedLanguages: [],
  text: "",
  value: "Enter text here - 1MB size limit."
};

export default class Form extends React.Component<any, IFormState> {
  constructor(props: any) {
    super(props);
    this.state = defaultState;
  }

  public handleChange = (event: any) => {
    this.setState({ value: event.target.value });
  };

  public handleSubmit = (event: any) => {
    const request = async () => {
      const response = await fetch("http://localhost:3080/detect", {
        body: JSON.stringify({ text: this.state.value }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST"
      });

      const json = await response.json();
      if (json.error) {
        this.setState({
          confidence: "",
          error: json.error,
          language: "",
          text: ""
        });
      } else {
        this.setState({
          confidence: json.confidence,
          language: json.language,
          text: json.text
        });
      }
    };

    request();
    event.preventDefault();
  };

  public handleClear = () => {
    this.setState(defaultState);
  };

  public supportedLanguages = () => {
    const request = async () => {
      const response = await fetch("http://localhost:3080/languages");
      this.setState({ supportedLanguages: await response.json() });
    };

    request();
  };

  public render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <textarea
            rows={10}
            cols={50}
            value={this.state.value}
            onChange={this.handleChange}
          />
          <br />
          <input type="button" value="Clear" onClick={this.handleClear} />
          <input type="submit" value="Submit" />
        </form>
        <Result result={this.state} />
        <br />
        <br />
        <input
          type="button"
          value="Supported Languages"
          onClick={this.supportedLanguages}
        />
        <ul>
          {this.state.supportedLanguages.map(
            (language: string, index: number) => <li key={index}>{language}</li>
          )}
        </ul>
      </>
    );
  }
}
