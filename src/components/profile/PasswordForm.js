import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { hideModal, showModal } from './../../actions/actionsModal';
import { reduxForm, Field } from 'redux-form';
import { Modal, Button, Form, FormGroup, ControlLabel, Col} from 'react-bootstrap';
import FieldInput from './inputs/FieldInput';

class PasswordForm extends Component {

    onSubmit = (data) => {
        console.log(data);
        this.props.hideModal();
        this.props.showModal('password-changed');
    }

    render() {        
        const { handleSubmit } = this.props;
        console.log("pform", this.props);
        return (
                <Modal animation={false} show={true} onHide={this.props.hideModal}>
                <Form horizontal onSubmit={handleSubmit(this.onSubmit)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Change password</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    
                        <FormGroup>
                            <Col sm={3} componentClass={ControlLabel}>Old password:</Col>
                            <Col sm={5}>
                                <Field name="oldPassword" type="password" component={FieldInput} />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                        <Col sm={3} componentClass={ControlLabel}>New password:</Col>
                            <Col sm={5}>
                                <Field name="password1" type="password" component={FieldInput} />
                            </Col> 
                        </FormGroup>
                        <FormGroup>
                        <Col sm={3} componentClass={ControlLabel}>Repeat:</Col>
                            <Col sm={5}>
                                <Field name="password2" type="password" component={FieldInput} />
                            </Col> 
                        </FormGroup>
                    
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="danger" onClick={this.props.hideModal}>Cancel</Button>
                        <Button bsStyle="success" type="submit">Change</Button>
                    </Modal.Footer>
                    </Form>
                </Modal>
            
        );
    }
}

function mapStateToProps(state) {
    return { modalState: state.modal };
}

export default compose(
    connect(mapStateToProps, { hideModal: hideModal, showModal: showModal }),
    reduxForm({ form: 'password' })
)(PasswordForm);