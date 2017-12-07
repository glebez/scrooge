import glamorous from 'glamorous';
import { css } from 'glamor';

const spin = css.keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

const LoadIcon = glamorous.button({
  position: 'fixed',
  right: '30px',
  top: '100px',
  height: '30px',
  width: '30px',
  backgroundColor: 'rgba(0,0,0,.3)',
  border: 'none',
  borderRadius: '5px',
  color: '#fff',
  transition: 'opacity 1s ease-in-out',
  '& span': {
    display: 'inline-block',
    animation: `${spin} 1s infinite linear`,
  },
},
({ isVisible }) => ({
  opacity: isVisible ? 1 : 0,
}));

export default LoadIcon;
