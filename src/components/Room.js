import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/actionsRoom';
import RoomUsers from './RoomUsers';

class Room extends Component {
    state = { message: ''};

    handleChange = (event) => {
        this.setState({ message: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.sendMessage(this.props.roomKey, this.state.message);
        this.setState({ message: '' });
    }

    handleClose = () => {
        this.props.closeRoom(this.props.roomKey);
        this.props.unsetMessageWatcher(this.props.roomKey);
        this.props.unsetRoomUsersWatcher(this.props.roomKey);
    }

    renderInput() {
        if (this.props.room.inputEnabled) {
            return <input style={{width: '480px'}} autoFocus type="text" onChange={this.handleChange} value={this.state.message} />
        } else {
            return <input disabled type="text" onChange={this.handleChange} value={this.state.message} />
        }
    }

    renderMessages() {
        if (!this.props.room.messages[this.props.roomKey]) return false;

        return this.props.room.messages[this.props.roomKey].map(message => {
            return <div key={message.key} style={{maxWidth: '500px'}}><b>{message.userName}</b>: {message.message}</div>
        });
    }

    render() {
        return(
            <div>
                <div style={{display: 'flex', flexDirection: 'row'}}>
          
                    <div style={{padding: '5px', margin: '5px', border: '1px solid black', 
                    height: '200px', width: '480px', overflowY: 'scroll', display: 'flex', flexDirection: 'column-reverse'}}>
                        <div>
                            {this.renderMessages()}
                        </div>
                    </div>
                    <div style={{padding: '5px', margin: '5px', width: '280px'}}>
                    <RoomUsers roomKey={this.props.roomKey} />
                    </div>
                </div>
                
                <div>
                    <form onSubmit={this.handleSubmit}>
                        {this.renderInput()}
                        <button>Send</button>
                    </form>

                </div>
                <div>{this.props.name} ({this.props.roomKey}) <button onClick={this.handleClose}>Close</button></div>
                
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { room: state.rooms };
}

export default connect(mapStateToProps, actions)(Room);