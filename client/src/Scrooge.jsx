import React from 'react';
import { connect } from 'react-redux';
import {
  Route,
  withRouter,
  Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import Favicon from './favicon.ico'; // eslint-disable-line no-unused-vars
import { fetchCurrencies, fetchPortfolio, dismissError } from './actions';
import { createStorageUtils } from './utils/auth';
import { selectToken, selectName } from './reducers/user';
import Container from './components/atoms/container';
import LoadIcon from './components/atoms/load-icon';
import MainHeader from './components/molecules/main-header';
import NotificationCentre from './components/molecules/notification-centre';
import PrivateRoute from './components/molecules/private-route';
import Portfolio from './components/pages/portfolio';
import Login from './components/pages/login';
import Logout from './components/pages/logout';
import Signup from './components/pages/signup';
import Market from './components/pages/market';
import PortfolioSetup from './components/pages/portfolio-setup';
import ForgotPassword from './components/pages/forgot';
import ResetPassword from './components/pages/reset';
import './styles/globals';

class Scrooge extends React.Component {
  constructor(props) {
    super(props);
    this.storageUtils = createStorageUtils();
    this.stopHistoryListener = () => {};

    this.renderSignup = this.renderSignup.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.renderLogout = this.renderLogout.bind(this);
    this.renderIndex = this.renderIndex.bind(this);
    this.renderMarket = this.renderMarket.bind(this);
    this.renderForgotPassword = this.renderForgotPassword.bind(this);
    this.renderResetPassword = this.renderResetPassword.bind(this);
  }

  componentDidMount() {
    const { dispatch, user, history } = this.props;
    const token = selectToken(user);
    dispatch(fetchCurrencies());
    if (token) {
      dispatch(fetchPortfolio(token));
    }

    this.stopHistoryListener = history.listen(() => {
      this.dismissAllErrors();
    });
    this.currenciesFetchInterval = setInterval(() => dispatch(fetchCurrencies()), 30000);
  }

  componentWillUnmount() {
    clearInterval(this.currenciesFetchInterval);
    this.stopHistoryListener();
  }

  dismissAllErrors() {
    const { dispatch } = this.props;
    dispatch(dismissError('all'));
  }

  renderIndex() {
    const { user } = this.props;
    const token = selectToken(user);
    return token ? <Redirect to='/portfolio' /> : <Redirect to='/market' />;
  }

  renderMarket() {
    const { currencies: { error, isFetching, all } = {} } = this.props;
    if (!all && isFetching) return (<p>Fetching data...</p>);
    return (
      error
        ? <div className="error">{error}</div>
        : <Market />
    );
  }

  renderSignup(routeProps) {
    return (<Signup dispatch={this.props.dispatch} history={routeProps.history} />);
  }

  renderLogin(routeProps) {
    const { dispatch } = this.props;
    return <Login dispatch={dispatch} history={routeProps.history} />;
  }

  renderForgotPassword() {
    const { dispatch } = this.props;
    return <ForgotPassword dispatch={dispatch} />;
  }

  renderResetPassword(routeProps) {
    const { dispatch } = this.props;
    return <ResetPassword dispatch={dispatch} match={routeProps.match} />;
  }

  renderLogout() {
    const { dispatch } = this.props;
    return (<Logout dispatch={dispatch} storageUtils={this.storageUtils} />);
  }

  render() {
    const { user, dispatch, currencies: { isFetching } = {} } = this.props;
    const token = selectToken(user);
    return (
      <div>
        <MainHeader username={selectName(user)} dispatch={dispatch} />
        <Container>
          <LoadIcon isVisible={isFetching}>
            <span>&#8635;</span>
          </LoadIcon>
          <NotificationCentre />

          <Route path="/" exact render={this.renderIndex} />
          <Route path="/market" exact render={this.renderMarket} />
          {/* Unauthenticated routes */}
          <PrivateRoute path="/login" exact render={this.renderLogin} predicate={!token} />
          <PrivateRoute path="/forgot" exact render={this.renderForgotPassword} predicate={!token} />
          <PrivateRoute path="/reset/:resetToken" render={this.renderResetPassword} predicate={!token} />
          <PrivateRoute path="/signup" exact render={this.renderSignup} predicate={!token}/>
          {/* Authenticated routes */}
          <PrivateRoute path="/logout" exact render={this.renderLogout} predicate={!!token} redirectPath="/login" />
          <PrivateRoute path="/portfolio" exact component={Portfolio} predicate={!!token} redirectPath="/login" />
          <PrivateRoute
            exact
            path="/portfolio-setup"
            component={PortfolioSetup}
            predicate={!!token}
            redirectPath="/login"
          />
        </Container>
      </div>
    );
  }
}

Scrooge.propTypes = {
  portfolio: PropTypes.object,
  currencies: PropTypes.object,
  user: PropTypes.object,
  dispatch: PropTypes.func,
  history: PropTypes.object,
};

export default withRouter(connect(state => state)(Scrooge));
