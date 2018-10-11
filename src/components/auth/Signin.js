import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm, Field } from 'redux-form';
import * as validator from 'validator';
import FieldInput from './../profile/inputs/FieldInput';
import { Form, Panel, Col, Button, FormGroup, HelpBlock, ControlLabel } from 'react-bootstrap';
import { submitSignin } from '../../actions/actionsProfile';

class Signin extends Component {

    /*
    * Validation functions
    */
    required = (value) => (!value || value.length === 0) ? true : undefined;
    isEmail = value => value && validator.isEmail(value) ? undefined : 'must be proper email';

    /*
    * Redirect to profile page when form submitted successfully
    */
    componentDidUpdate() {
        if (this.props.submitSucceeded) {
            this.props.history.push('/profile');
        }
    }

    /*
    * Returns field-specific submit error to be displayed in HelpBlock
    */
   getSubmitError = fieldName => {
        if( !this.props.forms.signin ||
            !this.props.forms.signin.submitErrors ||
            !this.props.forms.signin.submitErrors[fieldName]) {

            return null;
        }
        return this.props.forms.signin.submitErrors[fieldName];
    }

    /*
    * Returns general form error
    */
    getGeneralError = () => {
        if (this.props.forms.signin && this.props.forms.signin.error) {
            return this.props.forms.signin.error;
        }
    }

    render() {
        const { handleSubmit, pristine, invalid } = this.props;
        return (
            <Col sm={8} smOffset={2}>
                <Panel bsStyle="primary">
                    <Panel.Heading>Log in</Panel.Heading>
                    <Panel.Body>
                        <Form horizontal onSubmit={handleSubmit(this.props.submitSignin)}>
                            <FormGroup>
                                <Col xs={2} sm={2} componentClass={ControlLabel}>Email</Col>
                                <Col xs={6} sm={7}>
                                    <Field
                                        name="email"
                                        type="text"
                                        placeholder="Email"
                                        component={FieldInput}
                                        validate={[ this.required, this.isEmail ]}
                                        autoFocus />
                                    <HelpBlock>{this.getSubmitError('email')}</HelpBlock>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col xs={2} sm={2} componentClass={ControlLabel}>Password</Col>
                                <Col xs={6} sm={7}>
                                    <Field
                                        name="password"
                                        type="password"
                                        placeholder="Password"
                                        component={FieldInput}
                                        validate={this.required}
                                        autoComplete="current-password" />
                                    <HelpBlock>{this.getSubmitError('password')}</HelpBlock>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col sm={2}></Col>
                                <Col sm={3}>
                                    <Button bsStyle="success" disabled={pristine || invalid} type="submit">Log in</Button>
                                </Col>
                                <HelpBlock>{this.getGeneralError()}</HelpBlock>
                            </FormGroup>
                        </Form>     
                    </Panel.Body>
                </Panel>
            </Col>
        );
    }
}

function mapStateToProps(state) {
    return { auth: state.auth, forms: state.form };
}

export default compose(
    connect(mapStateToProps, { submitSignin: submitSignin }),
    reduxForm({ form: 'signin' })
)(Signin);