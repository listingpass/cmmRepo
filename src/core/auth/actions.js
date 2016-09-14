import { firebaseAuth } from 'src/core/firebase';
import {
  INIT_AUTH,
  SIGN_IN_ERROR,
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS
} from './action-types';


function authenticate(provider) {
  return dispatch => {
    firebaseAuth.signInWithPopup(provider)
      .then(result => dispatch(signInSuccess(result)))
      .catch(error => dispatch(signInError(error)));
  };
}

export function initAuth(user) {
  return {
    type: INIT_AUTH,
    payload: user
  };
}

export function signInError(error) {
  return {
    type: SIGN_IN_ERROR,
    payload: error
  };
}

export function signInSuccess(result) {
  return {
    type: SIGN_IN_SUCCESS,
    payload: result.user
  };
}


export function signInWithGoogle() {
  firebase.auth.EmailAuthProvider()
  return authenticate(new firebase.auth.GoogleAuthProvider());
}

export function signInWithEmail(email,pass) {
  return dispatch => {
    firebaseAuth.signInWithEmailAndPassword(email,pass)
        .then(result => dispatch(signInSuccess(result)))
        .catch(error => dispatch(signInError(error)));
  };
}
export function signOut() {
  return dispatch => {
    firebaseAuth.signOut()
      .then(() => dispatch(signOutSuccess()));
  };
}

export function signOutSuccess() {
  return {
    type: SIGN_OUT_SUCCESS
  };
}
export function signup(email, password, callback) {
  console.log('Signing up!');
  firebaseAuth.createUserWithEmailAndPassword(email, password)
      .then(function() {
        cachedUser = firebaseAuth.currentUser;
        callback();
      }, function (error) {
        callback(error.message);
      });
}
export function login(email, password, callback) {

  firebase.auth.signInWithEmailAndPassword(email, password)
      .then(function() {
        cachedUser = firebaseAuth.currentUser;
        callback();
      }, function (error) {
        callback(error.message);
      });
}
export function resetPassword(email, callback) {
  console.log('Resetting password!');
  firebaseAuth.sendPasswordResetEmail(email)
      .then(function(){
        callback();
      }, function (error) {
        callback(error.message);
      });
}
export function logout() {
  console.log('Logging out!');
  firebaseAuth.signOut();
  cachedUser = null;
}
export function requireAuth (nextState, replace) {
    if (!this.isLoggedIn()) {
        replace({
            pathname: '/',
            state: { nextPathname: nextState.location.pathname }
        })
    }
}
export function isLoggedIn() {
  console.log('Are we logged in? ', cachedUser && true || firebaseAuth.currentUser || false);
  return cachedUser && true || firebaseAuth.currentUser || false;
}