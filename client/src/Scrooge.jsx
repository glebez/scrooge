import React from 'react';
import { connect } from 'react-redux';
import {
  Route,
  withRouter,
  Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import Favicon from './favicon.ico'; // eslint-disable-line no-unused-vars
import { fetchCurrencies, logout } from './actions';
import { createStorageUtils } from './utils/auth';
import Container from './components/atoms/container';
import MainHeader from './components/main-header';
import Portfolio from './components/portfolio';
import Login from './components/login';
import Signup from './components/signup';
import Market from './components/market';
import './styles/globals';

class Scrooge extends React.Component {
  constructor(props) {
    super(props);
    this.storageUtils = createStorageUtils();

    this.renderPortfolio = this.renderPortfolio.bind(this);
    this.renderSignup = this.renderSignup.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.renderLogout = this.renderLogout.bind(this);
    this.renderIndex = this.renderIndex.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  renderIndex() {
    const { user } = this.props;
    return user && user.token ? this.renderPortfolio() : this.renderMarket();
  }

  renderPortfolio() {
    const {
      currencies,
      user: { token },
      portfolio,
      dispatch,
    } = this.props;
    const { error, isFetching } = currencies;
    if (isFetching) return (<p>Fetching data...</p>);
    return (
      error
        ? <div className="error">{error}</div>
        : <Portfolio currencies={currencies} token={token} portfolio={portfolio} dispatch={dispatch} />
    );
  }

  renderMarket() {
    const {
      currencies,
    } = this.props;
    const { error, isFetching } = currencies;
    if (isFetching) return (<p>Fetching data...</p>);
    return (
      error
        ? <div className="error">{error}</div>
        : <Market />
    );
  }

  renderPortfolioSetup() {
    return (<p>Here be portfolio setup</p>);
  }

  renderSignup(routeProps) {
    return (<Signup dispatch={this.props.dispatch} history={routeProps.history} />);
  }

  renderLogin(routeProps) {
    return (<Login dispatch={this.props.dispatch} history={routeProps.history} />);
  }
  renderLogout() {
    this.props.dispatch(logout());
    this.storageUtils.removeUserData();
    return (<Redirect to='/' />);
  }

  render() {
    const { user, dispatch } = this.props;
    return (
      <div>
        <MainHeader username={user && user.name} dispatch={dispatch} />
        <Container>
          <Route path="/" exact render={this.renderIndex} />
          <Route path="/login" exact render={this.renderLogin} />
          <Route path="/signup" exact render={this.renderSignup} />
          <Route path="/logout" exact render={this.renderLogout} />
          <Route path="/portfolio" exact render={this.renderPortfolio} />
          <Route path="/market" exact render={this.renderMarket} />
          <Route path="/portfolio-setup" exact render={this.renderPortfolioSetup} />
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
};

export default withRouter(connect(state => state)(Scrooge));
