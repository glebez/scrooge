import React from 'react';
import { connect } from 'react-redux'
import { fetchCurrencies } from './actions';

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
    if (isFetching) return (<div>Fetching data... </div>);
    return (<div>
        {
          error
          ? <div className="error">{error}</div>
          : currencies && currencies.map(cur => <div>{cur.name}</div>)
        }
      </div>);
  }
}

export default connect(state => state.currencies)(Scrooge)
