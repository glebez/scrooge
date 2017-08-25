import glamorous from 'glamorous';
import { colors } from '../../styles/variables';

export const buttonStyles = {
  width: '100%',
  border: 'none',
  backgroundColor: colors.bloodyRed,
  color: colors.paperYellow,
  '&:hover': {
    backgroundColor: colors.ketchupRed,
  },
};

const Button = glamorous.button(buttonStyles);

export default Button;
