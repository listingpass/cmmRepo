import { Link } from 'react-router'
import LoginContainer from '../../views/pages/sign-in'
import { authActions, getAuth } from 'src/core/auth';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

export class Home extends Component{
	static propTypes = {
		// signInWithEmail: PropTypes.func.isRequired,
		// signInWithGoogle: PropTypes.func.isRequired,
		// signInWithTwitter: PropTypes.func.isRequired
	};


	constructor(props, context) {
		super(props, context);

		this.state = {
			isLoggedIn: false
		}
	};

	componentDidMount () {
		this.setState({
			isLoggedIn: authActions.isLoggedIn()
		});
	}
	render () {
		let fieldsToShow;

		// figure out what to show depending on us being signed in or not 
		if (this.state.isLoggedIn) {
			fieldsToShow = (
				<div>
					<div className='col-sm-6'>
						<Link to="/logout">
							<button type="button" className="btn btn-lg btn-danger">Logout!</button>
						</Link>
					</div>
					<div className='col-sm-6'>
						<Link to="/dashboard">
							<button type="button" className="btn btn-lg btn-success">Dashboard</button>
						</Link>
					</div>
				</div>
			);
		} else {
			fieldsToShow = (
				<div>
					<LoginContainer />
				</div>
			);
		}

		return (
			<div className='col-sm-12 text-center'>
				<h1>Home Page</h1>
				{fieldsToShow}
			</div>
		)
	}
}

export default Home