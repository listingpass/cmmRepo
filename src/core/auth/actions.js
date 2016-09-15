import { firebaseAuth } from 'src/core/firebase';
import {
  INIT_AUTH,
  SIGN_IN_ERROR,
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS
} from './action-types';

let cachedUser = null;

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
  return authenticate(new firebase.auth.GoogleAuthProvider());
}

export function signInWithEmail(email,pass,callback) {
    return function (dispatch) {
        firebaseAuth.signInWithEmailAndPassword(email, pass)
            .then(function (result) {
                let res = dispatch(signInSuccess(result));
                cachedUser = res.payload;
                callback();
                return res;
            })
            .catch(function (error) {
                let res = dispatch(signInError(result));
                callback(res.payload.message);
                return res;
            });
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
  return signInWithEmail(email, password, callback);
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