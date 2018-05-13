import * as React from "react";

export default class Result extends React.Component<any> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <>
        <br />
        {this.props.result.error ? <b>Error: {this.props.result.error}</b> : ""}
        {this.props.result.text ? (
          <>
            <p>Text Entered: {this.props.result.text}</p>
            <p>Language Detected: {this.props.result.language}</p>
            <p>Confidence: {this.props.result.confidence}</p>
          </>
        ) : (
          ""
        )}
      </>
    );
  }
}
