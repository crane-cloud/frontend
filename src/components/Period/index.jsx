import React from 'react';
import PropTypes from 'prop-types';
import './Period.css';

class Period extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      period: '1d'
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { onChange } = this.props;
    this.setState({ period: target.getAttribute('value') });
    onChange(target.getAttribute('value'));
  }


  render() {
    const { period } = this.state;
    return (
      <div className="PeriodButtonsContainer">
        <div className={`${period === '1h' && 'PeriodButtonActive'} PeriodButton`} name="1hour" value="1h" role="presentation" onClick={this.handleChange}>1h</div>
        <div className={`${period === '1d' && 'PeriodButtonActive'} PeriodButton`} name="1day" value="1d" role="presentation" onClick={this.handleChange}>1d</div>
        <div className={`${period === '7d' && 'PeriodButtonActive'} PeriodButton`} name="7days" value="7d" role="presentation" onClick={this.handleChange}>7d</div>
        <div className={`${period === '1m' && 'PeriodButtonActive'} PeriodButton`} name="1month" value="1m" role="presentation" onClick={this.handleChange}>1m</div>
        <div className={`${period === '3m' && 'PeriodButtonActive'} PeriodButton`} name="3months" value="3m" role="presentation" onClick={this.handleChange}>3m</div>
        <div className={`${period === '1y' && 'PeriodButtonActive'} PeriodButton`} name="1year" value="1y" role="presentation" onClick={this.handleChange}>1y</div>
        <div className={`${period === 'all' && 'PeriodButtonActive'} PeriodButton`} name="all" value="all" role="presentation" onClick={this.handleChange}>all</div>
      </div>
    );
  }
}

Period.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default Period;
