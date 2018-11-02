import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import InviteButton from './../invite/InviteButton';

const UsersList = ({ uid, users, roomKey, invitationsSent, inviteClickHandler }) =>
    <ListGroup>
        {
            users[roomKey] ?
                (
                    users[roomKey].map(user =>
                        user.userId === uid ? 
                            <ListGroupItem bsStyle="success" key={user.userId}>{user.userName}</ListGroupItem>
                        :(
                            <ListGroupItem style={{textAlign: 'right'}} key={user.userId}>
                                <div style={{width:'170px', textAlign: 'left', display: 'inline-block'}}>{user.userName}</div>
                                <InviteButton 
                                    uid={user.userId}
                                    userInvited={invitationsSent.find(el => el.targetUid === user.userId)}
                                    onClick={inviteClickHandler} />
                            </ListGroupItem>
                        )
                    )
                ) : false
        }
    </ListGroup>

export default UsersList;