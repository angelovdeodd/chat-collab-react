import React, { Component } from 'react';
import { Col, Panel } from 'react-bootstrap';

export default class SignupSuccess extends Component {

    render() {
        return (
            <Col sm={8}>
            <Panel bsStyle="primary">
                <Panel.Heading>Sign up</Panel.Heading>
                <Panel.Body>
                    <p>Welcome! You have signed up successfully. Please check your mailbox and click
                        the link provided in email to confirm your address.</p>
                    <p>Click "Profile" to see your data or "Rooms" to start chatting.</p>
                </Panel.Body>
            </Panel>
            </Col>
        );
    }
}