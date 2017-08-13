import React from 'react';
import { connect } from 'react-redux'
import { fetchCurrencies, fetchPortfolio } from './actions';
import glamorous from 'glamorous'
import MainHeader from './components/main-header';
import Portfolio from './components/portfolio';


const Container = glamorous.div({
  maxWidth: '700px',
  margin: '0 auto'
});

class Scrooge extends React.Component {
  constructor(props) {
    super(props);
    this.renderContent = this.renderContent.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
    dispatch(fetchPortfolio());
  }

  renderContent() {
    const { currencies: { all, error, isFetching }, portfolio  } = this.props;
    if (isFetching || portfolio.isFetching) return 'Fetching data...';
    return (
          error
          ? <div className="error">{error}</div>
          : <Portfolio items={portfolio.items} currencies={all} />
    );
  }

  render() {
    return (
      <div>
        <MainHeader/>
        <Container>
          {this.renderContent()}
        </Container>
      </div>
    );
  }
}

export default connect(state => state)(Scrooge)
