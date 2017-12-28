import 'glamor/reset';
import { css } from 'glamor';
import { colors } from './variables';

css.global('html', {
  height: '100%',
  boxSizing: 'border-box',
});

css.global('*, *:before, *:after', {
  boxSizing: 'inherit',
});

css.global('body', {
  height: '100%',
  color: colors.moscowSky,
  fontFamily: "'Open Sans', sans-serif",
  fontSize: '18px',
});

css.global('#scrooge', {
  height: '100%',
});

css.global('p', {
  margin: '0 0 10px 0',
});
