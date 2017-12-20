import React from 'react';
import PropTypes from 'prop-types';
import glamorous, { Div } from 'glamorous';
import { Link } from '../atoms/link';
import { colors } from '../../styles/variables';

const Body = glamorous.ul({
  position: 'absolute',
  top: 'calc(100% + 10px)',
  right: '-10px',
  listStyle: 'none',
  paddingLeft: 0,
  backgroundColor: colors.paperYellow,
  borderRadius: '5px',
  border: `1px solid ${colors.ketchupRed}`,
  zIndex: 10,
},
({ isVisible }) => ({ display: isVisible ? 'block' : 'none' }));

const Item = glamorous.li({
  padding: '10px 20px',
  whiteSpace: 'nowrap',
  '&:not(:last-child)': {
    borderBottom: `1px solid ${colors.ketchupRed}`,
  },
});

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleDropdownClose = this.handleDropdownClose.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.handleDropdownClose);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDropdownClose);
  }

  handleClick(e) {
    e.preventDefault();
    this.setState(prevState => ({ isVisible: !prevState.isVisible }));
  }

  handleDropdownClose(e) {
    console.log(this.linkEl);
    if (e.target !== this.linkEl) {
      this.setState({ isVisible: false });
    }
  }

  render() {
    const { linkText, children } = this.props;
    return (
      <Div css={{ position: 'relative' }} >
        <Link innerRef={(el) => { this.linkEl = el; return null; }} href="#" onClick={this.handleClick}>
          {linkText}
        </Link>
        <Body isVisible={this.state.isVisible}>
          { React.Children.map(children, child => <Item>{child}</Item>) }
        </Body>
      </Div>
    );
  }
}

Dropdown.propTypes = {
  linkText: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]).isRequired,
};

export default Dropdown;
