import React, { Component } from 'react';
import { Col, Panel } from 'react-bootstrap';

export default class ConfirmationPanel extends Component {
    render() {
        return (
            <Col sm={8}>
            <Panel bsStyle="primary">
                <Panel.Heading>{this.props.title}</Panel.Heading>
                <Panel.Body>
                    {this.props.children}
                </Panel.Body>
            </Panel>
            </Col>
        );
    }
}
