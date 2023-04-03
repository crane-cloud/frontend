import React from "react";
import PropTypes from "prop-types";
import "./TimeInput.css";

const maxHours = 12;
const maxMinutes = 59;

class TimeInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ampm: "am",
      time: {
        hour: 12,
        minutes: 0,
      },
    };

    this.setTimeOfDay = this.setTimeOfDay.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.formatTime = this.formatTime.bind(this);
    this.changeHour = this.changeHour.bind(this);
    this.changeMinutes = this.changeMinutes.bind(this);
    this.format24HourClock = this.format24HourClock.bind(this);
  }

  componentDidMount() {
    const { onChange } = this.props;
    const { ampm, time } = this.state;

    onChange(this.format24HourClock(time.hour, time.minutes, ampm));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      const { onChange } = this.props;
      const { ampm, time } = this.state;

      onChange(this.format24HourClock(time.hour, time.minutes, ampm));
    }
  }

  setTimeOfDay() {
    const { ampm } = this.state;

    if (ampm === "am") {
      this.setState({ ampm: "pm" });
    } else {
      this.setState({ ampm: "am" });
    }
  }

  handleFocus({ target }) {
    target.select();
  }

  formatTime(timeValue) {
    const formattedTime = timeValue.toString();
    const timeLength = formattedTime.length;

    if (formattedTime.length < 2) {
      return `0${formattedTime}`;
    }

    if (formattedTime.length > 2) {
      return formattedTime.substring(timeLength - 2, timeLength);
    }

    return formattedTime;
  }

  changeHour({ target }) {
    if (target.value > maxHours) {
      this.setState((prevState) => ({
        time: {
          ...prevState.time,
          hour: maxHours,
        },
      }));
    } else {
      this.setState((prevState) => ({
        time: {
          ...prevState.time,
          hour: parseInt(target.value, 10),
        },
      }));
    }
  }

  changeMinutes({ target }) {
    if (target.value > maxMinutes) {
      this.setState((prevState) => ({
        time: {
          ...prevState.time,
          minutes: maxMinutes,
        },
      }));
    } else {
      this.setState((prevState) => ({
        time: {
          ...prevState.time,
          minutes: parseInt(target.value, 10),
        },
      }));
    }
  }

  format24HourClock(hours, minutes, timeOfDay) {
    let time = {
      h: hours,
      m: minutes,
    };

    if (timeOfDay === "am" && hours === 12) {
      time = { ...time, h: 0 };
    }

    if (timeOfDay === "pm" && hours !== 12) {
      time = { ...time, h: hours + 12 };
    }

    return time;
  }

  render() {
    const { ampm, time } = this.state;

    return (
      <div className="TimeInputContainer">
        Time
        <div className="TimeInputWrapper">
          <input
            className="TimeInput"
            type="number"
            value={this.formatTime(time.hour)}
            onChange={this.changeHour}
            onFocus={this.handleFocus}
            min="1"
            max={maxHours}
            maxLength="2"
          />
          :
          <input
            className="TimeInput"
            type="number"
            value={this.formatTime(time.minutes)}
            onChange={this.changeMinutes}
            onFocus={this.handleFocus}
            min="0"
            max={maxMinutes}
            maxLength="2"
          />
          &nbsp;
          <input
            className="TimeInput DayNightInput"
            value={ampm}
            onFocus={this.handleFocus}
            onChange={this.setTimeOfDay}
          />
        </div>
      </div>
    );
  }
}

TimeInput.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default TimeInput;
