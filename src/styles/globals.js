import 'glamor/reset';
import { css } from 'glamor';
import { colors } from './variables';


css.global('body', {
  backgroundImage: `linear-gradient(-135deg, ${colors.babyGreen} 0%, ${colors.aqua} 100%)`,
  color: colors.moscowSky,
  fontFamily: "'Open Sans', sans-serif",
  fontSize: '18px'
});

css.global('p', {
  margin: '0 0 10px 0'
});
