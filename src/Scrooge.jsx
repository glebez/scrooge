import React from 'react';
import { connect } from 'react-redux'
import { fetchCurrencies } from './actions';
import glamorous from 'glamorous'
import MainHeader from './components/main-header';
import CurrencyCard from './components/currency-card';


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
  }

  renderContent() {
    const { currencies, error, isFetching } = this.props;
    if (isFetching) return (<Container textAlign="center">Fetching data... </Container>);
    return (
      <Container>
        {
          error
          ? <div className="error">{error}</div>
          : currencies && currencies.map(cur => <CurrencyCard currency={cur} />)
        }
      </Container>
    );
  }

  render() {
    return (
      <div>
        <MainHeader/>
        {this.renderContent()}
      </div>
    );
  }
}

export default connect(state => state.currencies)(Scrooge)
