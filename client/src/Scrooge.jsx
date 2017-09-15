import React from 'react';
import { connect } from 'react-redux';
import {
  Route,
  withRouter,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import Favicon from './favicon.ico'; // eslint-disable-line no-unused-vars
import { fetchCurrencies, fetchPortfolio } from './actions';
import Container from './components/atoms/container';
import MainHeader from './components/main-header';
import Portfolio from './components/portfolio';
import Login from './components/login';
import Signup from './components/signup';
import './styles/globals';

class Scrooge extends React.Component {
  constructor(props) {
    super(props);
    this.renderPortfolio = this.renderPortfolio.bind(this);
    this.renderSignup = this.renderSignup.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
    dispatch(fetchPortfolio());
  }

  renderPortfolio() {
    const { currencies: { all, error, isFetching }, portfolio } = this.props;
    if (isFetching || portfolio.isFetching) return (<p>Fetching data...</p>);
    return (
      error
        ? <div className="error">{error}</div>
        : <Portfolio items={portfolio.items} currencies={all} />
    );
  }

  renderMarket() {
    return (<p>Here be market data</p>);
  }

  renderPortfolioSetup() {
    return (<p>Here be portfolio setup</p>);
  }

  renderSignup() {
    return (<Signup dispatch={this.props.dispatch} />);
  }

  renderLogin() {
    return (<Login dispatch={this.props.dispatch} />);
  }

  render() {
    const { user, dispatch } = this.props;
    return (
      <div>
        <MainHeader username={user.name} dispatch={dispatch} />
        <Container>
          <Route path="/" exact render={this.renderPortfolio} />
          <Route path="/login" exact render={this.renderLogin} />
          <Route path="/signup" exact render={this.renderSignup} />
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
