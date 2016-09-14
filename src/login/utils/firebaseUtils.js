import { authActions, getAuth } from 'src/core/auth';
import { firebaseApp } from 'src/core/firebase/firebase';
let cachedUser = null;

const firebaseUtils = {
	signup: function (email, password, callback) {
		console.log('Signing up!');
		firebaseApp.auth().createUserWithEmailAndPassword(email, password)
			.then(function() {
				cachedUser = firebaseInstance.auth().currentUser;
				callback();
			}, function (error) {			
				callback(error.message);
			});
	},
	login: function (email, password, callback) {
		console.log('Logging in!');
		firebaseApp.auth().signInWithEmailAndPassword(email, password)
			.then(function() {
				cachedUser = firebaseInstance.auth().currentUser;
				callback();
			}, function (error) {
				callback(error.message);
			});
	},
	resetPassword: function (email, callback) {
		console.log('Resetting password!');
		firebaseApp.auth().sendPasswordResetEmail(email)
			.then(function(){
				callback();
			}, function (error) {
				callback(error.message);
			});
	},
	logout: function () {
		console.log('Logging out!');
		firebaseApp.auth().signOut();
		cachedUser = null;
	},
	isLoggedIn: function () {
		console.log('Are we logged in? ', cachedUser && true || firebaseApp.auth().currentUser || false);
		return cachedUser && true || firebaseApp.auth().currentUser || false;
	}
};

export default firebaseUtils