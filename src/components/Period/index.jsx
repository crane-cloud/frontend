import React from 'react';
import PropTypes from 'prop-types';
import DateInput from '../DateInput';
import './Period.css';

class Period extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      period: '1d'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFromDate = this.handleFromDate.bind(this);
    this.handleToDate = this.handleToDate.bind(this);
  }

  handleChange({ target }) {
    const { onChange } = this.props;
    this.setState({ period: target.getAttribute('value') });
    onChange(target.getAttribute('value'));
  }

  handleFromDate(fromTS) {
    // console.log(fromTS);
  }

  handleToDate(toTS) {
    // console.log(toTS);
  }

  render() {
    const { period } = this.state;
    return (
      <div className="PeriodContainer">
        <div className="PeriodButtonsSection">
          <div className={`${period === '1d' && 'PeriodButtonActive'} PeriodButton`} name="1day" value="1d" role="presentation" onClick={this.handleChange}>1d</div>
          <div className={`${period === '7d' && 'PeriodButtonActive'} PeriodButton`} name="7days" value="7d" role="presentation" onClick={this.handleChange}>7d</div>
          <div className={`${period === '1m' && 'PeriodButtonActive'} PeriodButton`} name="1month" value="1m" role="presentation" onClick={this.handleChange}>1m</div>
          <div className={`${period === '3m' && 'PeriodButtonActive'} PeriodButton`} name="3months" value="3m" role="presentation" onClick={this.handleChange}>3m</div>
          <div className={`${period === '1y' && 'PeriodButtonActive'} PeriodButton`} name="1year" value="1y" role="presentation" onClick={this.handleChange}>1y</div>
          <div className={`${period === 'all' && 'PeriodButtonActive'} PeriodButton`} name="all" value="all" role="presentation" onClick={this.handleChange}>all</div>
        </div>
        <div className="DateInputsSection">
          <DateInput label="From" position="left" handleChange={this.handleFromDate} />
          <DateInput label="To" position="left" handleChange={this.handleToDate} />
        </div>
      </div>
    );
  }
}

Period.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default Period;
