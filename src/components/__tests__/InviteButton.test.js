import React from  'react';
import { Label } from 'react-bootstrap';
import InviteButton from './../invite/InviteButton';

describe('Invite Button', () => {

        it('should return Accepted when invitation is accepted', () => {
            const button = InviteButton({
                uid: '1',
                userInvited: { accepted: true },
                onClick: null
            });
            expect(button).toEqual(<Label bsClass="label" bsStyle="success">Accepted</Label>);
        });

});