/**
 * Persian Calendar Picker Component
 *
 * Copyright 2016 Reza (github.com/rghorbani)
 * Licensed under the terms of the MIT license. See LICENSE file in the project root for terms.
 */

'use strict';

const React = require('react');
const PropTypes = require('prop-types');
const {
  Text,
  TouchableOpacity,
  View,
} = require('react-native');
const {StringManager} = require('./StringManager')

const styles = require('./style');
const {
  MONTHS,
} = require('./util');
const moment = require('moment-jalaali');

class HeaderControls extends React.Component {

  jMinDate = null
  jMaxDate = null

  static propTypes = {
    month: PropTypes.number.isRequired,
    year: PropTypes.number,
    getNextYear: PropTypes.func.isRequired,
    getPrevYear: PropTypes.func.isRequired,
    onMonthChange: PropTypes.func.isRequired,
    textStyle: Text.propTypes.style
  };

  constructor(props) {
    super(props);

    this.generate_jMin_jMax()

    this.state = {
      selectedMonth: this.props.month
    };

    this.getNext = this.getNext.bind(this);
    this.getPrevious = this.getPrevious.bind(this);
    this.previousMonthDisabled = this.previousMonthDisabled.bind(this);
    this.nextMonthDisabled = this.nextMonthDisabled.bind(this);
  }

  // Trigger date change if new props are provided.
  // Typically, when selectedDate is changed programmatically.
  //
  componentWillReceiveProps(newProps) {

    this.generate_jMin_jMax()
    this.setState({
      selectedMonth: newProps.month
    });
  }

  //Calculates and stores the jalaali equivalent of minimum and maximum dates
  generate_jMin_jMax() {

    this.props.minDate && (this.jMinDate = moment(this.props.minDate))
    this.props.maxDate && (this.jMaxDate = moment(this.props.maxDate))
  }

  // Logic seems a bit awkawardly split up between here and the CalendarPicker
  // component, eg: getNextYear is actually modifying the state of the parent,
  // could just let header controls hold all of the logic and have CalendarPicker
  // `onChange` callback fire and update itself on each change
  getNext() {
    let next = this.state.selectedMonth + 1;
    if (next > 11) {
      this.setState( { selectedMonth: 0 },
        // Run this function as a callback to ensure state is set first
        () => {
          this.props.getNextYear();
          this.props.onMonthChange(this.state.selectedMonth);
        }
      );
    } else {
      this.setState({ selectedMonth: next },
        () => {
          this.props.onMonthChange(this.state.selectedMonth);
        }
      );
    }
  }

  getPrevious() {
    let prev = this.state.selectedMonth - 1;
    if (prev < 0) {
      this.setState({ selectedMonth: 11},
        // Run this function as a callback to ensure state is set first
        () => {
          this.props.getPrevYear();
          this.props.onMonthChange(this.state.selectedMonth);
        }
      );
    } else {
      this.setState({ selectedMonth: prev },
        () => {
          this.props.onMonthChange(this.state.selectedMonth);
        }
      );
    }
  }

  previousMonthDisabled() {
    return ( this.jMinDate &&
             ( this.props.year < this.jMinDate.jYear() ||
               ( this.props.year == this.jMinDate.jYear() && this.state.selectedMonth <= this.jMinDate.jMonth() )
             )
           );
  }

  nextMonthDisabled() {
    return ( this.jMaxDate &&
             ( this.props.year > this.jMaxDate.jYear() ||
               ( this.props.year == this.jMaxDate.jYear() && this.state.selectedMonth >= this.jMaxDate.jMonth() )
             )
           );
  }

  getYearString() {

    return StringManager.convertEnglishNumbersToPersian(this.props.year instanceof String ? this.props.year : String(this.props.year))
  }

  render() {
    let textStyle = this.props.textStyle;

    let previous;
    if ( this.previousMonthDisabled() ) {
      previous = (
        <Text style={[styles.prev, textStyle, styles.disabledTextColor]}>{this.props.previousTitle || 'ماه قبل'}</Text>
      );
    }
    else {
      previous = (
        <TouchableOpacity onPress={this.getPrevious}>
          <Text style={[styles.prev, textStyle]}>{this.props.previousTitle || 'ماه قبل'}</Text>
        </TouchableOpacity>
      );
    }

    let next;
    if ( this.nextMonthDisabled() ) {
      next = (
        <Text style={[styles.next, textStyle, styles.disabledTextColor]}>{this.props.nextTitle || 'ماه بعد'}</Text>
      );
    }
    else {
      next = (
        <TouchableOpacity onPress={this.getNext}>
          <Text style={[styles.next, textStyle]}>{this.props.nextTitle || 'ماه بعد'}</Text>
        </TouchableOpacity>
      );
    }

    return (
      <View style={styles.headerWrapper}>
        <View style={styles.monthSelector}>
          {next}
        </View>
        <View>
          <Text style={[styles.monthLabel, textStyle]}>
            { (this.props.months || MONTHS)[this.state.selectedMonth] } { this.getYearString() }
          </Text>
        </View>
        <View style={styles.monthSelector}>
          {previous}
        </View>

      </View>
    );
  }
}

module.exports = HeaderControls;
