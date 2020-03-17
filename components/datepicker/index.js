import React from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { FormGroup, Label, Button } from 'reactstrap';
import 'react-datepicker/dist/react-datepicker.css';

class DatePickerWrapper extends React.Component {
  render() {
    const { label, value, selectDate, toggleDate, isEndDateHidden } = this.props;
    return (
      <FormGroup>
        <Label>{label}</Label>
        {
          !isEndDateHidden &&
          <div className='input-group'>
            <DatePicker
              selected={value ? moment(value).toDate() : ''}
              onChange={(date) => selectDate(date, label)}
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              maxDate={moment().toDate()}
              dateFormat='dd/MM/yyyy'
              dropdownMode='select'
              className={'form-control'}
            />
          </div>
        }
        {
          (toggleDate && isEndDateHidden) &&
          <span><Button onClick={toggleDate}>Set End Date</Button></span>
        }
        {
          (toggleDate && !isEndDateHidden) &&
          <span><Button onClick={toggleDate}>Still Working Here</Button></span>
        }
      </FormGroup>
    );
  }
}

export default DatePickerWrapper;
