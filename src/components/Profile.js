import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/actionsProfile';
import authRequired from './authRequired';
import * as ProfileStyle from './../style/Profile';

class Profile extends Component {

    state = {
        newUsername: this.props.user.displayName,
        isChangingUsername: false
    };

    changeName = () => {
        this.setState({ isChangingUsername: true });
    }

    saveUsername = (event) => {
        event.preventDefault();
        this.props.setBaseName(this.state.newUsername);
        this.setState({ isChangingUsername: false });
    }

    updateUsername = (event) => {
        this.setState({ newUsername: event.target.value });
    }

    renderChangeButton() {
        if (this.state.isChangingUsername) return false;

        return (
            <div><button onClick={this.changeName}>Change/Set</button></div>
        );
    }

    renderUsernameForm() {
        if (!this.state.isChangingUsername) return false;

        return (
            <form onSubmit={this.saveUsername}>
            <div style={ProfileStyle.Profile.containerRow}>
                <div><input type="text" onChange={this.updateUsername} value={this.state.newUsername} size="30" placeholder="Enter new username" /></div>
                <div><button>Save</button></div>
            </div>
            </form>
        );
    }


    render() {
        return (
            <div style={ProfileStyle.Profile.containerColumn}>
                <div style={ProfileStyle.Profile.containerRow}>
                    <div>Email: </div><div>{this.props.user.email}</div>
                </div>
                <div style={ProfileStyle.Profile.containerRow}>
                    <div>Base Username:</div><div>{this.props.user.displayName ? this.props.user.displayName : 'not set'}</div>{this.renderChangeButton()}
                </div>
                {this.renderUsernameForm()}
                
            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log("STATE", state);
    return { user: state.auth.user };
}

export default connect(mapStateToProps, actions)(authRequired(Profile));