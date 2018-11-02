import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUidToInvite } from './../actions/actionsInvite';
import { showModal } from './../actions/actionsModal';
import InviteUserModal from './invite/InviteUserModal';
import UsersList from './room/UsersList';

class RoomUsers extends Component {

    handleClick = (uid) => {
        this.props.setUidToInvite(uid);
        this.props.showModal('invite-user');
    }

    render() {
        return (
            <div>
                <UsersList
                    uid={this.props.user.uid}
                    roomKey={this.props.roomKey}
                    users={this.props.room.roomUsers}
                    invitationsSent={this.props.invitationsSent}
                    inviteClickHandler={this.handleClick} />
                <InviteUserModal active={this.props.modal.activeModal === 'invite-user'} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { 
        room: state.rooms,
        user: state.auth.user,
        invitationsSent: state.invite.invitationsSent,
        modal: state.modal
    };
}

export default connect(mapStateToProps, { showModal: showModal, setUidToInvite: setUidToInvite })(RoomUsers);