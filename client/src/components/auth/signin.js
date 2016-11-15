import React, {Component} from 'react';
import { reduxForm, Field } from 'redux-form';
import {connect} from 'react-redux';
import * as actions from '../../actions';

class Signin extends Component{
    handleFormSubmit(props){
        this.props.signinUser(props);
        // this.props.signinUser({email:props.email, password:props.password});
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
                    <div className="form-group">
                        <label>Email:</label>
                        <input {...email.input} className="form-control"/>
                    </div>
                    }
                />

                <Field
                    name="password"
                    component={password=>
                        <div className="form-group">
                            <label>Password:</label>
                            <input {...password.input} type="password" className="form-control"/>
                        </div>
                    }
                />
                {this.renderAlert()}
                <button action="submit" className="btn btn-primary">Sign in</button>
            </form>
        );
    }
}

function mapStateToProps(state) {
    return {errorMessage: state.auth.error};
}

Signin = reduxForm({
    form: 'signin'
})(Signin);

Signin = connect(mapStateToProps, actions)(Signin);

export default Signin;