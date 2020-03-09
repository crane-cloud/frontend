import React from 'react';
import './Checkbox.css';
import { ReactComponent as Checkmark } from '../../assets/images/check.svg';

class Checkbox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: false
    };

    this.toggleCheckmark = this.toggleCheckmark.bind(this);
  }

  toggleCheckmark() {
    this.setState({
      checked: !this.state.checked
    });
  }

  render() {
    return (
      <div
        className="Checkbox"
        onClick={() => {
          this.props.onClick(this.state.checked);
        }}
      >
        <input
          type="checkbox"
          onChange={this.toggleCheckmark}
          checked={this.state.checked}
        />
        <div className={`CheckMarkWrapper Checked-${this.state.checked}`}>
          <Checkmark />
        </div>
      </div>
    );
  }
}

export default Checkbox;
