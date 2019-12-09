import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect, Switch, useLocation } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import ResetPasswordPage from '../pages/ResetPasswordPage';
import ResetPasswordConfirmPage from '../pages/ResetPasswordConfirmPage';
import RegistrationPage from '../pages/RegistrationPage';
import DemoLoginPage from '../pages/DemoLoginPage';
import { selectQueryTokens } from '../selectors/router';

// hack to make routing work on both prod and dev
const prefixPath = (path: string) => {
  return `/app${path}`;
};

const InsecureApp = () => {
  const location = useLocation();

  // include query params in deep link redirect
  const queryParams = useSelector(selectQueryTokens);
  if (queryParams.next) {
    delete queryParams.next;
  }
  let appendParams = '';
  if (queryParams.length > 0) {
    const pieces = Object.entries(queryParams).map(([k, v]) => {
      return `${k}%3D${v}`;
    });
    appendParams = '%3F' + pieces.join('%26');
  }

  return (
    <Switch>
      <Route path={prefixPath('/login')} component={LoginPage} />
      <Route path={prefixPath('/register')} component={RegistrationPage} />
      <Route path={prefixPath('/demo')} component={DemoLoginPage} />
      <Route
        path={prefixPath('/reset-password')}
        component={ResetPasswordPage}
      />
      <Route
        path={prefixPath('/reset-password-confirm/:token')}
        component={ResetPasswordConfirmPage}
      />
      <Route path="*">
        <Redirect
          to={prefixPath(`/login?next=${location.pathname}${appendParams}`)}
        />
      </Route>
    </Switch>
  );
};

export default InsecureApp;
