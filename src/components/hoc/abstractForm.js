import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as validator from 'validator';

export default (ChildForm) => {
    class abstractForm extends Component {

        /*
        * Validation functions
        */
        required = (value) => (!value || value.length === 0) ? true : undefined;
        isEmail = value => value && validator.isEmail(value) ? undefined : 'must be proper email';
        minLength = min => value => value && value.length < min ? `must have at least ${min} characters` : undefined;
        maxLength = max => value => value && value.length > max ? `must not have more than ${max} characters` : undefined;
    
        /*
        * Returns validation state for Bootstrap FormGroup
        */
        getValidationState = fieldName => {
            const formName = this.props.form;

            if (!this.props.forms[formName] ||
                !this.props.forms[formName].values ||
                !this.props.forms[formName].values[fieldName]) {
                return null;
            }

            if (this.props.forms[formName].syncErrors &&
                this.props.forms[formName].syncErrors[fieldName]) {
                return 'warning';
            }

            if (this.props.forms[formName].submitErrors &&
                this.props.forms[formName].submitErrors[fieldName]) {
                    return 'error';
            }
            return 'success';
        }

        /*
        * Returns sync error for given field, to be displayed in HelpBlock
        */
        getSyncError = fieldName => {
            const formName = this.props.form;
            if(!this.props.forms[formName] ||
                !this.props.forms[formName].values) return null;

            if(this.props.forms[formName].syncErrors &&
                this.props.forms[formName].syncErrors[fieldName]) {
                
                return this.props.forms[formName].syncErrors[fieldName];
            }
        }

        /*
        * Returns submit error to be displayed in HelpBlock
        */
        getSubmitError = fieldName => {
            const formName = this.props.form;
            if(!this.props.forms[formName] ||
                !this.props.forms[formName].submitErrors ||
                !this.props.forms[formName].submitErrors[fieldName]) {

                return null;
            }
            return this.props.forms[formName].submitErrors[fieldName];
        }

        /*
        * Returns general form error
        */
        getGeneralError = () => {
            const formName = this.props.form;
            if (this.props.forms[formName] && this.props.forms[formName].error) {
                return this.props.forms[formName].error;
            }
        }

        render() {
            return <ChildForm 
                required={this.required}
                minLength={this.minLength}
                maxLength={this.maxLength}
                isEmail={this.isEmail}
                getValidationState={this.getValidationState}
                getSyncError={this.getSyncError}
                getSubmitError={this.getSubmitError}
                { ...this.props } />
        }
    }

    function mapStateToProps(state) {
        return { forms: state.form }
    }

    return connect(mapStateToProps)(abstractForm);
}
