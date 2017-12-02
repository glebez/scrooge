import glamorous from 'glamorous';
import { css } from 'glamor';

const spin = css.keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

const ReloadButton = glamorous.button({
  position: 'fixed',
  right: '30px',
  top: '100px',
  height: '30px',
  width: '30px',
  backgroundColor: 'rgba(0,0,0,.3)',
  border: 'none',
  borderRadius: '5px',
  color: '#fff',
  '& span': {
    display: 'inline-block',
  },
},
({ isSpinning }) => {
  if (isSpinning) {
    return {
      '& span': {
        animation: `${spin} 5s infinite linear`,
      },
    };
  }
  return {};
},
);

export default ReloadButton;
