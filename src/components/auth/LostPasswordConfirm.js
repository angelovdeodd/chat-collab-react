import React, { Component } from 'react';
import ConfirmationPanel from './hoc/ConfirmationPanel';

export default class LostPasswordConfirm extends Component {
    render() {
        return (
            <ConfirmationPanel title="Password recovery - Step 2">
                    <p>Please check your email and proceed with the instructions in it.</p>
            </ConfirmationPanel>
        );
    }
}