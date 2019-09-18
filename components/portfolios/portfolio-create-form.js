import React from 'react';
import moment from 'moment';

import { Form, Input, Button, FormGroup, Label, Alert } from 'reactstrap';

import DatePickerWrapper from '../datepicker';

class PortfolioCreateForm extends React.Component {

  state = {
    title: '',
    description: '',
    company: '',
    codeUrl: '',
    deployedAppLink: '',
    language: '',
    startDate: '',
    endDate: '',
    error: '',
    isEndDateHidden: false
  }

  handleChange = (event) => {
    const field = event.target.name;
    this.setState({ [field]: event.target.value });
  }

  createNewPortfolio = (event) => {
    console.log('Create this.state ', this.state);
    alert(JSON.stringify(this.state));
    event.preventDefault();
  }

  selectDate = (date, label) => {
    if (label === 'Start date:') {
      const { endDate } = this.state;
      if (endDate && moment(date).isAfter(endDate)) {
        this.setState({ error: 'Start date can not be after end date', startDate: '' });
      } else {
        this.setState({ startDate: date, error: '' });
      }
    } else {
      const { startDate } = this.state;
      if (startDate && moment(date).isBefore(startDate)) {
        this.setState({ error: 'End date can not be before start date', endDate: '' });
      } else {
        this.setState({ endDate: date, error: '' });
      }
    }
  }

  toggleDate = () => {
    console.log('toggleDate ');
    this.setState(prevState => ({ isEndDateHidden: !prevState.isEndDateHidden, endDate: '' }));
  }

  render() {

    console.log('this.state ', this.state);

    const { startDate, endDate, error, isEndDateHidden } = this.state;

    return (
      <Form onSubmit={this.createNewPortfolio}>

        <FormGroup>
          <Label>Title*</Label>
          <Input
            type="text"
            name='title'
            value={this.state.title}
            onChange={this.handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label>Description*</Label>
          <Input
            type="textarea"
            name='description'
            value={this.state.description}
            onChange={this.handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label>Application Code*</Label>
          <Input
            type="textarea"
            name='codeUrl'
            value={this.state.description}
            onChange={this.handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label>Deployed Application*</Label>
          <Input
            type="textarea"
            name='deployedAppLink'
            value={this.state.description}
            onChange={this.handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label>Company</Label>
          <Input
            type="text"
            name='company'
            value={this.state.description}
            onChange={this.handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label>Pick main technology:</Label>
          <div className='input-group'>
            <select className='form-control' name='language' value={this.state.language} onChange={this.handleChange}>
              <option value="react">React</option>
              <option value="angular">Angular</option>
              <option value="vue">Vue</option>
              <option value="javascript">Javascript</option>
            </select>
          </div>
        </FormGroup>

        <DatePickerWrapper
          label={'Start date:'}
          value={startDate}
          selectDate={this.selectDate}
        />

        <DatePickerWrapper
          label={'End date:'}
          value={endDate}
          selectDate={this.selectDate}
          isEndDateHidden={isEndDateHidden}
          toggleDate={this.toggleDate}
        />

        {
          error &&
          <Alert color="danger">{error}</Alert>
        }

        <Button type='submit' color='primary' size='lg'>Create</Button>


      </Form>
    );
  }
}

export default PortfolioCreateForm;
