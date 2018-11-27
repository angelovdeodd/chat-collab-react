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

class CreateRoom extends Component {
    state = { name: '' };

    handleChange = (event) => {
        this.setState({ name: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.saveRoom(this.state.name);
        this.setState({ name: '' });
    }

    render() {
        console.log("CREATEROOM PROPS", this.props);
        return (
            <Col sm={10}>
            <Panel bsStyle="primary">
                <Panel.Heading>Create New Room</Panel.Heading>
                <Panel.Body>
                    <Form horizontal onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Col sm={3} componentClass={ControlLabel}>Room Name:</Col>
                            <Col sm={4}>
                                <Field
                                    name="roomName"
                                    component={TextInput}
                                    placeholder="Room Name" />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col sm={3} componentClass={ControlLabel}>Visible on public list:</Col>
                            <Col sm={4}>
                                <Field
                                    name="roomType"
                                    default="visible"
                                    values={['visible', 'invisible']}
                                    component={ToggleButtonInput} />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col sm={3} componentClass={ControlLabel}>Anyone can join:</Col>
                            <Col sm={4}>
                                <Field
                                    name="roomInviteOnly"
                                    default="false"
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
                                    changeAction={this.props.change}
                                />
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
)(authRequired(CreateRoom));
