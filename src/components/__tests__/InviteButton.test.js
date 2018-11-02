import React from  'react';
import { Label, Button } from 'react-bootstrap';
import { shallow } from 'enzyme';
import InviteButton from './../invite/InviteButton';

describe('Invite Button', () => {

        it('should return Label Accepted when invitation is accepted', () => {
            const props = {
                userInvited: { accepted: true }
            };
            const button = shallow(<InviteButton {...props} />);
            expect(button.find(Label)).toHaveLength(1);
            expect(button.contains('Accepted')).toEqual(true);
        });

        it('should return Label Waiting when invitation is sent but not accepted', () => {
            const props = {
                userInvited: { accepted: false, rejected: false },
            };
            const button = shallow(<InviteButton {...props} />);
            expect(button.find(Label)).toHaveLength(1);
            expect(button.contains('Waiting...')).toEqual(true);
        });

        it('should return Button component when no invitation is sent', () => {
            const button = shallow(<InviteButton />);
            expect(button.find(Button)).toHaveLength(1);
        });

        it('should call onClick with user ID when clicked', () => {
            const props = { uid: 1, onClick: jest.fn(() => 'onClick') };
            const button = shallow(<InviteButton {...props} />);
            button.simulate('click');
            expect(props.onClick).toHaveBeenCalledWith(1);
        })
});