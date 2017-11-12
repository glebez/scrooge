import glamorous from 'glamorous';
import { colors } from '../../styles/variables';
import { buttonStyles } from './button';

const Input = glamorous.input({
  display: 'block',
  width: '100%',
  border: 'none',
  marginBottom: '20px',
  padding: '10px',
  color: colors.bloodyRed,
},
({ type }) => {
  if (type === 'submit') return buttonStyles;
  return {};
},
);

export default Input;
