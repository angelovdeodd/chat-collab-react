import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as actions from './../../actions/actionsProfile';
import { reduxForm, Field } from 'redux-form';
import { Button, Label, Panel, Form, FormControl, FormGroup, ControlLabel, Col, Glyphicon } from 'react-bootstrap';

const FieldInput = ({ input, meta, ...props }) => {
    return (
        <FormControl 
            type={props.type}
            placeholder={props.placeholder}
            value={input.value}
            onChange={input.onChange} />
    );
}

const TextareaInput = ({ input, meta, ...props }) => {
    return (
        <FormControl
            componentClass={props.type}
            placeholder={props.placeholder}
            value={input.value}
            onChange={input.onChange} />
    )
}

class ProfileForm extends Component {

    state = {
        passwordFormVisible: false
    };

    onSubmit = (form) => {
        console.log(form);
    }

    onChangePasswordClick = () => {
        this.setState({ passwordFormVisible: true });
    }

    renderEmailVerified() {
        if (!this.props.initialValues || !this.props.initialValues.emailVerified) {
            return (
                <section>
                <Col sm={1}><h5><Label>Not verified</Label></h5></Col>
                <Col sm={1}></Col>
                <Col sm={1}>
                    <Button bsStyle="info">Send link</Button>
                </Col>
                </section>
            );
        }
    }

    renderEmailChange() {
        if (this.props.initialValues && this.props.initialValues.emailVerified) {
            return (
                <section>
                    <Col sm={1}><Button bsStyle="warning">Change Email Address</Button></Col>
                </section>
            );
        }
    }

    renderPasswordButton() {
        if (this.props.initialValues && this.props.initialValues.emailVerified) {
            if (!this.state.passwordFormVisible) {
                return (<Button bsStyle="warning" onClick={this.onChangePasswordClick}>Change Password</Button>);
            }
        } else {
            return (<Button disabled bsStyle="warning">Change Password</Button> );
        }
    }

    renderPasswordForm() {
        if (this.state.passwordFormVisible) {
            return (
                <section>
                    <FormGroup>
                        <Col sm={4} componentClass={ControlLabel}>Old password:</Col>
                        <Col sm={4}>
                            <Field name="oldPassword" type="password" component={FieldInput} />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                    <Col sm={4} componentClass={ControlLabel}>New password:</Col>
                        <Col sm={4}>
                            <Field name="password1" type="password" component={FieldInput} />
                        </Col> 
                    </FormGroup>
                    <FormGroup>
                    <Col sm={4} componentClass={ControlLabel}>Repeat:</Col>
                        <Col sm={4}>
                            <Field name="password2" type="password" component={FieldInput} />
                        </Col> 
                    </FormGroup>
                </section>
            );
        }
    }

    render() {
        return (
            <Col sm={10}>
            <Panel bsStyle="primary">
                <Panel.Heading>Your Profile</Panel.Heading>
                <Panel.Body>
                    <Form horizontal onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Col sm={3} componentClass={ControlLabel}>User Name:</Col>
                            <Col sm={4}>
                                <Field
                                    name="displayName"
                                    type='text'
                                    component={FieldInput}
                                    placeholder="username" />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                        <Col sm={3} componentClass={ControlLabel}>Email:</Col>
                            <Col sm={4}>
                                <Field
                                    name="email"
                                    type='email'
                                    disabled
                                    component={FieldInput}
                                    placeholder="email" />
                            </Col>
                            {this.renderEmailVerified()}
                            {this.renderEmailChange()}
                        </FormGroup>
                        <FormGroup>
                            <Col sm={3} componentClass={ControlLabel}>Password</Col>
                            <Col sm={8}>
                                {this.renderPasswordButton()}
                                {this.renderPasswordForm()}
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col sm={3} componentClass={ControlLabel}>Introduction: </Col>
                            <Col sm={6}>
                                <Field name="introduction" type='textarea' component={TextareaInput}
                                    placeholder="Type a few words" />
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
    console.log("STARE", state.auth.user);
    const { displayName, phonenumber, email, emailVerified, uid } = state.auth.user;
    if (displayName) {
        return { initialValues: 
            { 
                displayName: displayName,
                phonenumber: phonenumber,
                email: email,
                emailVerified: true,
                uid: uid
            } 
        };
    } else {
        return {};
    }
}

export default compose(
    connect(mapStateToProps, actions),
    reduxForm({ form: 'profile' })
)(ProfileForm);