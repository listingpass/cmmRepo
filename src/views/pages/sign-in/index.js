import { authActions } from 'src/core/auth';
import { List } from 'immutable';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import UserForm from '../../../login/components/UserForm'
import TextField from 'material-ui/TextField';
import { Link } from 'react-router';
import {Tabs, Tab} from 'material-ui/Tabs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import CheckCircleIcon from 'material-ui/svg-icons/action/check-circle';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import EditIcon from 'material-ui/svg-icons/image/edit'
import MUIAutoComplete from 'material-ui/AutoComplete';
import SvgIcon from 'material-ui/SvgIcon';
import {blue500, red500, greenA200} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';

const muiTheme = getMuiTheme(darkBaseTheme);
const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
    },
};

export class TabsExampleControlled extends React.Component {

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
                <Tab label="Email Login" value="a" >
                    <div>
                        <h2 style={styles.headline}>Login</h2>
                        <p>
                            <form onSubmit={props.onSubmitInfo}>
                                

                            </form>
                        </p>
                    </div>
                </Tab>
                <Tab label="Login With Slack" value="b">
                    <div>
                        <h2 style={styles.headline}>Use your Slack account to login</h2>
                        <p>
                            Coming Soon!
                        </p>
                    </div>
                </Tab>
            </Tabs>
        );
    }
}

export class SignIn extends Component {
    static propTypes = {
    signInWithEmail: PropTypes.func.isRequired
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
            <MuiThemeProvider muiTheme={muiTheme}>
                <TextField
                hintText="Email"
                floatingLabelText="Email"
                floatingLabelFixed={true}
            />
            </MuiThemeProvider><br />

            <UserForm
                onSubmitInfo={::this.handleSubmitInfo}
                onUpdateEmail={::this.handleUpdateEmail}
                onUpdatePassword={::this.handleUpdatePassword}
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
