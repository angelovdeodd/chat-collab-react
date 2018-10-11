import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as validator from 'validator';
import { reduxForm, Field } from 'redux-form';
import { Button, Label, Panel, Form, FormGroup, FormControl, ControlLabel, Col, HelpBlock } from 'react-bootstrap';
import FieldInput from './../profile/inputs/FieldInput';
import { submitSignup } from './../../actions/actionsProfile';

class Signup extends Component {

    // Validation functions
    required = (value) => (!value || value.length === 0) ? true : undefined;
    minLength = min => value => value && value.length < min ? `must have at least ${min} characters` : undefined;
    maxLength = max => value => value && value.length > max ? `must not have more than ${max} characters` : undefined;

    minLength3 = this.minLength(3);
    minLength6 = this.minLength(6);
    maxLength25 = this.maxLength(25);

    isEmail = value => value && validator.isEmail(value) ? undefined : 'must be proper email';
    password1MustMatch = (value, allValues) => value !== allValues.password1 ? 'passwords must match' : undefined;
    password2MustMatch = (value, allValues) => value !== allValues.password2 ? 'passwords must match' : undefined;

    /*
    * Move to signup success page after form is submitted
    */
    componentDidUpdate() {
        if (this.props.submitSucceeded) {
            this.props.history.push('/signupsuccess');
        }
    };

    /*
    * Returns validation state for Bootstrap FormGroup
    */
    getValidationState = fieldName => {
        if (!this.props.forms.signup ||
            !this.props.forms.signup.values ||
            !this.props.forms.signup.values[fieldName]) {
            return null;
        }

        if (this.props.forms.signup.syncErrors &&
            this.props.forms.signup.syncErrors[fieldName]) {
        
            return 'warning';
        }

        if (this.props.forms.signup.submitErrors &&
            this.props.forms.signup.submitErrors[fieldName]) {
                return 'error';
        }

        return 'success';
    }

    /*
    * Returns sync error for given field, to be displayed in HelpBlock
    */
    getSyncError = fieldName => {
        if(!this.props.forms.signup ||
            !this.props.forms.signup.values) return null;

        if(this.props.forms.signup.syncErrors &&
            this.props.forms.signup.syncErrors[fieldName]) {
            
            return this.props.forms.signup.syncErrors[fieldName];
        }
    }

    /*
    * Returns submit error to be displayed in HelpBlock
    */
    getSubmitError = fieldName => {
        if(!this.props.forms.signup ||
            !this.props.forms.signup.submitErrors ||
            !this.props.forms.signup.submitErrors[fieldName]) {

            return null;
        }
        return this.props.forms.signup.submitErrors[fieldName];
    }

    render() {
        const { handleSubmit, invalid, pristine } = this.props;
        console.log("PROPFORM", this.props);
        return (
            <Col sm={10}>
            <Panel bsStyle="primary">
                <Panel.Heading>Sign up</Panel.Heading>
                <Panel.Body>
                    <Form horizontal onSubmit={handleSubmit(this.props.submitSignup)}>
                    <FormGroup validationState={this.getValidationState('email')}>
                        <Col sm={3} componentClass={ControlLabel}>Email</Col>
                        <Col sm={4}>
                            <Field
                                name="email" 
                                type="text" 
                                placeholder="Email" 
                                component={FieldInput}
                                validate={[this.required, this.isEmail]}
                                autoFocus />
                            <FormControl.Feedback />
                        </Col>
                        <HelpBlock>{this.getSyncError('email')}{this.getSubmitError('email')}</HelpBlock>               
                    </FormGroup>
                    <FormGroup validationState={this.getValidationState('displayName')}>
                        <Col sm={3} componentClass={ControlLabel}>Username</Col>
                        <Col sm={4}>
                            <Field 
                                name="displayName"
                                type="text"
                                placeholder="Username"
                                autoComplete="username"
                                component={FieldInput}
                                validate={[this.minLength3, this.maxLength25, this.required]}
                                />
                            <FormControl.Feedback />
                        </Col>
                        <HelpBlock>
                            {this.getSyncError('displayName')}
                        </HelpBlock>
                    </FormGroup>
                    <FormGroup validationState={this.getValidationState('password1')}>
                        <Col sm={3} componentClass={ControlLabel}>Password</Col>
                        <Col sm={4}>
                            <Field
                                name="password1"
                                type="password"
                                placeholder="Password"
                                component={FieldInput}
                                validate={[this.required, this.minLength6, this.password2MustMatch]}
                                autoComplete="new-password" />
                                <FormControl.Feedback />
                        </Col>
                        <HelpBlock>{this.getSyncError('password1')}</HelpBlock>
                    </FormGroup>
                    <FormGroup validationState={this.getValidationState('password2')}>
                        <Col sm={3} componentClass={ControlLabel}>Repeat password</Col>
                        <Col sm={4}>
                            <Field
                                name="password2"
                                type="password"
                                placeholder="Repeat Password"
                                component={FieldInput}
                                validate={[this.required, this.minLength6, this.password1MustMatch]}
                                autoComplete="new-password"/>
                                <FormControl.Feedback />
                        </Col>
                        <HelpBlock>{this.getSyncError('password2')}</HelpBlock>
                    </FormGroup>
                    <FormGroup>
                        <Col sm={3}></Col>
                        <Col sm={4}>
                            <Button bsStyle="success" disabled={invalid || pristine}  type="submit">Sign Up</Button>
                        </Col>
                    </FormGroup>
                </Form>

            </Panel.Body>
            </Panel>
            </Col>

        );
    }
}

function mapStateToProps(state) {
    return { auth: state.auth, forms: state.form }
}

export default compose(
    connect(mapStateToProps, { submitSignup: submitSignup }),
    reduxForm({ form: 'signup' })
)(Signup);
