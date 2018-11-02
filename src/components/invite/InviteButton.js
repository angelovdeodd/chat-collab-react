import React from 'react';
import { Button, Label } from 'react-bootstrap';

const InviteButton  = ({uid, userInvited, onClick}) => {
    if(userInvited && userInvited.accepted) {
        return (
            <Label bsStyle="success">Accepted</Label>
        );
    } else if(userInvited && !userInvited.accepted & !userInvited.rejected) {
        return (
            <Label>Waiting...</Label>
        );
    } else {
        return (
            <Button 
                onClick={() => onClick(uid)}
                id="user-options"
                bsSize="xsmall"
                bsStyle="default">Invite</Button>
        );
    }
}

export default InviteButton;