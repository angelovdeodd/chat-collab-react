import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm, Field } from 'redux-form';
import { Button, Panel, Form, FormGroup, FormControl, ControlLabel, Col, HelpBlock } from 'react-bootstrap';
import FieldInput from './../profile/inputs/FieldInput';
import { submitSignup } from './../../actions/actionsProfile';
import abstractForm from './../hoc/abstractForm';

class Signup extends Component {

    /*
    * Form-specific validation functions
    */
    minLength3 = this.props.minLength(3);
    minLength6 = this.props.minLength(6);
    maxLength25 = this.props.maxLength(25);
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

    render() {
        const { handleSubmit, invalid, pristine } = this.props;
        return (
            <Col sm={10}>
            <Panel bsStyle="primary">
                <Panel.Heading>Sign up</Panel.Heading>
                <Panel.Body>
                    <Form horizontal onSubmit={handleSubmit(this.props.submitSignup)}>
                    <FormGroup validationState={this.props.getValidationState('email')}>
                        <Col xsHidden sm={3} componentClass={ControlLabel}>Email</Col>
                        <Col sm={4}>
                            <Field
                                name="email" 
                                type="text" 
                                placeholder="Email" 
                                component={FieldInput}
                                validate={[this.props.required, this.props.isEmail]}
                                autoFocus />
                            <FormControl.Feedback />
                        </Col>
                        <HelpBlock>{this.props.getSyncError('email')}{this.props.getSubmitError('email')}</HelpBlock>               
                    </FormGroup>
                    <FormGroup validationState={this.props.getValidationState('displayName')}>
                        <Col xsHidden sm={3} componentClass={ControlLabel}>Username</Col>
                        <Col sm={4}>
                            <Field 
                                name="displayName"
                                type="text"
                                placeholder="Username"
                                autoComplete="username"
                                component={FieldInput}
                                validate={[this.minLength3, this.maxLength25, this.props.required]}
                                />
                            <FormControl.Feedback />
                        </Col>
                        <HelpBlock>
                            {this.props.getSyncError('displayName')}
                        </HelpBlock>
                    </FormGroup>
                    <FormGroup validationState={this.props.getValidationState('password1')}>
                        <Col xsHidden sm={3} componentClass={ControlLabel}>Password</Col>
                        <Col sm={4}>
                            <Field
                                name="password1"
                                type="password"
                                placeholder="Password"
                                component={FieldInput}
                                validate={[this.props.required, this.minLength6, this.password2MustMatch]}
                                autoComplete="new-password" />
                                <FormControl.Feedback />
                        </Col>
                        <HelpBlock>{this.props.getSyncError('password1')}</HelpBlock>
                    </FormGroup>
                    <FormGroup validationState={this.props.getValidationState('password2')}>
                        <Col xsHidden sm={3} componentClass={ControlLabel}>Repeat password</Col>
                        <Col sm={4}>
                            <Field
                                name="password2"
                                type="password"
                                placeholder="Repeat Password"
                                component={FieldInput}
                                validate={[this.props.required, this.minLength6, this.password1MustMatch]}
                                autoComplete="new-password"/>
                                <FormControl.Feedback />
                        </Col>
                        <HelpBlock>{this.props.getSyncError('password2')}</HelpBlock>
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
)(abstractForm(Signup));
