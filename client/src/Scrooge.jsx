import React from 'react';
import { connect } from 'react-redux';
import {
  Route,
  withRouter,
  Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import Favicon from './favicon.ico'; // eslint-disable-line no-unused-vars
import { fetchCurrencies, fetchPortfolio, logout } from './actions';
import { createStorageUtils } from './utils/auth';
import { selectToken, selectName } from './reducers/user';
import Container from './components/atoms/container';
import LoadIcon from './components/atoms/load-icon';
import MainHeader from './components/molecules/main-header';
import Portfolio from './components/pages/portfolio';
import Login from './components/pages/login';
import Signup from './components/pages/signup';
import Market from './components/pages/market';
import PortfolioSetup from './components/pages/portfolio-setup';
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
    this.renderMarket = this.renderMarket.bind(this);
  }

  componentDidMount() {
    const { dispatch, user } = this.props;
    const token = selectToken(user);
    dispatch(fetchCurrencies());
    if (token) {
      dispatch(fetchPortfolio(token));
    }
    this.currenciesFetchInterval = setInterval(() => dispatch(fetchCurrencies()), 30000);
  }

  componentWillUnmount() {
    clearInterval(this.currenciesFetchInterval);
  }

  renderIndex() {
    const { user } = this.props;
    const token = selectToken(user);
    return token ? this.renderPortfolio() : this.renderMarket();
  }

  renderPortfolio() {
    const { currencies: { error } = {} } = this.props;
    return (
      error
        ? <div className="error">{error}</div>
        : <Portfolio />
    );
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
    return (<Login dispatch={this.props.dispatch} history={routeProps.history} />);
  }
  renderLogout() {
    this.props.dispatch(logout());
    this.storageUtils.removeUserData();
    return (<Redirect to='/' />);
  }

  render() {
    const { user, dispatch, currencies: { isFetching } = {} } = this.props;
    return (
      <div>
        <MainHeader username={selectName(user)} dispatch={dispatch} />
        <Container>
          <LoadIcon isVisible={isFetching}>
            <span>&#8635;</span>
          </LoadIcon>
          <Route path="/" exact render={this.renderIndex} />
          <Route path="/login" exact render={this.renderLogin} />
          <Route path="/signup" exact render={this.renderSignup} />
          <Route path="/logout" exact render={this.renderLogout} />
          <Route path="/portfolio" exact render={this.renderPortfolio} />
          <Route path="/market" exact render={this.renderMarket} />
          <Route path="/portfolio-setup" exact component={PortfolioSetup} />
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
