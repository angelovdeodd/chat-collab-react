import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button, Label } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setUidToInvite } from './../actions/actionsInvite';
import { showModal } from './../actions/actionsModal';
import InviteUserModal from './invite/InviteUserModal';
import InviteButton from './invite/InviteButton';

class RoomUsers extends Component {

    handleClick = (uid) => {
        this.props.setUidToInvite(uid);
        this.props.showModal('invite-user');
    }

    renderInviteModal() {
        if (this.props.modal.activeModal === 'invite-user') {
            return <InviteUserModal/>;
        }
    }

    renderUsers() {
        const users = this.props.room.roomUsers[this.props.roomKey];
         if (!users) return false;

        return users.map(user => {
            if (user.userId === this.props.user.uid) {
                return (
                    <ListGroupItem bsStyle="success" key={user.userId}>{user.userName}</ListGroupItem>
                )
            } else {
                return (
                    <ListGroupItem style={{textAlign: 'right'}} key={user.userId}>
                        <div style={{width:'170px', textAlign: 'left', display: 'inline-block'}}>{user.userName}</div>
                        <InviteButton 
                            uid={user.userId}
                            userInvited={this.props.invitationsSent.find(el => el.targetUid === user.userId)}
                            onClick={this.handleClick} />
                    </ListGroupItem>
                );
            }
        });
    }

    render() {
        return (
            <div>
                <ListGroup>
                    {this.renderUsers()}
                </ListGroup>
                {this.renderInviteModal()}
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