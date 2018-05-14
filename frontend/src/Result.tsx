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
            <p>
              <b>Text Entered:</b> {this.props.result.text}
            </p>
            <p>
              <b>Language Detected:</b> {this.props.result.language}
            </p>
            <p>
              <b>Confidence:</b> {this.props.result.confidence}
            </p>
          </>
        ) : (
          ""
        )}
      </>
    );
  }
}
