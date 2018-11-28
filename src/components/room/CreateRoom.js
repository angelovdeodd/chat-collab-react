import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as actions from '../../actions';
import { reduxForm, Field } from 'redux-form';
import { Button, Label, Panel, Form, FormGroup, InputGroup, ControlLabel, Col } from 'react-bootstrap';
import TextInput from './../formControls/TextInput';
import NumberInput from './../formControls/NumberInput';
import ToggleButtonInput from './../formControls/ToggleButtonInput';
import authRequired from '../authRequired';
import abstractForm from './../hoc/abstractForm';

class CreateRoom extends Component {

    onSubmit = (form) => {
        console.log(form);
        console.log(this.props);
    }

    /*
    * Form-specific validation functions
    */
    minLength3 = this.props.minLength(3);
    minLength10 = this.props.minLength(10);
    maxLength25 = this.props.maxLength(25);
    maxLength55 = this.props.maxLength(55);

    render() {
        const { handleSubmit, invalid, pristine } = this.props;
        return (
            <Col sm={10}>
            <Panel bsStyle="primary">
                <Panel.Heading>Create New Room</Panel.Heading>
                <Panel.Body>
                    <Form horizontal onSubmit={handleSubmit(this.onSubmit)}>
                        <FormGroup validationState={this.props.getValidationState('roomName')}>
                            <Col sm={3} componentClass={ControlLabel}>Room Name:</Col>
                            <Col sm={3}>
                                <Field
                                    name="roomName"
                                    component={TextInput}
                                    placeholder="Room Name"
                                    validate={[this.minLength3, this.maxLength25, this.props.required]}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup validationState={this.props.getValidationState('roomDescription')}>
                            <Col sm={3} componentClass={ControlLabel}>Short description:</Col>
                            <Col sm={4}>
                                <Field
                                    name="roomDescription"
                                    component={TextInput}
                                    placeholder="Description"
                                    validate={[this.minLength10, this.maxLength55, this.props.required]}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col sm={3} componentClass={ControlLabel}>Visible on public list:</Col>
                            <Col sm={4}>
                                <Field
                                    name="roomType"
                                    defaultValue="visible"
                                    values={['visible', 'invisible']}
                                    component={ToggleButtonInput} />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col sm={3} componentClass={ControlLabel}>Anyone can join:</Col>
                            <Col sm={4}>
                                <Field
                                    name="roomInviteOnly"
                                    defaultValue="false"
                                    values={['true', 'false']}
                                    component={ToggleButtonInput} />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col sm={3} componentClass={ControlLabel}>Max number of users:</Col>
                            <Col sm={2}>
                                <Field
                                    component={NumberInput}
                                    name="maxUsers"
                                    defaultValue="5"
                                    maxValue="30"
                                    changeAction={this.props.change}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col sm={3}></Col>
                            <Col sm={4}>
                                <Button bsStyle="success" disabled={invalid || pristine}  type="submit">Create</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </Panel.Body>
            </Panel>
            </Col>
        )
    }
}

export default compose(
    connect(null, actions),
    reduxForm({form: 'createroom'})
)(authRequired(abstractForm(CreateRoom)));
