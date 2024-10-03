import React, { Component, createRef } from 'react';
import { DateRange, DefinedRange } from 'react-date-range';
import { initializeDatePicker } from './utils/useDatePicker';

class DateRangeFilter extends Component {
  /**
   * Initializes the DateRangeFilter component with the given props.
   *
   * @param {Object} props - The properties passed to the component.
   * @return {void}
   */
  constructor(props) {
    super(props);
    this.state = {
      selectionRange: {
        startDate: null,
        endDate: null,
        key: 'selection',
      },
    };
    this.dateRangeFilterRef = createRef(); // Reference to the date-range-filter div
    this.handleSelect = this.handleSelect.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  /**
   * Lifecycle method invoked after the component is mounted.
   * It appends a "Close" button to the date range filter element.
   *
   * @return {void}
   */
  componentDidMount() {
    // Find the .rdrMonthsVertical div and append the "Close" button.
    const dateRangeFilterElement = this.dateRangeFilterRef.current;

    if (dateRangeFilterElement) {
      // Initialize the date picker functionality.
      initializeDatePicker();

      const monthsVerticalDiv = dateRangeFilterElement.querySelector('.rdrMonthsVertical');

      if (monthsVerticalDiv) {
        // Create a "Close" button.
        const closeButton = document.createElement('button');
        closeButton.textContent = 'Close';
        closeButton.className = 'btn-close-date btn btn-outline-info btn-sm';
        closeButton.ariaLabel = 'Close';

        // Append the button after the .rdrMonthsVertical div.
        monthsVerticalDiv.after(closeButton);
      }
    }
  }

  /**
   * Handles the selection of a date range.
   *
   * Updates the component's state with the selected date range and notifies
   * the parent component via the `onDateSelect` prop, if provided.
   *
   * @param {object} ranges - An object containing the selected date range.
   * @return {void}
   */
  handleSelect(ranges) {
    const { onDateSelect } = this.props;
    this.setState({
      selectionRange: ranges.selection,
    });
    if (onDateSelect) {
      onDateSelect(ranges.selection.startDate, ranges.selection.endDate);
    }
  }

  /**
   * Resets the date range filter to its initial state.
   *
   * Clears the selected date range and notifies the parent component via the `onDateSelect` prop, if provided.
   *
   * @return {void}
   */
  handleReset() {
    this.setState({
      selectionRange: {
        startDate: null,
        endDate: null,
        key: 'selection',
      },
    });
    const { onDateSelect } = this.props;
    if (onDateSelect) {
      onDateSelect(null, null); // Notify with null dates
    }
  }

  render() {
    const { startDate, endDate } = this.state.selectionRange;
    const showResetButton = startDate !== null && endDate !== null;

    return (
      <div
        ref={this.dateRangeFilterRef} // Reference to the date-range-filter div
        className={`date-range-filter`}
      >
        {showResetButton && (
          <button className="reset" onClick={this.handleReset}>
            Reset
          </button>
        )}

        <DefinedRange
          onChange={this.handleSelect}
          ranges={[this.state.selectionRange]}
        />

        <DateRange
          editableDateInputs={true}
          onChange={this.handleSelect}
          moveRangeOnFirstSelection={false}
          ranges={[this.state.selectionRange]}
          startDatePlaceholder="From Date"
          endDatePlaceholder="To Date"
          maxDate={new Date()}
          dateDisplayFormat="MM/dd/yyyy"
        />
      </div>
    );
  }
}

export default DateRangeFilter;
