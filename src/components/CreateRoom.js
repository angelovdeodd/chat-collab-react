import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions';
import authRequired from './authRequired';

class CreateRoom extends Component {
    state = { name: '' };

    handleChange = (event) => {
        this.setState({ name: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.saveRoom(this.state.name);
        this.setState({ name: '' });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h4>Create Room</h4>
                    <textarea onChange={this.handleChange} value={this.state.name} />
                    <div>
                        <button>Create</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default connect(null, actions)(authRequired(CreateRoom));
