import { authActions } from 'src/core/auth';
import { List } from 'immutable';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import UserForm from '../../../login/components/UserForm'
import TextField from 'material-ui/TextField';
import { Link } from 'react-router';
import {Tabs, Tab} from 'material-ui/Tabs';

const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
    },
};

export default class TabsExampleControlled extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 'a',
        };
    }

    handleChange = (value) => {
        this.setState({
            value: value,
        });
    };

    render() {
        return (
            <Tabs
                value={this.state.value}
                onChange={this.handleChange}
            >
                <Tab label="Tab A" value="a" >
                    <div>
                        <h2 style={styles.headline}>Controllable Tab A</h2>
                        <p>
                            Tabs are also controllable if you want to programmatically pass them their values.
                            This allows for more functionality in Tabs such as not
                            having any Tab selected or assigning them different values.
                        </p>
                    </div>
                </Tab>
                <Tab label="Tab B" value="b">
                    <div>
                        <h2 style={styles.headline}>Controllable Tab B</h2>
                        <p>
                            This is another example of a controllable tab. Remember, if you
                            use controllable Tabs, you need to give all of your tabs values or else
                            you wont be able to select them.
                        </p>
                    </div>
                </Tab>
            </Tabs>
        );
    }
}

export class SignIn extends Component {
    static propTypes = {
    signInWithEmail: PropTypes.func.isRequired,
    signInWithGoogle: PropTypes.func.isRequired,
    // signInWithTwitter: PropTypes.func.isRequired
};


    constructor(props, context) {
        super(props, context);

        this.state = {
            email: '',
            password: '',
            errorMessage: ''
        }
        };

    handleSubmitInfo (e) {
    e.preventDefault();
    let email = this.state.email,
        password = this.state.password;

    this.setState({
        email: '',
        password: '',
        errorMessage: ''
    });

    authActions.login(email, password, function (message) {
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
        <div className="col-sm-6">
            <h2>Login</h2>
            <TextField
                hintText="Hint Text"
                floatingLabelText="Fixed Floating Label Text"
                floatingLabelFixed={true}
            /><br />

            <UserForm
                onSubmitInfo={this.handleSubmitInfo}
                onUpdateEmail={this.handleUpdateEmail}
                onUpdatePassword={this.handleUpdatePassword}
                email={this.state.email}
                password={this.state.password} />
            <Link to="/forgotpassword"><p>Forgot Password</p></Link>
            {errorMessage}
        </div>
    )
}}
export function doSignIn({signInWithEmail, signInWithGoogle}) {
  return (

    <div className="g-row sign-in">
      <div className="g-col">
        <h1 className="sign-in__heading">Sign in</h1>
        <button className="btn sign-in__button" onClick={signInWithEmail} type="button">GitHub</button>
        <button className="btn sign-in__button" onClick={signInWithGoogle} type="button">Google</button>
        {/*<button className="btn sign-in__button" onClick={signInWithTwitter} type="button">Twitter</button>*/}
      </div>
    </div>
  );
}



//=====================================
//  CONNECT
//-------------------------------------

export default connect(null, authActions)(SignIn);
