import { authActions } from 'src/core/auth';
import { List } from 'immutable';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { Link } from 'react-router';
import TextField from 'material-ui/TextField';
import Tabs from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400
    },
    slide: {
        padding: 10,
    }
};
const validate = values => {
    const errors = {};
    const requiredFields = [ 'email', 'password' ];
    requiredFields.forEach(field => {
        if(!values[field]) {
            errors[field] = 'Required'
        }
    });
    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    return errors
};
export class SignIn extends Component {
    static propTypes = {
    signInWithEmail: PropTypes.func.isRequired
};


    constructor(props, context) {
        super(props, context);
        this.handleTouchTap = this.handleSubmitInfo.bind(this);

        this.state = {
            email: '',
            password: '',
            errorMessage: ''
        }
        };

    handleSubmitInfo (e) {
    e ? e.preventDefault() : null;
    let email = this.state.email,
        password = this.state.password;

    this.setState({
        email: '',
        password: '',
        errorMessage: '',
        slideIndex: 0

    });

    authActions.signInWithUserEmail(email, password, function (message) {
        if (message) {
            console.log('Login err: ', message);
            this.setState({
                errorMessage: message
            });
        } else {
            console.log('Login complete, redirect!');
            this.context.router.push({
                pathname: '/dashboard'
            });
        }
    }.bind(this));
}
handleUpdateEmail (e){
    this.setState({
        email: e.target.value
    });
}
handleUpdatePassword (e) {
    this.setState({
        password: e.target.value
    });
}
    handleSlideChange = (value) => {
        this.setState({
            slideIndex: value,
        });
    };
render () {
    let errorMessage;
    if (this.state.errorMessage !== '') {
        errorMessage = (
            <div className="col-sm-12">
                <div className="col-sm-4 col-sm-offset-4 alert alert-danger">
                    <strong>Error!</strong> {this.state.errorMessage}
                </div>
            </div>
        );
    }

    return (
    <div>
        <Tabs
            onChange={::this.handleSlideChange}
            value={this.state.slideIndex}
        >
            <Tab label="Login" value={0} />
            <Tab label="Sign Up" value={1} />
            <Tab label="Forgot Password" value={2} />
        </Tabs>
        <SwipeableViews
            index={this.state.slideIndex}
            onChangeIndex={::this.handleSlideChange}>
            <div>
                <h2 style={styles.headline}>Login</h2>
                <form onSubmit={::handleSubmit}>
                <TextField
                    id="email"
                    value={this.state.email}
                    onChange={::this.handleUpdateEmail}
                    hintText="Email"
                    floatingLabelText="Email"
                    errorText = {email.touched && email.error}
                    {...email}/>
                <div>
                    <TextField
                        hintText = "Password"
                        floatingLabelText="Password"
                        errorText = {password.touched && password.error}
                        id="password"
                        value={this.state.password}
                        onChange={::this.handleUpdatePassword}
                    {...password}/>
                </div>
                    <RaisedButton label="Login" className="button form__submit-btn" onClick={submit} submit primary={true} style={style} />
            </form>
            </div>
            <div style={styles.slide}>
                Sign Up!
            </div>
            <div style={styles.slide}>
                Reset Your Password!
            </div>
        </SwipeableViews>
    </div>
    )
}}
export function doSignIn({signInWithEmail, signInWithGoogle}) {
  return (

    <div className="g-row sign-in">
      <div className="g-col">
        <h1 className="sign-in__heading">Sign in</h1>
        <LoginForm/>
        <SignIn signInWithEmail={signInWithEmail}/>
        <button className="btn sign-in__button" onClick={signInWithGoogle} type="button">Google</button>
        {/*<button className="btn sign-in__button" onClick={signInWithTwitter} type="button">Twitter</button>*/}
      </div>
    </div>
  );
}

doSignIn.propTypes = {
    signInWithEmail: PropTypes.func.isRequired,
    signInWithGoogle: PropTypes.func.isRequired
    // signInWithTwitter: PropTypes.func.isRequired
};

//=====================================
//  CONNECT
//-------------------------------------

export default connect(null, authActions)(doSignIn);
