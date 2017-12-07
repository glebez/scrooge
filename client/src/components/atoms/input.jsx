import glamorous from 'glamorous';
import { colors } from '../../styles/variables';
import { buttonStyles } from './button';


const placeholderStyles = {
  fontStyle: 'italic',
  color: colors.moscowSky,
};

const Input = glamorous.input({
  display: 'block',
  width: '100%',
  border: 'none',
  marginBottom: '20px',
  padding: '10px',
  color: colors.bloodyRed,
  '&::-webkit-input-placeholder': placeholderStyles,
  '&:-ms-input-placeholder': placeholderStyles,
},
({ type }) => {
  if (type === 'submit') return buttonStyles;
  return {};
},
);

export default Input;
