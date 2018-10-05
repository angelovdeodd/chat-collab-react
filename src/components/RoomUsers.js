import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button, Label } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setUidToInvite } from './../actions/actionsInvite';
import { showModal } from './../actions/actionsModal';
import InviteUserModal from './invite/InviteUserModal';

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

    renderInviteButton(user) {
        const userInvited = this.props.invite.invitationsSent.find(el => el.targetUid === user.userId);
        if(userInvited && userInvited.accepted) {
            return (
                <Label bsStyle="success">Accepted</Label>
            );
        } else if (userInvited && !userInvited.accepted & !userInvited.rejected) {
            return (
                <Label>Waiting...</Label>
            );
        } else {
            return (
                <Button 
                    onClick={(uid) => this.handleClick(user.userId)}
                    id="user-options"
                    bsSize="xsmall"
                    bsStyle="default">Invite</Button>
            );
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
                        {this.renderInviteButton(user)}
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
    return { room: state.rooms, user: state.auth.user, invite: state.invite, modal: state.modal };
}

export default connect(mapStateToProps, { showModal: showModal, setUidToInvite: setUidToInvite })(RoomUsers);