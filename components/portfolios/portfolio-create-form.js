import React, { Component } from 'react';
import moment from 'moment';
import { Router } from '../../routes.js';
import { Form, Button, Alert } from 'reactstrap';
import DatePickerWrapper from '../datepicker';
import { createPortfolio, updatePortfolio } from '../../services/endpoints.js';
import FormGroupComponent from './form-group-component.js';

const clearState = {
  _id: '',
  title: '',
  description: '',
  appGoal: '',
  company: '',
  codeUrl: '',
  deployedAppLink: '',
  imgUrl: '',
  language: '',
  startDate: '',
  endDate: '',
  error: ''
};

const checkIsValidURL = (str) => {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}

class PortfolioCreateForm extends Component {

  state = {
    _id: this.props.initialValues._id || '',
    title: this.props.initialValues.title || '',
    appGoal: this.props.initialValues.appGoal || '',
    description: this.props.initialValues.description || '',
    company: this.props.initialValues.company || '',
    codeUrl: this.props.initialValues.codeUrl || '',
    deployedAppLink: this.props.initialValues.deployedAppLink || '',
    imgUrl: this.props.initialValues.imgUrl || '',
    language: this.props.initialValues.language || '',
    startDate: this.props.initialValues.startDate || '',
    endDate: this.props.initialValues.endDate || '',
    error: '',
    isEndDateHidden: false,
    isSubmitted: false
  }

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
        appGoal: this.state.appGoal || null,
        description: this.state.description,
        company: this.state.company || null,
        codeUrl: this.state.codeUrl || null,
        deployedAppLink: this.state.deployedAppLink || null,
        imgUrl: this.state.imgUrl || null,
        language: this.state.language || null,
        startDate: this.state.startDate || null,
        endDate: this.state.endDate || null
      }).then(res => {
        this.setState(clearState);
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
        appGoal: this.state.appGoal || null,
        description: this.state.description,
        company: this.state.company || null,
        codeUrl: this.state.codeUrl || null,
        deployedAppLink: this.state.deployedAppLink || null,
        imgUrl: this.state.imgUrl || null,
        language: this.state.language || null,
        startDate: this.state.startDate || null,
        endDate: this.state.endDate || null
      }).then(res => {
        this.setState(clearState);
        this.setSubmitting(false);
        // Router.pushRoute('/portfolios');
        Router.push({ pathname: '/portfolios' });
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
    const { title, description, codeUrl, imgUrl } = this.state;
    if (!title || !description) {
      this.setState({ error: 'Fields marked as * are required' });
      return;
    }
    if (codeUrl) {
      const isValidUrl = checkIsValidURL(codeUrl);
      if (!isValidUrl) {
        this.setState({ error: 'Application Code URL is not valid' });
        return;
      }
    }
    if (imgUrl && !checkIsValidURL(imgUrl)) {
      this.setState({ error: 'Image URL is not valid' });
      return;
    }
    cb();
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
    const { startDate, endDate, error, isEndDateHidden, isSubmitted } = this.state;
    const { isEdit } = this.props;

    return (
      <Form onSubmit={(e) => { isEdit ? this.updatePortfolio(e) : this.createNewPortfolio(e) }}>
        <FormGroupComponent
          title='Title*'
          type='text'
          name='title'
          value={this.state.title}
          onChangeHandler={this.handleChange}
        />
        <FormGroupComponent
          title='Application goal'
          type='textarea'
          name='appGoal'
          value={this.state.appGoal}
          onChangeHandler={this.handleChange}
        />
        <FormGroupComponent
          title='Description*'
          type='textarea'
          name='description'
          value={this.state.description}
          onChangeHandler={this.handleChange}
        />
        <FormGroupComponent
          title='Application Code'
          type='text'
          name='codeUrl'
          value={this.state.codeUrl}
          onChangeHandler={this.handleChange}
        />
        <FormGroupComponent
          title='Deployed Application'
          type='text'
          name='deployedAppLink'
          value={this.state.deployedAppLink}
          onChangeHandler={this.handleChange}
        />
        <FormGroupComponent
          title='Image URL'
          type='text'
          name='imgUrl'
          value={this.state.imgUrl}
          onChangeHandler={this.handleChange}
        />
        <FormGroupComponent
          title='Company'
          type='text'
          name='company'
          value={this.state.company}
          onChangeHandler={this.handleChange}
        />
        <FormGroupComponent
          title='Tech Stack'
          type='text'
          name='language'
          value={this.state.language}
          onChangeHandler={this.handleChange}
        />
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
