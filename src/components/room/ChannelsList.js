import React from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import authRequired from './../authRequired';

const ChannelsList = ({ ...props }) => (
            <Navbar>
                <Nav>
                    {props.channels.map(channel => (<NavItem key={channel.key}>{channel.name}</NavItem>))}
                </Nav>
            </Navbar>
        )

function mapStateToProps(state) {
    return { channels: state.rooms.channels };
}

export default connect(mapStateToProps)(authRequired(ChannelsList));