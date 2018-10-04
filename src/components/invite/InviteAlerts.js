import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../../actions/actionsInvite';
import { Alert, Button } from 'react-bootstrap';


class InviteAlerts extends Component {

    componentDidMount() {
        this.props.setInvitesWatcher();
    }

    componentWillUnmount() {
        this.props.unsetInvitesWatcher();
    }

    handleDismiss = (key) => {
        this.props.rejectInvitation(key);
    }

    handleAccept = (key) => {
        this.props.acceptInvitation(key);
    }

    renderAlerts() {
        return this.props.invite.invitationsReceived.map((invite) => {
            if (invite.accepted || invite.stage === 'opening') return false;

            return (
                <Alert key={invite.key} bsStyle="info" onDismiss={this.handleDismiss}>
                    <div style={{width: '70%', display: 'inline-block'}}>
                        User {invite.originName} invites you to {invite.type} conversation <b>{invite.roomName}</b><br />
                        Conversation will be {invite.visibility}
                    </div>
                    <div style={{width: '30%', display: 'inline-block', textAlign: 'right'}}>
                            <Button bsStyle="warning" onClick={(key) => this.handleDismiss(invite.key)}>Reject</Button>&nbsp;
                            <Button bsStyle="success" onClick={(key) => this.handleAccept(invite.key)}>Accept</Button>
                    </div>
                </Alert>
            );
        });
    }

    render() {
        return (
            <div>{this.renderAlerts()}</div>
        );
    }
}

function mapStateToProps(state) {
    return { invite: state.invite };
}

export default connect(mapStateToProps, actions)(InviteAlerts);