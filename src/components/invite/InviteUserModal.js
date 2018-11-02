import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ButtonToolbar, ToggleButton, ToggleButtonGroup, ControlLabel, FormControl, Modal, Button } from 'react-bootstrap';
import { sendInvite } from './../../actions/actionsInvite';
import { showModal, hideModal } from './../../actions/actionsModal';

class InviteUserModal extends Component {

    state = {
        formData: {
            title: '',
            convType: 'private',
            convVisibl: 'hidden'
        },
        enableSend: false
    };

    handleChange = (event) => {
        this.setState({ formData: {...this.state.formData, title: event.target.value } });
        this.setState({ enableSend: (event.target.value.length >= 3) })
    }

    handleTypeChange = (value) => {
        if (value === 'hidden' || value === 'visible') {
            this.setState({ formData: {...this.state.formData, convVisibl: value } });
        }
        if (value === 'public' || value === 'private') {
            this.setState({ formData: {...this.state.formData, convVisibl: value } });
        }
    };

    handleAccept = () => {
        this.props.hideModal();
        this.props.sendInvite(this.props.invite.targetUid, this.state.formData);
    };

    handleCancel = () => {
        this.props.hideModal();
    };

    renderSendButton() {
        if (this.state.enableSend) {
            return <Button bsStyle="success" onClick={this.handleAccept}>Send invitation</Button>
        } else {
            return <Button bsStyle="success" disabled>Send invitation</Button>
        }
    }

    render() {
        if (!this.props.active) return false;
        
        return (
            <div className="static-modal">
            <Modal.Dialog>
                <Modal.Header>
                <Modal.Title>Invite User</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form>
                        <ControlLabel>Conversation title</ControlLabel>
                        <FormControl 
                            type="text"
                            autoFocus
                            value={this.state.title} 
                            placeholder="Enter room name" 
                            onChange={this.handleChange} />
                    

                        <ControlLabel>Conversation will be</ControlLabel>
                        <ButtonToolbar>
                            <ToggleButtonGroup onChange={this.handleTypeChange} type="radio" name="conv_visibl" defaultValue="visible">
                                <ToggleButton value="visible">Visible</ToggleButton>
                                <ToggleButton value="hidden">Hidden</ToggleButton>
                            </ToggleButtonGroup>
                        </ButtonToolbar>
                        <ControlLabel>Everyone can join</ControlLabel>
                        <ButtonToolbar>
                            <ToggleButtonGroup onChange={this.handleTypeChange} type="radio" name="conv_type" defaultValue="public">
                                <ToggleButton value="public">Yes</ToggleButton>
                                <ToggleButton value="private">No, invitation only</ToggleButton>
                            </ToggleButtonGroup>
                        </ButtonToolbar>
                    </form>
                </Modal.Body>

                <Modal.Footer>
                <Button bsStyle="warning" onClick={this.handleCancel}>Cancel</Button>
                {this.renderSendButton()}
                </Modal.Footer>
            </Modal.Dialog>
            </div>
        );
    }

}

function mapStateToProps(state) {
    return { auth: state.auth, invite: state.invite };
}

export default connect(mapStateToProps,
    {
        sendInvite: sendInvite,
        showModal: showModal,
        hideModal: hideModal
    }
)(InviteUserModal);    
