import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm, Field } from 'redux-form';
import * as actions from './../actions';

class Signin extends Component {

    onSubmit = formProps => {
        this.props.signin(formProps);
    }

    signinSuccessRedirect() {
        if (this.props.auth.authenticated) {
            this.props.history.push('/');
        }
    }

    renderEmailError = () => {
        switch (this.props.auth.signinErrorCode) {
            case 'auth/user-not-found':
            case 'auth/invalid-email':
            case 'auth/user-disabled':
                return this.props.auth.signinErrorMessage;
            case 'auth/argument-error':
                return "Please fill all required fields";
            default:
                return false;
        }
    }

    renderPasswordError = () => {
        switch (this.props.auth.signinErrorCode) {
            case 'auth/wrong-password':
                return this.props.auth.signinErrorMessage;
            default:
                return false;
        }
    }

    componentDidUpdate() {
        this.signinSuccessRedirect();
    }


    render() {
        const { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit(this.onSubmit)}>
                <fieldset>
                    <div>{this.renderEmailError()}</div>
                    <Field name="email" type="text" placeholder="Email" component="input" autoFocus />
                </fieldset>
                <fieldset>
                    <div>{this.renderPasswordError()}</div>
                    <Field name="password" type="password" placeholder="Password" component="input" autoComplete="current-password" />
                </fieldset>
                <button>Log in</button>
            </form>
        );
    }
}

function mapStateToProps(state) {
    return { auth: state.auth };
}

export default compose(
    connect(mapStateToProps, actions),
    reduxForm({ form: 'signin' })
)(Signin);