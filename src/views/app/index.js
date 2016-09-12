import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { authActions, getAuth } from 'src/core/auth';
import { paths } from '../routes';
import Header from '../components/header';
import { Link } from 'react-router'


export class App extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired,
    signOut: PropTypes.func.isRequired
  };
  auth = this.props.auth;
  constructor(props, context) {
    super(props, context);

    this.state = {
      isLoggedIn: false}
    };
    componentDidMount () {
      this.setState({
        isLoggedIn: auth.authenticated
      });
      if (!auth.authenticated) {
        router.replace(paths.SIGN_IN);
      }
      else if (auth.authenticated) {
        router.replace(paths.TASKS);
      }
    }
  componentWillReceiveProps(nextProps) {
    const { router } = this.context;
    const { auth } = this.props;

    if (auth.authenticated && !nextProps.auth.authenticated) {
      router.replace(paths.SIGN_IN);
    }
    else if (!auth.authenticated && nextProps.auth.authenticated) {
      router.replace(paths.TASKS);
    }
    else if (auth.authenticated)
    {
      router.replace(paths.TASKS);
    }
  }

  render() {
    return (
      <div>
        <Header
          authenticated={this.props.auth.authenticated}
          signOut={this.props.signOut}
        />
        <div className='main-container'>
          <nav className='navbar navbar-default'>
            <div className='container-fluid'>
              <div className='navbar-header'>
                <Link to='/' className='navbar-brand'>Home</Link>
              </div>
            </div>
          </nav>
          {this.props.children}
        </div>
        <main className="main">{this.props.children}</main>

      </div>
    );
  }
}


//=====================================
//  CONNECT
//-------------------------------------

const mapStateToProps = createSelector(
  getAuth,
  auth => ({auth})
);

export default connect(
  mapStateToProps,
  authActions
)(App);
