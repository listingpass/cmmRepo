import { isAuthenticated } from 'src/core/auth';
import App from './app';
import SignIn from './pages/sign-in';
import Tasks from './pages/tasks';
import Main from '../login/components/Main'
import HomeC from '../login/components/Home'
import Logout from '../login/components/Logout'

import DashboardContainer from '../login/containers/DashboardContainer'
import ForgotPasswordContainer from '../login/containers/ForgotPasswordContainer'
//
// const routes = (
//     <Router history={hashHistory}>
//       <Route path='/' component={Main}>
//         <IndexRoute component={Home} />
//         <Route path='dashboard' component={DashboardContainer} onEnter={requireAuth}/>
//         <Route path='logout' component={Logout} />
//         <Route path='forgotpassword' component={ForgotPasswordContainer} />
//       </Route>
//     </Router>
// );
export const paths = {
  ROOT: '/',
  LOGOUT:'/logout',
  FORGOT:'/forgot',
  SIGN_IN: '/sign-in',
  TASKS: '/taskreport',
  DASHBOARD:'/dashboard',
  HOME:'/home'

};


const requireAuth = getState => {
  return (nextState, replace) => {
    if (!isAuthenticated(getState())) {
      replace(paths.SIGN_IN);
    }
  };
};

const requireUnauth = getState => {
  return (nextState, replace) => {
    if (isAuthenticated(getState())) {
      replace(paths.TASKS);
    }
  };
};


export const getRoutes = getState => {
  return {
    path: paths.ROOT,
    component: App,
    childRoutes: [
      {
        indexRoute: {
          component: SignIn,
        }
      },
      {
        path: paths.SIGN_IN,
        component: SignIn,
        onEnter: requireUnauth(getState)
      },
      {
        path: paths.TASKS,
        component: Tasks,
        onEnter: requireUnauth(getState)
      }
    ]
  };
};
