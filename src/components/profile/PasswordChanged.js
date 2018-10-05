import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { hideModal } from './../../actions/actionsModal';

class PasswordChanged extends Component {

    render() {
        return (
            <Modal animation={false} show={true} onHide={this.props.hideModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Password changed successfully
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="success" onClick={this.props.hideModal}>OK</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default connect(null, { hideModal: hideModal })(PasswordChanged);