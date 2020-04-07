import React from 'react';
import './TextArea.css';

class TextArea extends React.Component {
  constructor() {
    super();
    this.state = {
      InputBackground: 'InitialBackground'
    };
  }

  changeBackground() {
    let { InputBackground } = this.state;
    InputBackground = 'WhiteBackground';
    this.setState({ InputBackground });
  }

  render() {
    const { InputBackground } = this.state;
    const { name, value, placeholder } = this.props;

    return (
      <textarea
        className={`TextArea ${InputBackground}`}
        type="text"
        placeholder={`${placeholder} *`}
        rows="3"
        cols="50"
        name={name}
        value={value}
        onChange={(e) => {
          this.props.onChange(e);
        }}
        onInput={() => {
          this.changeBackground();
        }}
      />
    );
  }
}

export default TextArea;
