import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm, Field } from 'redux-form';
import * as actions from './../actions';

class Signup extends Component {

    signupSuccessRedirect() {
        if (this.props.auth && this.props.auth.signedUp) {
            this.props.history.push('/signupsuccess');
        }
    }

    onSubmit = formProps => {
        formProps.password = formProps.password1;
        this.props.signup(formProps);
    }

    renderEmailError = () => {
        switch (this.props.auth.signupErrorCode) {
            case 'auth/email-already-in-use':
            case 'auth/invalid-email':
                return (<div>{this.props.auth.signupErrorMessage}</div>);
            case 'auth/argument-error':
                return (<div>Please fill all form fields</div>);
            default:
                return false;
        }
    }

    renderPasswordError = () => {
        switch (this.props.auth.signupErrorCode) {
            case 'auth/weak-password':
            case 'auth/passwords-differ':
                return (<div>{this.props.auth.signupErrorMessage}</div>);
            default:
                return false;
        }
    }

    renderNameError = () => {
        switch (this.props.auth.signupErrorCode) {
            case 'auth/no-username':
                return (<div>{this.props.auth.signupErrorMessage}</div>);
            default:
                return false;
        }
    }

    componentDidUpdate() {
        this.signupSuccessRedirect();
    };

    render() {
        const { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit(this.onSubmit)}>
                <fieldset>
                    <label>Email</label>
                    <Field name="email" type="text" placeholder="Email" component="input" autoFocus />
                    {this.renderEmailError()}                    
                </fieldset>
                <fieldset>
                    <label>Username</label>
                    <Field name="displayName" type="text" placeholder="Username" autoComplete="username" component="input" />
                    {this.renderNameError()}
                </fieldset>
                <fieldset>
                    {this.renderPasswordError()}
                    <Field name="password1" type="password" placeholder="Password" component="input" autoComplete="new-password" />
                    <Field name="password2" type="password" placeholder="Repeat Password" component="input" autoComplete="new-password"/>
                    <button>Sign Up</button>
                </fieldset>
            </form>

        );
    }
}

function mapStateToProps(state) {
    return { auth: state.auth }
}

export default compose(
    connect(mapStateToProps, actions),
    reduxForm({ form: 'signup' })
)(Signup);
