import React, { Component } from 'react';
import { Col, Panel } from 'react-bootstrap';

export default class LostPasswordConfirm extends Component {

    render() {
        return (
            <Col sm={8}>
            <Panel bsStyle="warning">
                <Panel.Heading>Password recovery - Step 2</Panel.Heading>
                <Panel.Body>
                    <p>Please check your email and proceed with the instructions in it.</p>
                </Panel.Body>
            </Panel>
            </Col>
        );
    }
}