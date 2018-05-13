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
  value: ""
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
    event.preventDefault();
    // Basic validation
    if (this.state.value && this.state.value.length > 1000000) {
      alert("Maximum text length is 1Mb.");
      return;
    }
    const request = async () => {
      const response = await fetch("http://localhost:3080/api/detect", {
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
          error: "",
          language: json.language,
          text: json.text
        });
      }
    };

    request();
  };

  public handleClear = () => {
    const languages = this.state.supportedLanguages;
    this.setState(defaultState);
    this.setState({ supportedLanguages: languages });
  };

  public supportedLanguages = () => {
    const request = async () => {
      const response = await fetch("http://localhost:3080/api/languages");
      this.setState({ supportedLanguages: await response.json() });
    };

    request();
  };

  public render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <i>Enter text below - 1Mb character limit.</i>
          <br />
          <textarea
            rows={10}
            cols={50}
            value={this.state.value}
            onChange={this.handleChange}
          />
          <br />
          <input type="button" value="Clear" onClick={this.handleClear} />
          <input
            type="submit"
            disabled={!this.state.value || this.state.value.length > 1000000}
            value="Submit"
          />
        </form>
        <Result result={this.state} />
        <br />
        <br />
        <input
          type="button"
          value="Get Supported Languages"
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
