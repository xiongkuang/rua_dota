import React, {Component} from 'react';
import { reduxForm, Field } from 'redux-form';
import {connect} from 'react-redux';
import * as actions from '../../actions';

class Signup extends Component{
    handleFormSubmit(formProps){
        //call action creator to sign up th user
        this.props.signupUser(formProps);
    }

    renderAlert(){
        if (this.props.errorMessage){
            return (
                <div className="alert alert-danger">
                    <strong>Oops! </strong>{this.props.errorMessage}
                </div>
            );
        }
    }

    render(){
        const {handleSubmit} = this.props;
        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <Field
                    name="email"
                    component={email=>
                        <div className={`form-group`}>
                            <label>Email: </label>
                            <input {...email.input} type="text" className="form-control"/>
                            {email.meta.touched &&
                            email.meta.error &&
                            <div className="error">{email.meta.error}</div> }
                        </div>
                    }
                />

                <Field
                    name="password"
                    component={password=>
                        <div className={`form-group`}>
                            <label>Password: </label>
                            <input {...password.input} type="password" className="form-control"/>
                            {password.meta.touched &&
                            password.meta.error &&
                            <div className="error">{password.meta.error}</div> }
                        </div>
                    }
                />

                <Field
                    name="passwordConfirm"
                    component={passwordConfirm=>
                        <div className={`form-group`}>
                            <label>Confirm Password: </label>
                            <input {...passwordConfirm.input} type="password" className="form-control"/>
                            {passwordConfirm.meta.touched &&
                            passwordConfirm.meta.error &&
                            <div className="error">{passwordConfirm.meta.error}</div> }
                        </div>
                    }
                />
                {this.renderAlert()}
                <button type="submit" className="btn btn-primary">Sign up</button>
            </form>
        );
    }
}

function validate(formProps) {
    const errors = {};
    if (!formProps.email){
        errors.email = 'Please enter an email';
    }
    if (!formProps.password){
        errors.password = 'Please enter an password';
    }
    if (!formProps.passwordConfirm){
        errors.passwordConfirm = 'Please enter an password confirmation';
    }
    if (formProps.password !== formProps.passwordConfirm){
        errors.password = 'Password must match';
    }

    return errors;
}

function mapStateToProps(state) {
    return {errorMessage: state.auth.error};
}

Signup = reduxForm({
    form: 'signup',
    validate
})(Signup);

Signup = connect(mapStateToProps, actions)(Signup);

export default Signup;