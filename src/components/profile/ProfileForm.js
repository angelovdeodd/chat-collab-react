import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as actionsProfile from './../../actions/actionsProfile';
import * as actionsModal from './../../actions/actionsModal';
import { reduxForm, Field } from 'redux-form';
import { Button, Label, Panel, Form, FormControl, FormGroup, ControlLabel, Col, Glyphicon } from 'react-bootstrap';
import FieldInput from './inputs/FieldInput';
import TextareaInput from './inputs/TextareaInput';
import PasswordForm from './PasswordForm';
import PasswordChanged from './PasswordChanged';

class ProfileForm extends Component {

    state = {
        passwordFormVisible: false
    };

    onSubmit = (form) => {
        console.log(form);
    }

    onChangePasswordClick = () => {
        this.props.showModal('password-form');
    }

    renderPasswordModal() {
        if(this.props.modalState.activeModal === 'password-form') {
            return <PasswordForm />;
        }
    }
    renderPasswordChangedModal() {
        if(this.props.modalState.activeModal === 'password-changed') {
            return <PasswordChanged />
        }
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
            {this.renderPasswordModal()}
            {this.renderPasswordChangedModal()}
            </Col>
        );
    }
}

function mapStateToProps(state) {
    const { displayName, phonenumber, email, emailVerified, uid } = state.auth.user;
    if (displayName) {
        return { 
            initialValues: { 
                displayName: displayName,
                phonenumber: phonenumber,
                email: email,
                emailVerified: true,
                uid: uid
            },
            modalState: state.modal
        };
    } else {
        return {
            modalState: state.modal
        };
    }
}

export default compose(
    connect(mapStateToProps, { showModal: actionsModal.showModal }),
    reduxForm({ form: 'profile' })
)(ProfileForm);