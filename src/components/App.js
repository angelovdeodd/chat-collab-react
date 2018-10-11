import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Signup from './auth/Signup';
import SignupSuccess from './auth/SignupSuccess';
import Signin from './auth/Signin';
import Signout from './auth/Signout';
import CommentBox from './CommentBox';
import CommentList from './CommentList';
import RoomsList from './RoomsList';
import CreateRoom from './CreateRoom';
import ProfileForm from './profile/ProfileForm';
import * as actions from './../actions';

import { Nav, Navbar, NavItem } from 'react-bootstrap';


class App extends Component {
  renderSignIn() {
    if(this.props.auth.authenticated) {
      return <NavItem eventKey="signout">Sign Out</NavItem>;
    } else {
      return <NavItem eventKey="signin">Sign In</NavItem>
    }
  }
  
  renderSignUp() {
    if (!this.props.auth.signedUp && !this.props.auth.authenticated) {
      return <NavItem eventKey="signup">Sign Up</NavItem>;
    }
  }

  renderUser() {
    if (this.props.auth.authenticated && this.props.auth.user.email) {
      return <div><b>User: {this.props.auth.user.email}</b></div>
    } else {
      return <div><b>User not authenticated</b></div>
    }
  }

  renderProfileLink() {
    if (this.props.auth.authenticated) {
      return <NavItem eventKey="profile">My Profile</NavItem>
    }
  }

  selectNavItem = (key) => {
    this.props.history.push('/' + key);
  }

  renderHeader() {
    return (
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Home</Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav onSelect={this.selectNavItem}>
          {this.renderProfileLink()}
          {this.renderSignUp()}
          {this.renderSignIn()}
          <NavItem eventKey="rooms">Rooms</NavItem>
          <NavItem>{this.renderUser()}</NavItem>
        </Nav>
      </Navbar>
    )
  }

  componentDidMount() {
    this.props.checkAuth();
  }

  
  render() {
    return (
      <div className="App">
        
        {this.renderHeader()}
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route path="/signout" component={Signout} />
        <Route path="/profile" component={ProfileForm} />
        <Route path="/signupsuccess" component={SignupSuccess} />
        <Route path="/rooms" component={RoomsList} />
        <Route path="/user/addComment" component={CommentBox} />
        <Route path="/user/comments" component={CommentList} />
        <Route path="/createroom" component={CreateRoom} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps, actions)(App);
