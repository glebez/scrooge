import React from 'react';
import { connect } from 'react-redux';
import { fetchCurrencies, fetchPortfolio } from './actions';
import glamorous from 'glamorous';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import MainHeader from './components/main-header';
import Portfolio from './components/portfolio';

const Container = glamorous.div({
  maxWidth: '700px',
  margin: '0 auto'
});

class Scrooge extends React.Component {
  constructor(props) {
    super(props);
    this.renderPortfolio = this.renderPortfolio.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
    dispatch(fetchPortfolio());
  }

  renderPortfolio() {
    const { currencies: { all, error, isFetching }, portfolio  } = this.props;
    if (isFetching || portfolio.isFetching) return (<p>Fetching data...</p>);
    return (
          error
          ? <div className="error">{error}</div>
          : <Portfolio items={portfolio.items} currencies={all} />
    );
  }

  renderLogin() {
    return (<p>Here be login</p>);
  }

  renderSignup() {
    return (<p>Here be signup</p>);
  }

  renderMarket() {
    return (<p>Here be market data</p>);
  }

  renderPortfolioSetup() {
    return (<p>Here be portfolio setup</p>);
  }

  render() {
    return (
      <Router>
        <div>
          <MainHeader/>
          <Container>
           <Route path="/" exact render={this.renderPortfolio} />
           <Route path="/login" exact render={this.renderLogin} />
           <Route path="/signup" exact render={this.renderSignup} />
           <Route path="/market" exact render={this.renderMarket} />
           <Route path="/portfolio-setup" exact render={this.renderPortfolioSetup} />
          </Container>
        </div>
      </Router>
    );
  }
}

export default connect(state => state)(Scrooge)
