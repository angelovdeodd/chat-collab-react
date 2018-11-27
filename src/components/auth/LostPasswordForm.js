import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm, Field } from 'redux-form';
import FieldInput from './../profile/inputs/FieldInput';
import { Form, Panel, Col, Button, FormGroup, HelpBlock, ControlLabel, FormControl } from 'react-bootstrap';
import { submitLostPasswordForm } from './../../actions/actionsProfile';
import abstractForm from './../hoc/abstractForm';

class LostPasswordForm extends Component {

    componentDidUpdate() {
        if (this.props.submitSucceeded) {
            this.props.history.push('/forgotpasswordsubmitted');
        }
    }

    render() {
        const { invalid, pristine, handleSubmit } = this.props;
        return (
            <Col sm={8} smOffset={2}>
                <Panel bsStyle="warning">
                    <Panel.Heading>Password recovery - Step 1</Panel.Heading>
                    <Panel.Body>
                        <Form horizontal onSubmit={handleSubmit(this.props.onSubmit)}>
                            <FormGroup validationState={this.props.getValidationState('email')}>
                                <Col sm={3} componentClass={ControlLabel}>Type your email</Col>
                                <Col sm={4} md={6}>
                                    <Field
                                        name="email"
                                        component={FieldInput}
                                        validate={[this.props.required, this.props.isEmail]}
                                    />
                                    <FormControl.Feedback />
                                </Col>
                                <HelpBlock>{this.props.getSyncError('email')}{this.props.getSubmitError('email')}</HelpBlock>
                            </FormGroup>
                            <FormGroup>
                                <Col sm={4} smOffset={3}>
                                    <Button disabled={ pristine || invalid } bsStyle="success" type="submit">Proceed</Button>
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
    return { forms: state.form };
}

export default compose(
    connect(mapStateToProps, { onSubmit: submitLostPasswordForm }),
    reduxForm({ form: 'lost_password' })
)(abstractForm(LostPasswordForm));