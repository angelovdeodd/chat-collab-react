import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const CreateRoomResult = ({ ...props }) => {
    return (
        <Modal animation={false} show={true} onHide={props.hideModal}>
            <Modal.Header closeButton>
                <Modal.Title>Information</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Room created successfully
            </Modal.Body>
            <Modal.Footer>
                <Button bsStyle="success" onClick={props.hideModal}>Dismiss</Button>
                <Button bsStyle="success" onClick={props.openNewRoom}>Open Room</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreateRoomResult;