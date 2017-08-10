import React from 'react';
import { connect } from 'react-redux'
import { fetchCurrencies } from './actions';
import glamorous from 'glamorous'
import CurrencyCard from './components/currency-card.jsx';


const Container = glamorous.div({
  maxWidth: '700px',
  margin: '0 auto'
});

class Scrooge extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  render() {
    const { currencies, error, isFetching } = this.props;
    if (isFetching) return (<Container textAlign="center">Fetching data... </Container>);
    return (<Container>
        {
          error
          ? <div className="error">{error}</div>
          : currencies && currencies.map(cur => <CurrencyCard currency={cur} />)
        }
      </Container>);
  }
}

export default connect(state => state.currencies)(Scrooge)
