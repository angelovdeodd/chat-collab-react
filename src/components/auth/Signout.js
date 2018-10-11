import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../../actions';
import ConfirmationPanel from './hoc/ConfirmationPanel';

class Signout extends Component {

    componentDidMount() {
        this.props.signout();
    }

    render() {
        return (
            <ConfirmationPanel title="Sign out">User signed out</ConfirmationPanel>
        );
    }
}

export default connect(null, actions)(Signout);