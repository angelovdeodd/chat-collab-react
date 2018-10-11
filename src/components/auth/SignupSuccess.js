import React, { Component } from 'react';
import ConfirmationPanel from './hoc/ConfirmationPanel';

export default class SignupSuccess extends Component {
    render() {
        return (
            <ConfirmationPanel title="Sign up">
                    <p>Welcome! You have signed up successfully. Please check your mailbox and click
                        the link provided in email to confirm your address.</p>
                    <p>Click Profile to see your data or Rooms to start chatting.</p>
            </ConfirmationPanel>
        );
    }
}