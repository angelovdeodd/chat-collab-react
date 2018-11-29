import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/actionsRoom';
import { Grid, Row, ListGroup, ListGroupItem, Nav, NavItem, Tab, Glyphicon } from 'react-bootstrap';
import InviteAlerts from './invite/InviteAlerts';
import authRequired from './authRequired';

import Room from './Room';

class RoomsList extends Component {
    componentDidMount() {
        this.props.fetchRooms();
    }

    componentWillUnmount() {
        this.props.unsetRoomsWatcher();
    }

    makeRoomActive = key => {
        this.props.makeRoomActive(key);
    }

    openRoom = key => {
        this.props.setMessageWatcher(key);
        this.props.setRoomUsersWatcher(key);
        this.props.openRoom(key);
    }

    handleClick = (key) => {
        if (!this.props.rooms.openRooms.find( el => el.key === key)) {
            this.openRoom(key);
        } else {
            this.makeRoomActive(key);
        }
    }

    handleSelect = (key) => {
        this.makeRoomActive(key);
    }

    handleRemove = (event, key) => {
        event.stopPropagation();
        this.props.closeRoom(key);
        this.props.unsetMessageWatcher(key);
        this.props.unsetRoomUsersWatcher(key);
    }

    renderRooms() {
        return this.props.rooms.rooms.map(room => {
            return <ListGroupItem key={room.key} onClick={() => this.handleClick(room.key)}>{room.name}</ListGroupItem>
        });
    }

    renderRoomTabs() {
        return this.props.rooms.openRooms.map(room => {
            return (
                <NavItem eventKey={room.key} key={room.key} onSelect={this.handleSelect}>
                    {room.name}&nbsp;
                    <Glyphicon glyph='remove' onClick={(event) => this.handleRemove(event, room.key)}/>
                </NavItem>
            );
        });
    }

    renderRoomContents() {
        return this.props.rooms.openRooms.map(room => {
            return (
                <Tab.Pane eventKey={room.key} key={room.key} title={room.name}>
                    <Room roomKey={room.key}  name={room.name} />
                </Tab.Pane>
            );
        });
    }

   
    render() {
        return(
            <div style={{width: '950px', display: 'flex', flexDirection: 'row'}}>
                <div style={{width: '200px', padding: '5px', marginRight: '10px'}}>
                <ListGroup>
                    {this.renderRooms()}
                </ListGroup>
                </div>

                <Tab.Container id="room-tabs" onSelect={this.handleSelect} activeKey={this.props.rooms.activeRoomKey}>
                    <Grid>
                        <Row>
                            
                            <Nav bsStyle="tabs">
                                {this.renderRoomTabs()}
                            </Nav>
                        </Row>
                        <Row>
                            <Tab.Content>
                                {this.renderRoomContents()}
                                <InviteAlerts />
                            </Tab.Content>
                        </Row>
                    </Grid>
                </Tab.Container>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { rooms: state.rooms };
}

export default connect(mapStateToProps, actions)(authRequired(RoomsList));