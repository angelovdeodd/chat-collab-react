import React, { Component } from 'react';
import { connect } from 'react-redux';

export default (ChildComponent) => {
    class ComposedComponent extends Component {
        
        render() {
            if (!this.props.auth.authenticated) return false;
            return <ChildComponent {...this.props} />
        }
    }

    function mapStateToProps(state) {
        return { auth: state.auth };
    }

    return connect(mapStateToProps)(ComposedComponent);
};
