import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as LeftArrow } from '../../assets/images/left-arrow.svg';
import { ReactComponent as RightArrow } from '../../assets/images/right-arrow.svg';
import './Calendar.css';

const monthNames = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December'
];

const today = new Date().getDate();
const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();

class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      weeks: [],
      month: currentMonth,
      year: currentYear,
      selected: {
        day: today,
        month: currentMonth,
        year: currentYear
      }
    };

    this.prevMonth = this.prevMonth.bind(this);
    this.nextMonth = this.nextMonth.bind(this);
    this.daysInMonth = this.daysInMonth.bind(this);
    this.renderDays = this.renderDays.bind(this);
    this.handleSelected = this.handleSelected.bind(this);
  }

  componentDidMount() {
    const { onChange } = this.props;
    this.renderDays(currentMonth, currentYear);

    onChange({
      day: today,
      month: currentMonth,
      year: currentYear
    });
  }

  getFirstDay(month, year) {
    return (new Date(year, month, 1).getDay());
  }

  daysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
  }

  // this function sets state for next month
  prevMonth() {
    const { month, year } = this.state;
    let monthCopy = month;
    let yearCopy = year;

    if (month === 0) {
      monthCopy = 11;
      yearCopy = year - 1;
      this.setState({ month: monthCopy, year: yearCopy });
    } else {
      monthCopy -= 1;
      this.setState({ month: monthCopy });
    }

    this.renderDays(monthCopy, yearCopy);
  }

  // this function sets state for previous month
  nextMonth() {
    const { month, year } = this.state;
    let monthCopy = month;
    let yearCopy = year;

    if (month === 11) {
      monthCopy = 0;
      yearCopy = year + 1;
      this.setState({ month: monthCopy, year: yearCopy });
    } else {
      monthCopy += 1;
      this.setState({ month: monthCopy });
    }

    this.renderDays(monthCopy, yearCopy);
  }

  // this function sets selected to the clicked date
  handleSelected(day) {
    const { onChange } = this.props;
    const { year, month } = this.state;

    if (day) { // only work when day is not undefined aka dont work for empty boxes
      this.setState((prevState) => ({
        selected: {
          ...prevState.selected,
          year,
          month,
          day
        }
      }));
    }

    onChange({
      day,
      month,
      year
    });
  }

  renderDays(month, year) {
    const days = [];
    const weeks = [];
    let weekCount = 0;
    let dayCount = 0;
    const firstDay = this.getFirstDay(month, year);
    const maxDays = this.daysInMonth(month, year) + firstDay;
    const numberOfTrailingBoxes = 35 - maxDays;

    for (let i = 0; i < maxDays; i += 1) {
      if (i < firstDay) {
        days.push(
          <div key={i} />
        );
      } else {
        days.push(
          <div key={i}>{(i - firstDay) + 1}</div>
        );
      }
    }

    for (let i = 0; i < numberOfTrailingBoxes; i += 1) {
      days.push(
        <div key={i} />
      );
    }

    let limit = 7;
    while (weekCount < 5) {
      const singleWeek = [];

      for (dayCount; dayCount < limit; dayCount += 1) {
        singleWeek.push(days[dayCount]);
      }

      weeks.push(singleWeek);
      limit += 7;
      weekCount += 1;
    }

    this.setState({ weeks });
  }

  render() {
    const {
      month,
      year,
      weeks,
      selected
    } = this.state;

    return (
      <div className="CalendarWrapper DisableTextSelect">
        <div className="CalendarMonth">
          <div className="CalendarArrow" role="presentation" onClick={this.prevMonth}><LeftArrow /></div>
          {`${monthNames[month]} ${year}`}
          <div className="CalendarArrow" role="presentation" onClick={this.nextMonth}><RightArrow /></div>
        </div>
        <div className="CalendarDayNames">
          <div className="WeekDay">sun</div>
          <div className="WeekDay">mon</div>
          <div className="WeekDay">tue</div>
          <div className="WeekDay">wed</div>
          <div className="WeekDay">thu</div>
          <div className="WeekDay">fri</div>
          <div className="WeekDay">sat</div>
        </div>
        <div className="CalendarWeeks">
          {weeks.map((days) => (
            <div key={weeks.indexOf(days)} className="CalendarWeekDays">
              {days.map((day) => (
                <div
                  key={days.indexOf(day)}
                  className={`
                  CalendarSingleDay 
                  ${(year === selected.year && month === selected.month && day.props.children === selected.day) && 'Today'}
                  `}
                  onClick={() => this.handleSelected(day.props.children)}
                  role="presentation"
                >
                  {day}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

Calendar.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default Calendar;
