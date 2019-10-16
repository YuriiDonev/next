import React, { Component } from 'react';
import moment from 'moment';
import { Router } from '../../routes.js';

import { Form, Input, Button, FormGroup, Label, Alert } from 'reactstrap';

import DatePickerWrapper from '../datepicker';

import { createPortfolio, updatePortfolio } from '../../services/endpoints.js';

class PortfolioCreateForm extends Component {

  state = {
    _id: this.props.initialValues._id || '',
    title: this.props.initialValues.title || '',
    description: this.props.initialValues.description || '',
    company: this.props.initialValues.company || '',
    codeUrl: this.props.initialValues.codeUrl || '',
    deployedAppLink: this.props.initialValues.deployedAppLink || '',
    language: this.props.initialValues.language || '',
    startDate: this.props.initialValues.startDate || '',
    endDate: this.props.initialValues.endDate || '',
    error: '',
    isEndDateHidden: false,
    isSubmitted: false
  }

  // componentDidUpdate() {
  //
  //   const { initialValues } = this.props;
  //
  //   console.log('initialValues ', initialValues);
  //
  //   if (this.state.title !== initialValues.title) {
  //     this.setState({ title: initialValues.title });
  //   }
  //
  // }

  handleChange = (event) => {
    const field = event.target.name;
    this.setState({ [field]: event.target.value, error: '',  isSubmitted: false });
  }

  setSubmitting = (isSubmitted) => {
    this.setState({ isSubmitted });
  }

  createNewPortfolio = (event) => {
    this.setSubmitting(true);
    this.validateData(() => {
      createPortfolio({
        title: this.state.title,
        description: this.state.description,
        company: this.state.company || null,
        codeUrl: this.state.codeUrl,
        deployedAppLink: this.state.deployedAppLink || null,
        language: this.state.language || null,
        startDate: this.state.startDate || null,
        endDate: this.state.endDate || null
      }).then(res => {
        this.setState({
          _id: '',
          title: '',
          description: '',
          company: '',
          codeUrl: '',
          deployedAppLink: '',
          language: '',
          startDate: '',
          endDate: '',
          error: ''
        });
        this.setSubmitting(false);
        Router.pushRoute('/portfolios');
      }, err => {
        if (err && err.response && err.response.data && err.response.data.message) {
          this.setState({ error: err.response.data.message });
        } else {
          this.setState({ error: 'Server error' });
        }
        this.setSubmitting(false);
      });
    });
    event.preventDefault();
  }

  updatePortfolio = (event) => {
    event.preventDefault();
    this.setSubmitting(true);
    this.validateData(() => {
      updatePortfolio({
        _id: this.state._id,
        title: this.state.title,
        description: this.state.description,
        company: this.state.company || null,
        codeUrl: this.state.codeUrl,
        deployedAppLink: this.state.deployedAppLink || null,
        language: this.state.language || null,
        startDate: this.state.startDate || null,
        endDate: this.state.endDate || null
      }).then(res => {
        this.setState({
          _id: '',
          title: '',
          description: '',
          company: '',
          codeUrl: '',
          deployedAppLink: '',
          language: '',
          startDate: '',
          endDate: '',
          error: ''
        });
        this.setSubmitting(false);
        Router.pushRoute('/portfolios');
      }, err => {
        if (err && err.response && err.response.data && err.response.data.message) {
          this.setState({ error: err.response.data.message });
        } else {
          this.setState({ error: 'Server error' });
        }
        this.setSubmitting(false);
      });
    });
    event.preventDefault();
  }

  validateData = (cb) => {
    const { title, description, codeUrl } = this.state;
    if (!title || !description || !codeUrl) {
      this.setState({ error: 'Fields marked as * are required' });
    } else {
      cb();
    }
  }

  selectDate = (date, label) => {
    if (label === 'Start date:') {
      const { endDate } = this.state;
      if (endDate && moment(date).isAfter(endDate)) {
        this.setState({ error: 'Start date can not be after end date', startDate: '', isSubmitted: false });
      } else {
        this.setState({ startDate: date, error: '' });
      }
    } else {
      const { startDate } = this.state;
      if (startDate && moment(date).isBefore(startDate)) {
        this.setState({ error: 'End date can not be before start date', endDate: '',  isSubmitted: false });
      } else {
        this.setState({ endDate: date, error: '',  isSubmitted: false });
      }
    }
  }

  toggleDate = () => {
    this.setState(prevState => ({ isEndDateHidden: !prevState.isEndDateHidden, endDate: '',  isSubmitted: false }));
  }

  render() {

    // console.log('this.state ', this.state);

    const { startDate, endDate, error, isEndDateHidden, isSubmitted } = this.state;

    const { isEdit } = this.props;

    return (
      <Form onSubmit={(e) => { isEdit ? this.updatePortfolio(e) : this.createNewPortfolio(e) }}>

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
            type="text"
            name='codeUrl'
            value={this.state.codeUrl}
            onChange={this.handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label>Deployed Application</Label>
          <Input
            type="text"
            name='deployedAppLink'
            value={this.state.deployedAppLink}
            onChange={this.handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label>Company</Label>
          <Input
            type="text"
            name='company'
            value={this.state.company}
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

        <Button
          type='submit'
          color='primary'
          size='lg'
          disabled={isSubmitted}
        >{ isEdit ? 'Edit' : 'Create' }</Button>

      </Form>
    );
  }
}

export default PortfolioCreateForm;
